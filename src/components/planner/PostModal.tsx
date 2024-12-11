import { Post } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Trash2, Edit2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onUpdate?: (post: Post) => void;
  isDateView?: boolean;
  date?: Date;
  posts?: Post[];
  onSelectPost?: (post: Post) => void;
}

export function PostModal({ 
  post, 
  onClose, 
  onDelete, 
  onUpdate,
  isDateView,
  date,
  posts,
  onSelectPost
}: PostModalProps) {
  if (isDateView && date && posts) {
    return (
      <Dialog open onOpenChange={() => onClose()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Posts for {format(date, 'MMMM d, yyyy')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border rounded-lg hover:bg-accent/50 group relative transition-colors"
              >
                <div className="flex items-center gap-4">
                  {post.image && (
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(post.scheduledTime, 'h:mm a')}
                    </p>
                    <p className="text-sm line-clamp-2 mt-1">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 hover:bg-primary hover:text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPost?.(post);
                      }}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this post?')) {
                          onDelete?.(post.id);
                          onClose();
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const defaultPost: Post = {
    id: '',
    title: '',
    content: '',
    image: '',
    scheduledTime: new Date(),
    tags: []
  };

  const [editedPost, setEditedPost] = useState<Post>(post || defaultPost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate?.(editedPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-2xl rounded-lg shadow-lg relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Edit Post</h3>
            <p className="text-sm text-muted-foreground">
              Scheduled for {format(editedPost.scheduledTime, 'PPP p')}
            </p>
          </div>

          {editedPost.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={editedPost.image}
                alt="Post preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={editedPost.title}
                onChange={(e) => setEditedPost(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={editedPost.content}
                onChange={(e) => setEditedPost(prev => ({
                  ...prev,
                  content: e.target.value
                }))}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                value={editedPost.image || ''}
                onChange={(e) => setEditedPost(prev => ({
                  ...prev,
                  image: e.target.value
                }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (confirm('Are you sure you want to delete this post?')) {
                  onDelete?.(editedPost.id);
                  onClose();
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Post
            </Button>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 