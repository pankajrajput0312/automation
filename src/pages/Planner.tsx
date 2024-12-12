import { useState, useMemo } from "react";
import { Calendar } from "@/components/planner/Calendar";
import { ViewToggle } from "@/components/planner/ViewToggle";
import { ListView } from "@/components/planner/ListView";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, Calendar as CalendarIcon, Settings, Users, Plus } from "lucide-react";
import { getDummyPosts, Post } from "@/lib/dummy-data";
import { PostModal } from "@/components/planner/PostModal";
import { SchedulePostModal } from "@/components/planner/SchedulePostModal";
import { ThemeToggle } from "@/components/theme-toggle"

export default function Planner() {
  const [view, setView] = useState<"week" | "month" | "list">("month");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

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

  const handleSchedulePost = (postData: any) => {
    console.log('Schedule post:', postData);
    // Handle post scheduling logic here
  };

  return (
    <div className="container mx-auto py-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-primary mb-2">Content Planner</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setScheduleModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Post
          </Button>
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

      <SchedulePostModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={handleSchedulePost}
      />
    </div>
  );
} 