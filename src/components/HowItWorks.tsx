import { Button } from "@/components/ui/button";
import { Calendar, Truck, CreditCard, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Book Pickup",
      description: "Schedule a convenient pickup time through our app or website. Select your scrap categories and get instant price estimates.",
      step: "01"
    },
    {
      icon: Truck,
      title: "Doorstep Collection",
      description: "Our trained professionals come to your location, weigh your items, and provide transparent pricing on the spot.",
      step: "02"
    },
    {
      icon: CreditCard,
      title: "Instant Payment",
      description: "Get paid immediately via UPI, cash, or bank transfer. Track your earnings and environmental impact in real-time.",
      step: "03"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-earth-light via-white to-accent">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How <span className="text-gradient">Econova</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and hassle-free recycling in just three easy steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="eco-card p-8 text-center h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="eco-gradient w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Arrow (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="hero-gradient text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your First Pickup
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;