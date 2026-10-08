import { createContext, useContext } from "react";

export type PortfolioTheme = "dark" | "light";

export interface ThemeContextValue {
  theme: PortfolioTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const usePortfolioTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("usePortfolioTheme must be used within ThemeProvider");
  }
  return context;
};
