import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-neutral-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold">SocialAutomator</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#features"
                className="text-neutral-600 hover:text-neutral-900 transition-colors px-3 py-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-neutral-600 hover:text-neutral-900 transition-colors px-3 py-2 text-sm font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-neutral-600 hover:text-neutral-900 transition-colors px-3 py-2 text-sm font-medium"
              >
                Testimonials
              </a>
              <Button className="bg-neutral-900 text-white hover:bg-neutral-800">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}