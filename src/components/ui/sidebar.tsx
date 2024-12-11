import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <SidebarContext.Provider value={{
      isOpen,
      isMobile,
      toggle: () => setIsOpen(prev => !prev),
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  const { isOpen, toggle, isMobile } = useSidebar()

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end p-4">
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={toggle}>
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 hidden md:block",
        isOpen ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {sidebarContent}
    </div>
  )
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
}

export function SidebarItem({ icon, title, className, ...props }: SidebarItemProps) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center px-4 py-2 hover:bg-accent cursor-pointer",
        isOpen ? "justify-start" : "justify-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {icon}
        {isOpen && <span>{title}</span>}
      </div>
    </div>
  )
}
