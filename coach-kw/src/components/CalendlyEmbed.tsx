"use client";

import Script from "next/script";

export default function CalendlyEmbed() {
  const calendlyUrl = "https://calendly.com/janon-m/30min";

  return (
    <div className="w-full">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <div
        className="calendly-inline-widget rounded-xl overflow-hidden"
        data-url={calendlyUrl}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}

