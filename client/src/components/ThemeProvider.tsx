import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext, type PortfolioTheme } from "../lib/portfolio-theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<PortfolioTheme>(() => {
    const storedTheme = localStorage.getItem("portfolio-theme");
    return storedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#1d293d" : "#f1f5f9");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
