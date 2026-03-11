import Image from "next/image";

type BFQLogoWhiteProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function BFQLogoWhite({
  width = 42,
  height = 42,
  className,
}: BFQLogoWhiteProps) {
  return (
    <Image
      src="/brainfuel-logo.png"
      alt="BrainFuel Quantum Ai Labs"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}
