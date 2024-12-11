import { Post } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (post: Post) => void;
}

export function PostModal({ post, onClose, onDelete, onUpdate }: PostModalProps) {
  const [editedPost, setEditedPost] = useState<Post>(post);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedPost);
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
              Scheduled for {format(post.scheduledTime, 'PPP p')}
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
                  onDelete(post.id);
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