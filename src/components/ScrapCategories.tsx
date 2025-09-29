import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Recycle, 
  Zap, 
  Monitor, 
  Wine, 
  Cpu,
  Scissors,
  ArrowRight
} from "lucide-react";

const ScrapCategories = () => {
  const categories = [
    {
      icon: FileText,
      name: "Paper",
      items: ["Newspapers", "Magazines", "Cardboard", "Office Paper"],
      rate: "₹12-15/kg",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Recycle,
      name: "Plastic",
      items: ["Bottles", "Containers", "Packaging", "Bags"],
      rate: "₹18-25/kg",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      name: "Metal",
      items: ["Aluminum", "Iron", "Copper", "Steel"],
      rate: "₹35-180/kg",
      color: "from-gray-500 to-gray-600"
    },
    {
      icon: Monitor,
      name: "Electronics",
      items: ["Laptops", "Phones", "TVs", "Appliances"],
      rate: "₹50-500/kg",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Wine,
      name: "Glass",
      items: ["Bottles", "Jars", "Windows", "Mirrors"],
      rate: "₹8-12/kg",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: Cpu,
      name: "E-Waste",
      items: ["Circuits", "Batteries", "Cables", "Components"],
      rate: "₹25-150/kg",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Scissors,
      name: "Hair",
      items: ["Human Hair", "Salon Waste", "Extensions", "Wigs"],
      rate: "₹200-800/kg",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What We <span className="text-gradient">Collect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From everyday household items to specialized waste - we handle it all with care and transparency
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="eco-card p-6 group cursor-pointer">
              {/* Icon with Gradient Background */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Category Name */}
              <h3 className="text-xl font-bold text-foreground mb-2">{category.name}</h3>
              
              {/* Current Rate */}
              <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-sm mb-4 inline-block">
                {category.rate}
              </div>
              
              {/* Items List */}
              <ul className="space-y-1 text-sm text-muted-foreground">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Special Hair Collection Highlight */}
        <div className="eco-card p-8 bg-gradient-to-r from-primary/5 to-accent/10 border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Scissors className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Hair Collection - Unique to Econova
              </h3>
              <p className="text-muted-foreground mb-4">
                Did you know? 1kg of hair can clean up to 2 liters of oil spills! 
                We partner with salons and individuals to collect hair for environmental cleanup projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Oil Spill Cleanup</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Eco-friendly</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">High Value</span>
              </div>
            </div>
            <Button className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrapCategories;