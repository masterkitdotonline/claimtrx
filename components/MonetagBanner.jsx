
"use client";

import Script from "next/script";

export default function MonetagBanner() {
  return (
    <Script
      id="monetag-banner-12054967"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(s) {
            s.dataset.zone = "12054967";
            s.src = "https://n6wxm.com/vignette.min.js";
          })(
            document.documentElement.appendChild(
              document.createElement("script")
            )
          );
        `,
      }}
    />
  );
}
