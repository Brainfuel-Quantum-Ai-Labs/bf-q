"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, RefreshCw, ExternalLink, Globe, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveBrowserProps {
  defaultUrl?: string;
  className?: string;
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Treat bare hostnames / paths as http for local use
  if (/^localhost(:\d+)?(\/.*)?$/.test(trimmed) || /^127\.0\.0\.1/.test(trimmed)) {
    return `http://${trimmed}`;
  }
  return `https://${trimmed}`;
}

export function LiveBrowser({ defaultUrl = "http://localhost:3000", className }: LiveBrowserProps) {
  const [urlInput, setUrlInput] = useState(defaultUrl);
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);
  const [history, setHistory] = useState<string[]>([defaultUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = useCallback(
    (url: string) => {
      const normalized = normalizeUrl(url);
      if (!normalized) return;
      setError(false);
      setLoading(true);
      setCurrentUrl(normalized);
      setUrlInput(normalized);
      const newHistory = history.slice(0, historyIndex + 1).concat(normalized);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const goBack = () => {
    if (historyIndex <= 0) return;
    const idx = historyIndex - 1;
    setHistoryIndex(idx);
    setCurrentUrl(history[idx]);
    setUrlInput(history[idx]);
    setError(false);
    setLoading(true);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    const idx = historyIndex + 1;
    setHistoryIndex(idx);
    setCurrentUrl(history[idx]);
    setUrlInput(history[idx]);
    setError(false);
    setLoading(true);
  };

  const refresh = () => {
    if (iframeRef.current) {
      setError(false);
      setLoading(true);
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(urlInput);
  };

  return (
    <div className={cn("flex flex-col rounded-xl overflow-hidden border border-white/10", className)}>
      {/* Temporary demo banner */}
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-900/40 border-b border-amber-700/40 text-amber-400 text-xs font-medium">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
        TEMPORARY DEMO — Live Local Browser. Many external sites block iframe embedding.
      </div>

      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
        {/* Traffic-light dots */}
        <div className="hidden sm:flex items-center gap-1.5 mr-1">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>

        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          aria-label="Go back"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          aria-label="Go forward"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={refresh}
          aria-label="Refresh"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>

        {/* URL bar */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/40 border border-white/10 focus-within:border-quantum-600 transition-colors">
            <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              aria-label="URL"
              placeholder="Enter URL…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
              spellCheck={false}
            />
          </div>
        </form>

        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in new tab"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Viewport */}
      <div className="relative flex-1 bg-background" style={{ minHeight: "600px" }}>
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
            <Globe className="w-12 h-12 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm max-w-sm">
              This page could not be loaded inside the browser. The site may block iframe embedding
              via <code className="text-quantum-400">X-Frame-Options</code> or CSP headers.
            </p>
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-quantum-600 hover:bg-quantum-500 text-white text-sm font-medium transition-colors"
            >
              Open in new tab <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            title="Live Browser"
            className="w-full h-full border-0"
            style={{ minHeight: "600px" }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        )}
      </div>
    </div>
  );
}
