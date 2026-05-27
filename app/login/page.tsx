import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getSession } from "@/lib/auth";
import { LoginButtons } from "@/components/auth/login-buttons";

// =============================================================================
// LOGIN PAGE - Authentication entry point
// =============================================================================
//
// WHY: Provides a clean login UI with social OAuth options.
// Server component checks session and redirects authenticated users.
//
// FLOW:
//   1. User visits /login (or is redirected here from protected route)
//   2. Server checks if already authenticated
//   3. If authenticated, redirect to /home
//   4. If not, show login options
//   5. User clicks OAuth button, completes flow
//   6. Redirected back to returnTo URL or /home
//
// SUSPENSE:
//   - LoginButtons uses useSearchParams which needs Suspense
//   - Fallback shows empty space to prevent layout shift
// =============================================================================

const LoginPage = async () => {
  const session = await getSession();

  if (session) redirect("/home");

  return (
    <main className="login-root">
      {/* Subtle background grid */}
      <div className="login-grid" aria-hidden="true" />

      {/* Corner marks */}
      <span className="corner corner--tl" aria-hidden="true" />
      <span className="corner corner--tr" aria-hidden="true" />
      <span className="corner corner--bl" aria-hidden="true" />
      <span className="corner corner--br" aria-hidden="true" />

      <div className="login-panel">
        {/* Wordmark */}
        <div className="login-wordmark">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="0" y="0" width="13" height="13" fill="currentColor" />
            <rect x="15" y="0" width="13" height="13" fill="currentColor" opacity=".35" />
            <rect x="0" y="15" width="13" height="13" fill="currentColor" opacity=".35" />
            <rect x="15" y="15" width="13" height="13" fill="currentColor" />
          </svg>
          <span>DevBin</span>
        </div>

        <div className="login-divider" aria-hidden="true" />

        <header className="login-header">
          <h1 className="login-title">Sign in</h1>
          <p className="login-sub">Choose your preferred method to continue.</p>
        </header>

        <div className="login-actions">
          <Suspense fallback={<div style={{ height: "2.25rem" }} />}>
            <LoginButtons />
          </Suspense>
        </div>

        <p className="login-legal">
          By continuing, you agree to our{" "}
          <a href="/terms">Terms</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>

      <style>{`
        /* ── Tokens ─────────────────────────────────────────── */
        :root {
          --ink:   #0d0d0d;
          --mist:  #f5f4f0;
          --rule:  rgba(13,13,13,.1);
          --ghost: rgba(13,13,13,.045);
          --serif: "Georgia", "Times New Roman", serif;
          --mono:  "Courier New", monospace;
        }

        /* ── Reset ──────────────────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ───────────────────────────────────────────── */
        .login-root {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100svh;
          width: 100%;
          background: var(--mist);
          color: var(--ink);
          overflow: hidden;
          font-family: var(--serif);
        }

        /* ── Background grid ────────────────────────────────── */
        .login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--ghost) 1px, transparent 1px),
            linear-gradient(90deg, var(--ghost) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── Corner marks ───────────────────────────────────── */
        .corner {
          position: fixed;
          width: 18px;
          height: 18px;
          pointer-events: none;
        }
        .corner::before,
        .corner::after {
          content: "";
          position: absolute;
          background: var(--ink);
          opacity: .25;
        }
        .corner::before { width: 1px; height: 100%; top: 0; }
        .corner::after  { width: 100%; height: 1px; }

        .corner--tl { top: 24px; left: 24px; }
        .corner--tl::before { left: 0; }
        .corner--tl::after  { top: 0; left: 0; }

        .corner--tr { top: 24px; right: 24px; }
        .corner--tr::before { right: 0; }
        .corner--tr::after  { top: 0; right: 0; }

        .corner--bl { bottom: 24px; left: 24px; }
        .corner--bl::before { left: 0; }
        .corner--bl::after  { bottom: 0; left: 0; }

        .corner--br { bottom: 24px; right: 24px; }
        .corner--br::before { right: 0; }
        .corner--br::after  { bottom: 0; right: 0; }

        /* ── Panel ──────────────────────────────────────────── */
        .login-panel {
          position: relative;
          z-index: 1;
          width: min(360px, calc(100vw - 48px));
          padding: 40px 36px 32px;
          background: #fff;
          border: 1px solid var(--rule);
          box-shadow:
            0 1px 2px rgba(0,0,0,.04),
            0 4px 16px rgba(0,0,0,.05);
          animation: panel-in .45s cubic-bezier(.22,.68,0,1.2) both;
        }

        @keyframes panel-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Wordmark ───────────────────────────────────────── */
        .login-wordmark {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--mono);
          font-size: .75rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ink);
          animation: fade-up .4s .05s both;
        }

        /* ── Divider ────────────────────────────────────────── */
        .login-divider {
          height: 1px;
          background: var(--rule);
          margin: 24px 0;
          animation: fade-up .4s .1s both;
        }

        /* ── Header ─────────────────────────────────────────── */
        .login-header {
          margin-bottom: 28px;
          animation: fade-up .4s .15s both;
        }

        .login-title {
          font-size: 1.65rem;
          font-weight: 400;
          letter-spacing: -.02em;
          line-height: 1.15;
          color: var(--ink);
          font-family: var(--serif);
        }

        .login-sub {
          margin-top: 6px;
          font-family: var(--mono);
          font-size: .72rem;
          letter-spacing: .04em;
          color: rgba(13,13,13,.45);
        }

        /* ── Actions ────────────────────────────────────────── */
        .login-actions {
          animation: fade-up .4s .2s both;
        }

        /* ── Legal ──────────────────────────────────────────── */
        .login-legal {
          margin-top: 24px;
          font-family: var(--mono);
          font-size: .65rem;
          letter-spacing: .04em;
          color: rgba(13,13,13,.35);
          line-height: 1.6;
          animation: fade-up .4s .25s both;
        }

        .login-legal a {
          color: var(--ink);
          text-decoration: underline;
          text-underline-offset: 2px;
          opacity: .5;
          transition: opacity .15s;
        }
        .login-legal a:hover { opacity: 1; }

        /* ── Shared animation ───────────────────────────────── */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ─────────────────────────────────────── */
        @media (max-width: 400px) {
          .login-panel { padding: 32px 24px 28px; }
        }
      `}</style>
    </main>
  );
};

export default LoginPage;