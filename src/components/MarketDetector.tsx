import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Bell,
  Calendar
} from "lucide-react";

const MarketDetector = () => {
  const [selectedCategory, setSelectedCategory] = useState("Paper");
  
  const marketData = {
    Paper: { 
      price: 14, 
      trend: 5.2, 
      weekly: [12, 13, 14, 13, 15, 14, 14],
      location: "Mumbai"
    },
    Plastic: { 
      price: 22, 
      trend: -2.1, 
      weekly: [23, 24, 22, 21, 22, 23, 22],
      location: "Mumbai"
    },
    Metal: { 
      price: 85, 
      trend: 8.5, 
      weekly: [78, 80, 82, 85, 87, 85, 85],
      location: "Mumbai"
    },
    Electronics: { 
      price: 150, 
      trend: 12.3, 
      weekly: [135, 140, 145, 150, 155, 150, 150],
      location: "Mumbai"
    },
    Glass: { 
      price: 10, 
      trend: 0, 
      weekly: [10, 10, 10, 10, 10, 10, 10],
      location: "Mumbai"
    },
    Hair: { 
      price: 500, 
      trend: 15.6, 
      weekly: [450, 460, 480, 500, 520, 500, 500],
      location: "Mumbai"
    }
  };

  const categories = Object.keys(marketData);
  const currentData = marketData[selectedCategory as keyof typeof marketData];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent/10">
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
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white border border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">{category}</div>
                  <div className={`text-sm ${
                    selectedCategory === category ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    ₹{marketData[category as keyof typeof marketData].price}/kg
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
                  <h3 className="text-3xl font-bold text-foreground mb-2">{selectedCategory}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{currentData.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary mb-2">
                    ₹{currentData.price}
                    <span className="text-lg text-muted-foreground">/kg</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    currentData.trend > 0 ? "text-green-600" : 
                    currentData.trend < 0 ? "text-red-600" : "text-gray-600"
                  }`}>
                    {currentData.trend > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : currentData.trend < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <DollarSign className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {currentData.trend > 0 ? "+" : ""}{currentData.trend}%
                    </span>
                    <span className="text-muted-foreground text-sm">7d</span>
                  </div>
                </div>
              </div>

              {/* Simple 7-day Chart */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  7-Day Price Trend
                </h4>
                <div className="flex items-end justify-between h-24 gap-1">
                  {currentData.weekly.map((price, index) => {
                    const height = (price / Math.max(...currentData.weekly)) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-primary rounded-t opacity-80 hover:opacity-100 transition-opacity duration-300 min-h-[4px]"
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-muted-foreground mt-2">
                          {index === 6 ? "Today" : `${7-index}d`}
                        </div>
                      </div>
                    );
                  })}
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
                  {selectedCategory} prices are {currentData.trend > 0 ? "rising" : currentData.trend < 0 ? "falling" : "stable"}. 
                  {currentData.trend > 5 ? " Great time to sell!" : currentData.trend > 0 ? " Consider selling soon." : " Monitor for better rates."}
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