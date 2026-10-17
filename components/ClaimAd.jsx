
"use client";

import { useEffect } from "react";

export default function ClaimAd() {
  useEffect(() => {
    // Keep the A-ADS iframe URL compatible with the browser.
  }, []);

  return (
    <div className="my-6 flex min-h-[100px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div
        id="aads-2458839"
        className="relative z-10 mx-auto w-full"
      >
        <iframe
          title="Advertisement"
          data-aa="2458839"
          src="https://acceptable.a-ads.com/2458839/?size=Adaptive"
          className="mx-auto block w-full max-w-full border-0"
          style={{
            width: "70%",
            minWidth: "250px",
            height: "100px",
            overflow: "hidden",
          }}
          loading="lazy"
          scrolling="no"
        />
      </div>
    </div>
  );
}
