import Link from "next/link";

export const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="top">
      <Link href="/" className="mark" aria-label="ReadAloud home">
        <svg viewBox="0 0 32 32" aria-hidden width="28" height="28">
          <rect x="3" y="6" width="17" height="20" rx="2" fill="#FFE14D" stroke="currentColor" strokeWidth="2" />
          <path d="M7 12h9M7 16h9M7 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 11c2 1.6 2 8.4 0 10M27.5 8c3.4 3 3.4 13 0 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        ReadAloud
      </Link>
      <nav className="nav" aria-label="Main">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`toplink${n.href === "/#how" ? " hide-sm" : ""}`}
            aria-current={current === n.href ? "page" : undefined}
          >
            {n.label}
          </Link>
        ))}
        <Link href="/#try" className="nav-cta">Try it free</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="foot-row">
        <p>
          Questions or ideas? Write to <a href="mailto:contact@readaloud.si">contact@readaloud.si</a>.
        </p>
        <nav className="foot-nav" aria-label="Footer">
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
      <p className="fine">
        ReadAloud uses Claude by Anthropic to read and explain text, and your device's own voice to speak it. Photos and
        text aren't stored by ReadAloud.
      </p>
      <p className="fine">© {new Date().getFullYear()} Read Aloud SI Ltd.</p>
    </footer>
  );
}
