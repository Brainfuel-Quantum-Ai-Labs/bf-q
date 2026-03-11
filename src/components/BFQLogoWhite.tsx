import Image from "next/image";

export default function BFQLogoWhite() {
  return (
    <Image
      src="/brainfuel-logo.png"
      alt="BrainFuel Quantum AI Labs"
      width={180}
      height={70}
      priority
    />
  );
}
