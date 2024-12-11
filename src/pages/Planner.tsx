import { useState, useMemo } from "react";
import { Calendar } from "@/components/planner/Calendar";
import { ViewToggle } from "@/components/planner/ViewToggle";
import { PostList } from "@/components/planner/PostList";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ListView } from "@/components/planner/ListView";
import { getDummyPosts, Post } from "@/lib/dummy-data";
import { PostModal } from "@/components/planner/PostModal";

export default function Planner() {
  const [view, setView] = useState<"week" | "month" | "list">("month");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Handle navigation between periods
  const handlePreviousPeriod = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === "week") {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const handleNextPeriod = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === "week") {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Get posts for the current month
  const posts = useMemo(() => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const allPosts = [];
    let currentDay = startDate;
    
    while (currentDay <= endDate) {
      allPosts.push(...getDummyPosts(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return allPosts;
  }, [currentDate]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Content Planner</h1>
        <ViewToggle view={view} onViewChange={setView} />
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl">
          {format(currentDate, 
            view === "week" 
              ? "'Week of' MMM d, yyyy" 
              : view === "list" 
                ? "MMM yyyy" 
                : "MMMM yyyy"
          )}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === 'list' ? (
        <ListView
          posts={posts}
          onSelectPost={setSelectedPost}
          currentDate={currentDate}
        />
      ) : (
        <Calendar
          view={view}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={(id) => {
            // Handle delete
            setSelectedPost(null);
          }}
          onUpdate={(post) => {
            // Handle update
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
} 