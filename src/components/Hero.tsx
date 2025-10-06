import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Recycle } from "lucide-react";
import heroImage from "@/assets/hero-recycling.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRates = () => {
    const ratesSection = document.getElementById("market-rates");
    if (ratesSection) {
      ratesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Sustainable recycling and waste collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Recycle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Econova</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Sell Your Scrap,{" "}
            <span className="text-gradient block">Save the Planet</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            India's smartest digital Kabadiwala platform. Get the best prices for your recyclables 
            with doorstep pickup and instant payments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="hero-gradient text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={scrollToBooking}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Pickup
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
              onClick={scrollToRates}
            >
              Check Live Rates
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">1000+</div>
              <div className="text-white/80">Tons Recycled</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">50,000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">25+</div>
              <div className="text-white/80">Cities Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;