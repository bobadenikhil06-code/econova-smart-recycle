import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMarketRates = (location: string = "Mumbai") => {
  return useQuery({
    queryKey: ["market-rates", location],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("market_rates")
        .select(`
          *,
          scrap_categories (
            id,
            name,
            icon
          )
        `)
        .eq("location", location)
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useMarketRateHistory = (categoryId: string, location: string = "Mumbai", days: number = 7) => {
  return useQuery({
    queryKey: ["market-rate-history", categoryId, location, days],
    queryFn: async () => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      
      const { data, error } = await supabase
        .from("market_rates")
        .select("*")
        .eq("category_id", categoryId)
        .eq("location", location)
        .gte("date", date.toISOString().split('T')[0])
        .order("date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
};