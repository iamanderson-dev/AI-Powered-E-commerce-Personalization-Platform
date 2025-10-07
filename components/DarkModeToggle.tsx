"use client";
import { useEffect, useState } from "react";

// Utility to get system theme
function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function DarkModeToggle() {
  const [theme, setTheme] = useState("light");

  // Sync with system theme on mount
  useEffect(() => {
    const systemTheme = getSystemTheme();
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme || systemTheme);
    document.documentElement.classList.toggle("dark", (savedTheme || systemTheme) === "dark");

    // Listen for system theme changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Toggle theme and persist
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Reset to system theme
  const resetToSystem = () => {
    localStorage.removeItem("theme");
    const systemTheme = getSystemTheme();
    setTheme(systemTheme);
    document.documentElement.classList.toggle("dark", systemTheme === "dark");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
        className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
      <button
        aria-label="Reset to system theme"
        onClick={resetToSystem}
        className="px-2 py-2 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        System
      </button>
    </div>
  );
}
