export default function BFQLogoWhite({
  width = 420,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      viewBox="0 0 800 820"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bfqGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#19C3FF" />
          <stop offset="100%" stopColor="#2F5BFF" />
        </linearGradient>
      </defs>

      {/* White Background */}
      <rect width="100%" height="100%" fill="#FFFFFF" />

      {/* Brain Shape */}
      <g transform="translate(100,80)" stroke="url(#bfqGradient)" fill="none">

        {/* Outer Brain */}
        <path
          d="M300 0
             C210 0 160 70 160 140
             C100 160 90 240 140 280
             C120 380 210 450 300 450
             C390 450 480 380 460 280
             C510 240 500 160 440 140
             C440 70 390 0 300 0Z"
          strokeWidth="18"
        />

        {/* Center Split */}
        <line
          x1="300"
          y1="20"
          x2="300"
          y2="430"
          strokeWidth="14"
        />

        {/* Left Circuits */}
        <circle cx="200" cy="180" r="10" fill="url(#bfqGradient)" />
        <line x1="200" y1="180" x2="250" y2="180" strokeWidth="12" />

        <circle cx="190" cy="260" r="10" fill="url(#bfqGradient)" />
        <line x1="190" y1="260" x2="250" y2="260" strokeWidth="12" />

        <circle cx="200" cy="340" r="10" fill="url(#bfqGradient)" />
        <line x1="200" y1="340" x2="250" y2="340" strokeWidth="12" />

        {/* Right Circuits */}
        <circle cx="400" cy="180" r="10" fill="url(#bfqGradient)" />
        <line x1="350" y1="180" x2="400" y2="180" strokeWidth="12" />

        <circle cx="410" cy="260" r="10" fill="url(#bfqGradient)" />
        <line x1="350" y1="260" x2="410" y2="260" strokeWidth="12" />

        <circle cx="400" cy="340" r="10" fill="url(#bfqGradient)" />
        <line x1="350" y1="340" x2="400" y2="340" strokeWidth="12" />

        {/* Orbit Ring */}
        <ellipse
          cx="300"
          cy="250"
          rx="260"
          ry="130"
          strokeWidth="16"
          transform="rotate(-15 300 250)"
        />
      </g>

      {/* Text */}
      <text
        x="400"
        y="660"
        textAnchor="middle"
        fontSize="110"
        fontWeight="800"
        fontFamily="Inter, Montserrat, Arial"
        fill="#0A0A0D"
        letterSpacing="4"
      >
        BRAINFUEL
      </text>

      <text
        x="400"
        y="730"
        textAnchor="middle"
        fontSize="44"
        fontWeight="600"
        fontFamily="Inter, Montserrat, Arial"
        fill="#0A0A0D"
        letterSpacing="8"
      >
        QUANTUM AI LABS
      </text>
    </svg>
  );
}
