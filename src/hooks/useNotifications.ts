
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export function useNotifications(userId: string | null) {
  // This assumes you have a "notifications" table; if not, replace with mock data!
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Failed to fetch notifications", error);
        return [];
      }
      return (
        data?.map((n: any) => ({
          id: n.id,
          title: n.title,
          message: n.message,
          time: n.created_at || "",
          unread: !n.read_at,
        })) || []
      );
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
}
