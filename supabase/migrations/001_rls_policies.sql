-- =============================================================
-- BrainFuel Quantum AI Labs — Supabase initial migration
-- RLS policies for: profiles, files, audit_logs
-- =============================================================

-- ---------------------------------------------------------------
-- Helper: get the current user's role (cached per transaction)
-- ---------------------------------------------------------------
create or replace function public.current_user_role()
returns text language sql security definer stable set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

-- ---------------------------------------------------------------
-- 1. profiles
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users on delete cascade,
  full_name  text,
  avatar_url text,
  role       text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Automatically create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS: enable
alter table public.profiles enable row level security;

-- Users can read their own profile; admins can read all
create policy "profiles: owner read" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: admin read all" on public.profiles
  for select using (public.current_user_role() = 'admin');

-- Users can update their own profile
create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = id);

-- Admins can update any profile
create policy "profiles: admin update all" on public.profiles
  for update using (public.current_user_role() = 'admin');

-- ---------------------------------------------------------------
-- 2. files
-- ---------------------------------------------------------------
create table if not exists public.files (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references auth.users on delete cascade,
  name        text not null,
  mime_type   text,
  size_bytes  bigint,
  storage_key text not null,
  created_at  timestamptz not null default now()
);

alter table public.files enable row level security;

-- Owner can do anything with their own files
create policy "files: owner all" on public.files
  for all using (auth.uid() = owner_id);

-- Admins can read all files
create policy "files: admin read all" on public.files
  for select using (public.current_user_role() = 'admin');

-- ---------------------------------------------------------------
-- 3. audit_logs
-- ---------------------------------------------------------------
create table if not exists public.audit_logs (
  id         bigserial primary key,
  user_id    uuid references auth.users on delete set null,
  action     text not null,
  table_name text,
  record_id  text,
  old_data   jsonb,
  new_data   jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

-- Only admins can read audit logs
create policy "audit_logs: admin read" on public.audit_logs
  for select using (public.current_user_role() = 'admin');

-- Service role inserts audit log entries (no RLS bypass needed for insert via service key)
create policy "audit_logs: service insert" on public.audit_logs
  for insert with check (true);
