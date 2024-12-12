import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, isMobile } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      title: "Dashboard",
      href: "/dashboard"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Planner",
      href: "/planner"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team",
      href: "/team"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Settings",
      href: "/settings"
    }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div
                key={item.href}
                onClick={() => navigate(item.href)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent cursor-pointer",
                  location.pathname === item.href ? "bg-accent" : "transparent",
                  !isOpen && "justify-center"
                )}
              >
                {item.icon}
                {isOpen && <span>{item.title}</span>}
              </div>
            ))}
          </div>
        </div>
      </Sidebar>
      
      <main className={cn(
        "flex-1 transition-all duration-300",
        !isMobile && (isOpen ? "md:ml-64" : "md:ml-16"),
        "px-4 md:px-8 pt-6"
      )}>
        {children}
      </main>
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}