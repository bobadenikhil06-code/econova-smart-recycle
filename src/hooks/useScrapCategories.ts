import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useScrapCategories = () => {
  return useQuery({
    queryKey: ["scrap-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scrap_categories")
        .select("*")
        .order("created_at");

      if (error) throw error;
      return data;
    },
  });
};