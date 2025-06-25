
import React, { useState } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function AdminHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setProfileOpen((s) => !s);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-xl font-bold">Lizzy Han House of Fashion</h1>
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" onClick={handleProfileClick}>
                <User />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {profileOpen && (
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost">Options</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button onClick={handleLogout}>Logout</Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
}
