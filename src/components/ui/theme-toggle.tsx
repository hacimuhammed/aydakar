"use client";

import * as React from "react";
import { Moon, MoonIcon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function ModeToggle() {
  const [theme, setTheme] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") || getCookie("theme")?.toString() || null
      );
    }
    return null;
  });

  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;

    // Her iki depolama alanına da kaydet
    localStorage.setItem("theme", theme);
    setCookie("theme", theme, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
  }, [theme]);

  useEffect(() => {
    // İlk render'da localStorage'da tema yoksa sistem temasını kontrol et
    if (!theme) {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(isDarkMode ? "dark" : "light");
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const systemTheme = isDarkMode ? "dark" : "light";
      setTheme(systemTheme);
      localStorage.setItem("theme", systemTheme);
      setCookie("theme", systemTheme, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    } else {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      setCookie("theme", newTheme, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
