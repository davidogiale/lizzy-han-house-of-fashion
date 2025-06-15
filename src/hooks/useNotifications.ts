
import { useQuery } from "@tanstack/react-query";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome!",
    message: "Thanks for joining the admin team.",
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unread: true,
  },
  {
    id: "2",
    title: "Order placed",
    message: "A customer placed a new order.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unread: false,
  },
  {
    id: "3",
    title: "Stock alert",
    message: "Low stock for a popular product.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    unread: true,
  },
];

export function useNotifications(userId: string | null) {
  // Since there is no notifications table, we return mock data
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      if (!userId) return [];
      // Return mock data for now
      return mockNotifications;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
}
