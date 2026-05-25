export const getTheme = () => {
  return localStorage.getItem("theme") || "dark";
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};