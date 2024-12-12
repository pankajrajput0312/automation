import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  return (
    <aside className="...">
      {/* ... existing sidebar items ... */}
      
      {/* Add this near the bottom of your sidebar */}
      <div className="mt-auto"> {/* This pushes the theme toggle to the bottom */}
        <ThemeToggle />
      </div>
    </aside>
  )
} 