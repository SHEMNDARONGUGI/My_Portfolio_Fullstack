import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioTheme } from "@/lib/portfolio-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = usePortfolioTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
