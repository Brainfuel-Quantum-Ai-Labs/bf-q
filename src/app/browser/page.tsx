import type { Metadata } from "next";
import { LiveBrowser } from "@/components/ui/LiveBrowser";

export const metadata: Metadata = {
  title: "Live Browser",
  description:
    "Temporary live local browser — preview and navigate local or web URLs directly inside BF-Q Labs.",
};

export default function BrowserPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Live <span className="gradient-text">Browser</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Temporary in-app browser for previewing local or remote URLs. Enter a URL in the address
            bar and press Enter to navigate.
          </p>
        </div>
        <LiveBrowser defaultUrl="http://localhost:3000" className="shadow-2xl" />
      </div>
    </div>
  );
}
