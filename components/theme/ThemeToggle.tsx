"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, type Theme } from "./theme-provider";

const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const THEME_LABELS = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = THEME_ICONS[theme];

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(NEXT_THEME[theme])}
      aria-label={`Theme: ${THEME_LABELS[theme]}. Change theme`}
      title={`Theme: ${THEME_LABELS[theme]}`}
    >
      <Icon />
    </Button>
  );
}
