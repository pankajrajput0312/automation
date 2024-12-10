import { Circle, CheckCircle2, ArrowRight } from "lucide-react";

interface TimelineStep {
  title: string;
  description: string;
  isCompleted?: boolean;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/60 to-primary/20" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-12">
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center">
              {step.isCompleted ? (
                <CheckCircle2 className="h-8 w-8 text-primary" />
              ) : (
                <Circle className="h-8 w-8 text-primary/60" />
              )}
            </div>

            {/* Content */}
            <div className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/10">
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>

              {/* Arrow indicator */}
              <ArrowRight className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}