"use client";

type Props = {
  width?: number;
  className?: string;
};

export default function BFQLogoWhite({ width = 40, className = "" }: Props) {
  return (
    <img
      src="/brainfuel-logo.png"
      alt="BrainFuel Quantum AI Labs"
      width={width}
      className={className}
    />
  );
}
