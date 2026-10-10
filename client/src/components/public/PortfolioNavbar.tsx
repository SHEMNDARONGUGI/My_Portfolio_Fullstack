import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

const sections = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["certifications", "Certifications"],
  ["skills", "Skills"],
  ["services", "Services"],
  ["contact", "Contact"],
] as const;

export default function PortfolioNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 text-foreground backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"
      >
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          Shem <span className="text-primary">Ndaro</span>
        </a>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground hover:bg-muted md:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {sections.map(([id, title]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              {title}
            </a>
          ))}
          <a
            href="/admin/login"
            className="rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            Admin
          </a>
          <ThemeToggle />
        </div>

        {menuOpen && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-background p-4 text-foreground shadow-xl md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {sections.map(([id, title]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
                >
                  {title}
                </a>
              ))}
              <a
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-muted"
              >
                Admin login
              </a>
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
