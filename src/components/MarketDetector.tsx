import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMarketRates, useMarketRateHistory } from "@/hooks/useMarketRates";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Bell,
  Calendar
} from "lucide-react";

const MarketDetector = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { data: marketRates, isLoading } = useMarketRates("Mumbai");
  const { data: historyData } = useMarketRateHistory(selectedCategoryId || "", "Mumbai", 30);

  // Get unique categories and select first one by default
  const categories = marketRates || [];
  const selectedRate = selectedCategoryId 
    ? categories.find(r => r.category_id === selectedCategoryId)
    : categories[0];

  // Calculate trend from history
  const calculateTrend = () => {
    if (!historyData || historyData.length < 2) return 0;
    const oldest = historyData[0].price_per_kg;
    const newest = historyData[historyData.length - 1].price_per_kg;
    return ((newest - oldest) / oldest) * 100;
  };

  const trend = calculateTrend();

  // Format history data for chart
  const chartData = historyData?.map(rate => ({
    date: new Date(rate.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    price: Number(rate.price_per_kg)
  })) || [];

  // Set initial category
  if (!selectedCategoryId && categories.length > 0) {
    setSelectedCategoryId(categories[0].category_id);
  }

  if (isLoading || !selectedRate) {
    return (
      <section id="market-detector" className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">Loading market rates...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="market-detector" className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Market Rates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-gradient">Market Detector</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time pricing updates to help you sell at the best rates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Selector */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-foreground mb-4">Select Category</h3>
            <div className="space-y-2">
              {categories.map((rate) => (
                <button
                  key={rate.category_id}
                  onClick={() => setSelectedCategoryId(rate.category_id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedCategoryId === rate.category_id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white border border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">{rate.scrap_categories?.name}</div>
                  <div className={`text-sm ${
                    selectedCategoryId === rate.category_id ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    ₹{rate.price_per_kg}/kg
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Display & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Price Card */}
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-white to-primary/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{selectedRate.scrap_categories?.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedRate.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary mb-2">
                    ₹{selectedRate.price_per_kg}
                    <span className="text-lg text-muted-foreground">/kg</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    trend > 0 ? "text-green-600" : 
                    trend < 0 ? "text-red-600" : "text-gray-600"
                  }`}>
                    {trend > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : trend < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <DollarSign className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {trend > 0 ? "+" : ""}{trend.toFixed(1)}%
                    </span>
                    <span className="text-muted-foreground text-sm">30d</span>
                  </div>
                </div>
              </div>

              {/* Stock Market Style Chart */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  30-Day Price History
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748b"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#64748b"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '8px'
                        }}
                        formatter={(value: any) => [`₹${value}`, 'Price']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Price Alert
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Pickup
                </Button>
              </div>
            </Card>

            {/* Market Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 border-green-200 bg-green-50">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Best Time to Sell</span>
                </div>
                <p className="text-sm text-green-700">
                  {selectedRate.scrap_categories?.name} prices are {trend > 0 ? "rising" : trend < 0 ? "falling" : "stable"}. 
                  {trend > 5 ? " Great time to sell!" : trend > 0 ? " Consider selling soon." : " Monitor for better rates."}
                </p>
              </Card>
              
              <Card className="p-6 border-blue-200 bg-blue-50">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Location Impact</span>
                </div>
                <p className="text-sm text-blue-700">
                  Prices may vary by ±10% based on your exact location and current demand in your area.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketDetector;