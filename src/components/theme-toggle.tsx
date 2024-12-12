"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant={theme === "dark" ? "ghost" : "default"}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-9 h-9 ${theme === "dark" ? "" : "bg-primary text-primary-foreground"}`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 