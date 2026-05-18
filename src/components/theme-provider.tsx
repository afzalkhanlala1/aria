"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "aria-theme";

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.dataset.theme = t;
  root.style.colorScheme = t;
}

/**
 * Inline no-flash bootstrap. Render in <head> via dangerouslySetInnerHTML so
 * the dark class is on <html> before first paint and there is no flash.
 */
export const themeBootScript = `(() => {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var t = stored === "light" || stored === "dark" ? stored : "dark";
    var root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    root.dataset.theme = t;
    root.style.colorScheme = t;
  } catch (e) {}
})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to "dark" to match the no-flash script's default and avoid SSR/CSR mismatch.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
      const initial: Theme =
        stored ??
        (document.documentElement.classList.contains("dark") ? "dark" : "light");
      setThemeState(initial);
      applyTheme(initial);
    } catch {
      // ignore
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: "dark" as Theme, setTheme: () => {}, toggle: () => {} };
  }
  return ctx;
}
