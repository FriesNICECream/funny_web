import { useEffect, useMemo, useState } from "react";

export function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredThemeMode() {
  if (typeof window === "undefined") {
    return "system";
  }

  return window.localStorage.getItem("theme-mode") || "system";
}

function useTheme() {
  const [themeMode, setThemeMode] = useState(getStoredThemeMode);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme = useMemo(
    () => (themeMode === "system" ? systemTheme : themeMode),
    [systemTheme, themeMode],
  );

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    window.localStorage.setItem("theme-mode", themeMode);
  }, [resolvedTheme, themeMode]);

  return {
    themeMode,
    resolvedTheme,
    setThemeMode,
  };
}

export default useTheme;
