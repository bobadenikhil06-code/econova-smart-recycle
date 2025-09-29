import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homemaker, Mumbai",
      avatar: "PS",
      rating: 5,
      text: "Econova has made recycling so convenient! The pickup team was professional, and I got better rates than my local kabadiwala. Plus, knowing my actions help the environment feels amazing.",
      impact: "Recycled 45kg of paper & plastic"
    },
    {
      name: "Rajesh Patel",
      role: "Business Owner, Delhi",
      avatar: "RP", 
      rating: 5,
      text: "As a restaurant owner, we generate a lot of cardboard and packaging waste. Econova's bulk pickup service has streamlined our waste management and even generates additional revenue.",
      impact: "Monthly pickup of 200kg+ waste"
    },
    {
      name: "Meera Beauty Salon",
      role: "Salon Owner, Bangalore",
      avatar: "MB",
      rating: 5,
      text: "I never knew hair could be so valuable! Econova collects hair from our salon and pays premium rates. It's wonderful to know we're contributing to environmental cleanup.",
      impact: "Hair collection program partner"
    },
    {
      name: "Arjun Tech Solutions",
      role: "IT Company, Pune",
      avatar: "AT",
      rating: 5,
      text: "Corporate waste management was always a headache until we found Econova. They handle our e-waste responsibly and provide detailed impact reports for our sustainability goals.",
      impact: "500kg+ e-waste recycled safely"
    },
    {
      name: "Lakshmi Krishnan",
      role: "Retired Teacher, Chennai",
      avatar: "LK",
      rating: 5,
      text: "The app is so easy to use, even for someone like me who's not tech-savvy. The pickup team explains everything clearly, and I love tracking my environmental contribution.",
      impact: "Regular customer for 8+ months"
    },
    {
      name: "Green Valley Apartments",
      role: "Housing Society, Hyderabad",
      avatar: "GV",
      rating: 5,
      text: "Econova helped our entire society become more eco-conscious. Their bulk collection service and resident education programs have transformed how we handle waste.",
      impact: "200+ families participate monthly"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who are making a difference while earning from their recyclables
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 eco-card h-full flex flex-col">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Impact Badge */}
              <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-4 text-center">
                {testimonial.impact}
              </div>
              
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">99.2%</div>
            <div className="text-sm text-muted-foreground">On-time Pickup</div>
          </div>
          
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Tons Recycled</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;