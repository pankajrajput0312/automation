import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDummyPosts } from "@/lib/dummy-data";
import { Badge } from "../ui/badge";

interface PostListProps {
  date: Date;
  onClose: () => void;
}

export function PostList({ date, onClose }: PostListProps) {
  const posts = getDummyPosts(date);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h3 className="text-lg font-semibold mb-4">
          Posts for {format(date, 'MMMM d, yyyy')}
        </h3>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{post.title}</h4>
                  <span className="text-sm text-muted-foreground">
                    {format(post.scheduledTime, 'h:mm a')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {post.content}
                </p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 