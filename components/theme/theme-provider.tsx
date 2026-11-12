"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "swiftcart-theme";

const listeners = new Set<() => void>();
const isBrowser = typeof window !== "undefined";

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage can be unavailable (private mode, blocked storage).
  }
  return "system";
}

function getSystemTheme(): ResolvedTheme {
  if (!isBrowser) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(nextTheme: Theme): ResolvedTheme {
  return nextTheme === "system" ? getSystemTheme() : nextTheme;
}

function applyToDocument(nextTheme: ResolvedTheme) {
  if (!isBrowser) return;
  const root = document.documentElement;
  root.classList.toggle("dark", nextTheme === "dark");
  root.style.colorScheme = nextTheme;
}

function notify() {
  listeners.forEach((listener) => listener());
}

// Initialise from the saved preference on the client. The inline script in the
// root layout has already painted this value before hydration, so this only
// brings React state in sync with what the DOM already shows.
let theme: Theme = isBrowser ? readStoredTheme() : "system";
let resolvedTheme: ResolvedTheme = resolveTheme(theme);

if (isBrowser) {
  applyToDocument(resolvedTheme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (theme !== "system") return;

      const nextTheme = getSystemTheme();
      if (nextTheme === resolvedTheme) return;

      resolvedTheme = nextTheme;
      applyToDocument(nextTheme);
      notify();
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getThemeSnapshot(): Theme {
  return theme;
}

function getServerThemeSnapshot(): Theme {
  return "system";
}

function getResolvedThemeSnapshot(): ResolvedTheme {
  return resolvedTheme;
}

function getServerResolvedThemeSnapshot(): ResolvedTheme {
  return "light";
}

export function setTheme(nextTheme: Theme) {
  theme = nextTheme;
  resolvedTheme = resolveTheme(nextTheme);
  applyToDocument(resolvedTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // Persisting is best-effort; the theme still applies for this session.
  }

  notify();
}

export function toggleTheme() {
  setTheme(resolvedTheme === "dark" ? "light" : "dark");
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getResolvedThemeSnapshot,
    getServerResolvedThemeSnapshot,
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>.");
  }

  return context;
}
