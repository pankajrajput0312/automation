import { addHours, setHours, setMinutes } from "date-fns";

const titles = [
  "New Product Launch 🚀",
  "Behind the Scenes 📸",
  "Customer Spotlight ⭐",
  "Tips & Tricks 💡",
  "Team Update 👥",
  "Industry News 📰",
  "Product Feature Highlight ✨",
  "Customer Success Story 🏆",
];

const contents = [
  "Excited to announce our latest feature...",
  "Take a peek at what goes into making...",
  "Meet our amazing customer who achieved...",
  "Here's a pro tip for getting the most out of...",
  "Welcome our newest team member...",
  "Breaking news in our industry...",
  "Did you know about this awesome feature?",
  "See how our customer transformed their business...",
];

const tags = [
  "product",
  "community",
  "announcement",
  "tips",
  "news",
  "feature",
  "success",
  "team",
];

const images = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
  "https://images.unsplash.com/photo-1635405074683-96d6921a2a68",
  "https://images.unsplash.com/photo-1614029951470-ef9eb9952be7",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
];

export interface Post {
  id: string;
  title: string;
  content: string;
  scheduledTime: Date;
  tags: string[];
  image?: string;
}

export function getDummyPosts(date: Date): Post[] {
  const numPosts = Math.floor(Math.random() * 4);
  
  return Array.from({ length: numPosts }, (_, i) => {
    const baseTime = setHours(setMinutes(date, 0), 9);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)],
      scheduledTime: addHours(baseTime, i * 2),
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => tags[Math.floor(Math.random() * tags.length)]
      ),
      image: Math.random() > 0.3 ? images[Math.floor(Math.random() * images.length)] : undefined,
    };
  });
} 