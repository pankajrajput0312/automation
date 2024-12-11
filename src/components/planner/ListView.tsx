import { Post } from "@/lib/dummy-data";
import { format, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface ListViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  currentDate: Date;
}

export function ListView({ posts, onSelectPost, currentDate }: ListViewProps) {
  // Sort posts by date and time
  const sortedPosts = [...posts].sort((a, b) => 
    a.scheduledTime.getTime() - b.scheduledTime.getTime()
  );

  // Group posts by date
  const groupedPosts = sortedPosts.reduce((acc, post) => {
    const dateKey = format(post.scheduledTime, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  return (
    <ScrollArea className="h-[calc(100vh-12rem)] border rounded-lg">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="w-[180px]">Date</TableHead>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="w-[100px]">Tags</TableHead>
            <TableHead className="w-[100px]">Media</TableHead>
            <TableHead className="w-[80px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedPosts).map(([dateKey, datePosts]) => (
            datePosts.map((post, index) => (
              <TableRow key={post.id} className={
                isSameDay(post.scheduledTime, currentDate) 
                  ? "bg-accent/50" 
                  : undefined
              }>
                {index === 0 && (
                  <TableCell 
                    className="font-medium"
                    rowSpan={datePosts.length}
                  >
                    {format(post.scheduledTime, 'MMM d, yyyy')}
                  </TableCell>
                )}
                <TableCell className="text-muted-foreground">
                  {format(post.scheduledTime, 'h:mm a')}
                </TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {post.title}
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <p className="truncate text-muted-foreground">
                    {post.content}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {post.image && (
                    <div className="relative w-10 h-10 rounded overflow-hidden">
                      <img
                        src={post.image}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSelectPost(post)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
} 