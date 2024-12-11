import React, { useState } from 'react';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { Calendar } from '../planner/Calendar';
import { format } from 'date-fns';
import { Post } from '@/lib/dummy-data';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [view, setView] = useState<'week' | 'month'>('week');
  const [posts, setPosts] = useState<Record<string, Post[]>>({});

  const handlePostSelect = (post: Post) => {
    console.log('Selected post:', post);
  };

  const handlePostUpdate = (post: Post) => {
    console.log('Updated post:', post);
  };

  const handlePostDelete = (id: string) => {
    console.log('Deleted post:', id);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div>
        <Sidebar children={''}>
          {/* Sidebar content goes here */}
        </Sidebar>
        <Calendar
          view={view}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
    </SidebarProvider>
  );
} 