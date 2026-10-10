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

export default function PortfolioFooter() {
  return (
    <footer className="border-t border-border bg-card px-4 py-8 text-card-foreground md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="#home" className="text-lg font-bold text-foreground">
            Shem <span className="text-primary">Ndaro</span>
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            Building thoughtful digital experiences.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5"
        >
          {sections.map(([id, title]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {title}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shem. All rights reserved.
      </p>
    </footer>
  );
}
