import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Trees, 
  Droplets, 
  Zap, 
  Award, 
  Target,
  TrendingUp,
  Users
} from "lucide-react";

const Sustainability = () => {
  const impacts = [
    {
      icon: Trees,
      title: "Trees Saved",
      value: "2,500+",
      description: "Through paper recycling",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Droplets,
      title: "Water Cleaned",
      value: "5,000L",
      description: "Using recycled hair for oil spill cleanup",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Energy Saved",
      value: "50,000 kWh",
      description: "By recycling electronics & metals",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Leaf,
      title: "CO2 Reduced",
      value: "125 Tons",
      description: "Carbon footprint reduction",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const certifications = [
    {
      icon: Award,
      title: "ISO 14001 Certified",
      description: "Environmental Management System"
    },
    {
      icon: Target,
      title: "Zero Waste Partner",
      description: "Certified waste diversion program"
    },
    {
      icon: Users,
      title: "Green Business Certified",
      description: "Sustainable business practices"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-earth-light via-white to-primary/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Environmental Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Sustainability</span> Promise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every item you recycle with Econova creates a positive environmental impact. 
            Track your contribution to a cleaner, greener planet.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className="p-6 text-center eco-card">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mx-auto mb-4`}>
                <impact.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{impact.value}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{impact.title}</div>
              <div className="text-sm text-muted-foreground">{impact.description}</div>
            </Card>
          ))}
        </div>

        {/* Hair Special Impact */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Droplets className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Hair: The Unsung Environmental Hero
                </h3>
                <p className="text-muted-foreground mb-4 text-lg">
                  Did you know that human hair is one of nature's most effective oil absorbents? 
                  Just 1kg of hair can clean up to 2 liters of oil spills, making it invaluable for marine cleanup efforts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">1 kg Hair</div>
                    <div className="text-sm text-muted-foreground">Cleans 2L oil spills</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">500+ Salons</div>
                    <div className="text-sm text-muted-foreground">Partner with us</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">₹200-800/kg</div>
                    <div className="text-sm text-muted-foreground">Premium rates</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            Trusted <span className="text-gradient">Certifications</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 text-center eco-card">
                <div className="w-12 h-12 eco-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{cert.title}</h4>
                <p className="text-muted-foreground">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Personal Impact Tracker Preview */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Track Your <span className="text-gradient">Personal Impact</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              See the real environmental difference you're making with every pickup
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Trees className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold">Paper Recycled</div>
                    <div className="text-sm text-muted-foreground">Your contribution</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">12 Trees</div>
                  <div className="text-sm text-muted-foreground">Saved so far</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-600" />
                  <div>
                    <div className="font-semibold">Energy Saved</div>
                    <div className="text-sm text-muted-foreground">Electronics recycled</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-yellow-600">850 kWh</div>
                  <div className="text-sm text-muted-foreground">Power saved</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Carbon Footprint</div>
                    <div className="text-sm text-muted-foreground">CO2 reduction</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-600">2.5 Tons</div>
                  <div className="text-sm text-muted-foreground">CO2 saved</div>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="bg-primary/10 rounded-2xl p-8">
                <TrendingUp className="w-12 h-12 text-primary mx-auto lg:mx-0 mb-4" />
                <h4 className="text-xl font-bold text-foreground mb-3">
                  Join the Movement
                </h4>
                <p className="text-muted-foreground mb-6">
                  Start tracking your environmental impact today. Every small action contributes to a larger positive change for our planet.
                </p>
                <Button className="w-full lg:w-auto bg-primary hover:bg-primary/90">
                  Start Your Impact Journey
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Sustainability;