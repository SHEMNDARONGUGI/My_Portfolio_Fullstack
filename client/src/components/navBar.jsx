import { useEffect, useState } from "react";

export default function NavigationBar() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/60 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Shem<span className="text-blue-500">Dev</span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <a
            href="#home"
            className="rounded-lg px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-black dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Home
          </a>

          <a
            href="#about"
            className="rounded-lg px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-black dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            About
          </a>

          <a
            href="#projects"
            className="rounded-lg px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-black dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Projects
          </a>

          {/* Services */}
          <a
            href="#services"
            className="rounded-lg px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-black dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Services
          </a>

          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Contact
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}
