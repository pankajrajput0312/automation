import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, Calendar, Users, Settings, ChevronLeft, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/auth/authSlice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg bg-primary p-1 w-8 h-8 flex items-center justify-center", className)}>
      <span className="font-bold text-lg text-primary-foreground">SA</span>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, isMobile, toggle } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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
        <div className="flex flex-col h-full px-3 py-2">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <Logo className={cn(!isOpen && "mx-auto")} />
              {isOpen && (
                <span className="font-semibold text-lg">
                  Social Automator
                </span>
              )}
            </div>
            {isOpen && !isMobile && (
              <button 
                onClick={toggle}
                className="rounded-lg p-1 hover:bg-accent transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="space-y-1 flex-1">
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
          <div className="border-t border-border mt-4 pt-4">
            <div
              onClick={() => setShowLogoutConfirm(true)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-destructive/10 hover:text-destructive cursor-pointer",
                !isOpen && "justify-center"
              )}
            >
              <LogOut className="h-5 w-5" />
              {isOpen && <span>Logout</span>}
            </div>
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

      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You'll need to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}