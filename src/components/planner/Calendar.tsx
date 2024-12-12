import { addDays, startOfWeek, startOfMonth, endOfMonth, format, isSameDay, isSameMonth, getDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { getDummyPosts, Post } from "@/lib/dummy-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostModal } from "./PostModal";

interface CalendarProps {
  view: "week" | "month";
  currentDate: Date;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ view, currentDate, selectedDate, onSelectDate }: CalendarProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Record<string, Post[]>>({});
  const [selectedDatePosts, setSelectedDatePosts] = useState<{ date: Date; posts: Post[] } | null>(null);

  // Generate calendar dates based on view
  const dates = useMemo(() => {
    if (view === "week") {
      const start = startOfWeek(currentDate);
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    } else {
      const start = startOfMonth(currentDate);
      const firstDayOfMonth = getDay(start); // 0-6, where 0 is Sunday
      const prevMonthDays = firstDayOfMonth;
      
      // Add days from previous month to align grid
      const prevMonthStart = addDays(start, -prevMonthDays);
      
      // Get all days needed (up to 42 to show 6 weeks)
      return Array.from({ length: 42 }, (_, i) => addDays(prevMonthStart, i));
    }
  }, [view, currentDate]);

  // Initialize posts when dates change
  useEffect(() => {
    const newPosts = dates.reduce((acc, date) => {
      acc[format(date, 'yyyy-MM-dd')] = getDummyPosts(date);
      return acc;
    }, {} as Record<string, Post[]>);
    setPosts(newPosts);
  }, [dates]);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prev => {
      const dateKey = format(updatedPost.scheduledTime, 'yyyy-MM-dd');
      return {
        ...prev,
        [dateKey]: prev[dateKey].map(post => 
          post.id === updatedPost.id ? updatedPost : post
        )
      };
    });
  };

  const handlePostDelete = (postId: string) => {
    setPosts(prev => {
      const newPosts = { ...prev };
      Object.keys(newPosts).forEach(dateKey => {
        newPosts[dateKey] = newPosts[dateKey].filter(post => post.id !== postId);
      });
      return newPosts;
    });
  };

  return (
    <>
      <div className={cn(
        "grid gap-1",
        view === "week" 
          ? "grid-cols-7 h-[calc(100vh-12rem)]" 
          : "grid-cols-7 h-[calc(100vh-12rem)]",
        "transition-all duration-300"
      )}>
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar dates */}
        {dates.map((date) => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const datePosts = posts[dateKey] || [];
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isCurrentMonth = isSameMonth(date, currentDate);
          
          if (view === "week") {
            return (
              <div
                key={dateKey}
                className={cn(
                  "border rounded-lg",
                  isSelected && "ring-2 ring-primary"
                )}
              >
                <div className="flex justify-between items-center sticky top-0 bg-background p-2 border-b">
                  <span className="font-medium">{format(date, 'd')}</span>
                  <Badge 
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setSelectedDatePosts({ date, posts: datePosts })}
                  >
                    {datePosts.length} {datePosts.length === 1 ? 'post' : 'posts'}
                  </Badge>
                </div>
                <ScrollArea className="h-[calc(100%-3rem)]">
                  <div className="space-y-1 p-1">
                    {datePosts.slice(0, 3).map((post) => (
                      <button
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className={cn(
                          "w-full text-left rounded-lg p-2 space-y-1",
                          "bg-card hover:bg-primary hover:text-primary-foreground",
                          "transition-colors duration-200",
                          "group"
                        )}
                      >
                        {post.image && (
                          <div className="aspect-video rounded-md overflow-hidden mb-2">
                            <img
                              src={post.image}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{post.title}</span>
                          <span className="text-xs group-hover:text-primary-foreground/80">
                            {format(post.scheduledTime, 'h:mm a')}
                          </span>
                        </div>
                        <p className="text-xs group-hover:text-primary-foreground/80 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-xs group-hover:border-primary-foreground/20 group-hover:text-primary-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    ))}
                    {datePosts.length > 3 && (
                      <div 
                        className="text-xs text-muted-foreground text-center cursor-pointer hover:text-primary"
                        onClick={() => setSelectedDatePosts({ date, posts: datePosts })}
                      >
                        +{datePosts.length - 3} more {datePosts.length - 3 === 1 ? 'post' : 'posts'}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            );
          }

          // Month view
          return (
            <div
              key={dateKey}
              onClick={() => onSelectDate(date)}
              className={cn(
                "min-h-[120px] border rounded-lg p-1",
                !isCurrentMonth && "bg-muted/50",
                isSelected && "ring-2 ring-primary",
                "hover:bg-muted/30 cursor-pointer"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={cn(
                  "font-medium text-sm",
                  !isCurrentMonth && "text-muted-foreground"
                )}>
                  {format(date, 'd')}
                </span>
                {datePosts.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-primary/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDatePosts({ date, posts: datePosts });
                    }}
                  >
                    {datePosts.length} {datePosts.length === 1 ? 'post' : 'posts'}
                  </Badge>
                )}
              </div>
              
              <ScrollArea className="h-[calc(100%-2rem)]">
                <div className="space-y-1">
                  {datePosts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                      }}
                      className={cn(
                        "w-full text-left rounded p-1 text-xs",
                        "hover:bg-primary hover:text-primary-foreground",
                        "transition-colors duration-200",
                        "cursor-pointer group"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {post.image && (
                          <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={post.image}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <div className="font-medium truncate">{post.title}</div>
                          <div className="group-hover:text-primary-foreground/80">
                            {format(post.scheduledTime, 'h:mm a')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {datePosts.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{datePosts.length - 3} more {datePosts.length - 3 === 1 ? 'post' : 'posts'}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>

      {selectedDatePosts && (
        <PostModal
          post={null}
          onClose={() => setSelectedDatePosts(null)}
          isDateView={true}
          date={selectedDatePosts.date}
          posts={selectedDatePosts.posts}
          onSelectPost={(post) => {
            setSelectedPost(post);
            setSelectedDatePosts(null);
          }}
        />
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={handlePostDelete}
          onUpdate={handlePostUpdate}
        />
      )}
    </>
  );
} 