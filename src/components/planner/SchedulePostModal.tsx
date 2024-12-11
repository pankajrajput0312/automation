import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SchedulePostModalProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (post: any) => void;
}

export function SchedulePostModal({ open, onClose, onSchedule }: SchedulePostModalProps) {
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  const [socialProfile, setSocialProfile] = useState("");
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setMedia([...media, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMedia([...media, ...files]);
    }
  };

  const timeOptions = {
    hours: Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')),
    minutes: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')),
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] flex flex-col max-h-[85vh]">
        <DialogHeader className="sticky top-0 bg-background z-10 pb-4 border-b">
          <DialogTitle>Schedule New Post</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 py-4">
            {/* Social Profile Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Social Profile</label>
              <Select value={socialProfile} onValueChange={setSocialProfile}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Media Upload */}
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center",
                "hover:border-primary/50 transition-colors"
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Input
                type="file"
                className="hidden"
                id="media-upload"
                multiple
                onChange={handleFileSelect}
              />
              <label 
                htmlFor="media-upload" 
                className="cursor-pointer space-y-2 flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Drag & drop files here or click to upload
                </div>
              </label>
              {media.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {media.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="rounded-lg w-full aspect-video object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setMedia(media.filter((_, i) => i !== index))}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Caption</label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your caption here..."
                className="min-h-[100px]"
              />
            </div>

            {/* Date & Time Selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="flex gap-2">
                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hour</SelectLabel>
                        {timeOptions.hours.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Minute</SelectLabel>
                        {timeOptions.minutes.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={period} onValueChange={(v) => setPeriod(v as "AM" | "PM")}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t bg-background py-4 mt-auto">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            if (date) {
              let hours = parseInt(hour);
              if (period === "PM" && hours !== 12) hours += 12;
              if (period === "AM" && hours === 12) hours = 0;
              
              const scheduledTime = new Date(date);
              scheduledTime.setHours(hours, parseInt(minute));
              
              onSchedule({
                socialProfile,
                media,
                caption,
                scheduledTime,
              });
              onClose();
            }
          }}>
            Schedule Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 