
import React from 'react';
import { BarChart3, Package, Users, ShoppingCart, Settings, Home } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Overview",
    icon: BarChart3,
    href: "#overview",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "#orders",
  },
  {
    title: "Products",
    icon: Package,
    href: "#products",
  },
  {
    title: "Customers",
    icon: Users,
    href: "#customers",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#settings",
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <span className="text-lg font-semibold">Admin Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
