import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-neutral-600">{description}</p>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-100/0 via-neutral-100/0 to-neutral-100 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}