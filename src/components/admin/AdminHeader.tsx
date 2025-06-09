
import React, { useState } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from 'lucide-react';

const notifications = [
  { id: 1, title: "Low Stock Alert", message: "Leather Handbag has only 5 units left", time: "2 min ago", unread: true },
  { id: 2, title: "New Order", message: "Order #ORD-2024-006 received", time: "15 min ago", unread: true },
  { id: 3, title: "Product Updated", message: "Cashmere Sweater price updated", time: "1 hour ago", unread: false },
];

export function AdminHeader() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = () => {
    console.log('Notification bell clicked');
    setNotificationOpen(!notificationOpen);
  };

  const handleProfileClick = () => {
    console.log('User profile clicked');
    setProfileOpen(!profileOpen);
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
    // In a real app, this would update the notifications state
  };

  return (
    <TooltipProvider>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
                        <Bell className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications ({unreadCount} unread)</p>
                    </TooltipContent>
                  </Tooltip>
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Notifications</h4>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg border ${notification.unread ? 'bg-muted/50' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={profileOpen} onOpenChange={setProfileOpen}>
              <PopoverTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleProfileClick}>
                      <User className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User Profile</p>
                  </TooltipContent>
                </Tooltip>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">admin@company.com</p>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      View Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      Account Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
