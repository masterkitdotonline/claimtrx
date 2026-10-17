
"use client";

import { useEffect, useState } from "react";

const OFFER_URL = "https://uplcm.com/4/12045617";

export default function ClaimPage() {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!started || seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [started, seconds]);

  function openOffer() {
    window.open(OFFER_URL, "_blank", "noopener,noreferrer");
  }

  function startClaim() {
    if (started || loading) return;

    openOffer();
    setStarted(true);
    setSeconds(30);
    setMessage("");
    setSuccess(false);
  }

  async function submitClaim(e) {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your FaucetPay email.");
      return;
    }

    // Open synchronously to reduce popup-blocking issues.
    const offerTab = window.open(
      "about:blank",
      "_blank"
    );

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (offerTab && !offerTab.closed) {
        if (response.ok) {
          offerTab.location.href = OFFER_URL;
        } else {
          offerTab.close();
        }
      }

      if (!response.ok) {
        setMessage(data.error || "Claim failed. Please try again.");
        return;
      }

      setSuccess(true);
      setMessage(
        `Success! ${data.amount} TRX sent to your FaucetPay account.`
      );
      setStarted(false);
      setSeconds(0);
      setEmail("");
    } catch {
      if (offerTab && !offerTab.closed) offerTab.close();
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const time = `00:${String(seconds).padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-12 text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-3xl font-bold text-red-400">
            T
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
            Free Crypto Faucet
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Claim Free <span className="text-red-400">TRX</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Complete the short timer and claim a random reward
            of 1–5 TRX directly to your FaucetPay account.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#101827] p-6 shadow-2xl sm:p-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Reward range</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">
                1–5 TRX
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Claim timer</p>
              <p className="mt-2 text-2xl font-bold">{time}</p>
            </div>
          </div>

          {!started && (
            <div className="mt-8 text-center">
              <button
                onClick={startClaim}
                disabled={loading}
                className="w-full rounded-xl bg-red-500 px-6 py-4 text-base font-bold text-white transition hover:bg-red-600 disabled:opacity-50 sm:text-lg"
              >
                Claim 1–5 TRX
              </button>

              <p className="mt-3 text-xs text-slate-500">
                Opens our offer in a new tab and starts the 30-second timer.
              </p>
            </div>
          )}

          {started && seconds > 0 && (
            <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/5 p-6 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-400/20 text-2xl font-bold text-red-400">
                {seconds}s
              </div>

              <h2 className="text-xl font-bold">Please wait...</h2>

              <p className="mt-2 text-sm text-slate-400">
                Keep this page open. Your claim form will
                appear when the timer finishes.
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-300"
                  style={{
                    width: `${((30 - seconds) / 30) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {started && seconds === 0 && (
            <form onSubmit={submitClaim} className="mt-8 space-y-5">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5">
                <h2 className="text-xl font-bold text-emerald-400">
                  Your claim is ready!
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Enter the email linked to your FaucetPay account.
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  FaucetPay Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3.5 text-white outline-none placeholder:text-slate-600 focus:border-red-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-500 px-6 py-4 font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Processing Claim..." : "Claim TRX Now"}
              </button>
            </form>
          )}

          {message && (
            <div
              role="status"
              className={`mt-5 rounded-xl border p-4 text-sm ${
                success
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/20 bg-red-500/10 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="font-semibold">How it works</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-400">
              <li>01. Click the claim button.</li>
              <li>02. Wait for the 30-second countdown.</li>
              <li>03. Enter your FaucetPay email.</li>
              <li>04. Receive your reward if the payout succeeds.</li>
            </ol>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Rewards depend on faucet availability and successful
          payment processing. Never share your FaucetPay password
          or API credentials.
        </p>
      </div>
    </main>
  );
}
