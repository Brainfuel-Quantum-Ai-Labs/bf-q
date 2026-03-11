import Image from "next/image";

type BFQLogoWhiteProps = {
  width?: number;
  className?: string;
};

export default function BFQLogoWhite({
  width = 180,
  className,
}: BFQLogoWhiteProps) {
  return (
    <Image
      src="/brainfuel-logo.png"
      alt="BrainFuel Quantum AI Labs"
      width={width}
      height={Math.round((width * 70) / 180)}
      priority
      className={className}
    />
  );
}
