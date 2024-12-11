import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar as CalendarIcon, Calendar } from "lucide-react";

interface ViewToggleProps {
  view: "week" | "month";
  onViewChange: (view: "week" | "month") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(v) => v && onViewChange(v as "week" | "month")}>
      <ToggleGroupItem value="week" aria-label="Weekly view">
        <CalendarIcon className="h-4 w-4 mr-2" />
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Monthly view">
        <Calendar className="h-4 w-4 mr-2" />
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  );
} 