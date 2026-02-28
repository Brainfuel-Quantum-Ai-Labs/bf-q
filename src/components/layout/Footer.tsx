import Link from "next/link";
import { Zap, Github, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Investors", href: "/investors" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  Products: [
    { label: "BF-Q Inference API", href: "/products/bf-q-inference-api" },
    { label: "QuantumLedger SDK", href: "/products/quantumledger-sdk" },
    { label: "NeuroCraft Studio", href: "/products/neurocraft-studio" },
    { label: "SecureVault Enterprise", href: "/products/securevault-enterprise" },
  ],
  Research: [
    { label: "Publications", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Open Source", href: "/products" },
    { label: "Portal", href: "/portal" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-quantum-400 to-quantum-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">BF-Q Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Pioneering the convergence of quantum computing, AI, and blockchain technologies.
              Navi Mumbai, India.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/bf-q"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/bf-q"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/bfqlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@bf-q.com"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-quantum-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BrainFuel Quantum AI Labs. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Founded by{" "}
            <span className="text-quantum-600 font-medium">Mohsin Agwan</span> · Navi Mumbai,
            India
          </p>
        </div>
      </div>
    </footer>
  );
}
