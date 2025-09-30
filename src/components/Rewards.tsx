import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, 
  Percent, 
  Users, 
  Coins,
  Trophy,
  Sparkles,
  ArrowRight,
  Tag
} from "lucide-react";

const Rewards = () => {
  const offers = [
    {
      icon: Gift,
      title: "Welcome Bonus",
      discount: "₹100 OFF",
      description: "Get ₹100 instant cashback on your first pickup",
      code: "WELCOME100",
      color: "from-primary to-primary/80"
    },
    {
      icon: Percent,
      title: "Bulk Bonus",
      discount: "20% Extra",
      description: "Get 20% extra cashback on pickups above 50kg",
      code: "BULK20",
      color: "from-accent to-accent/80"
    },
    {
      icon: Sparkles,
      title: "Weekend Special",
      discount: "₹50 OFF",
      description: "Book pickups on weekends and save ₹50",
      code: "WEEKEND50",
      color: "from-primary/70 to-primary/50"
    }
  ];

  const loyaltyFeatures = [
    {
      icon: Coins,
      title: "Earn EcoCoins",
      description: "Get 10 coins per kg recycled",
      value: "10 coins/kg"
    },
    {
      icon: Trophy,
      title: "Tier Benefits",
      description: "Unlock exclusive rewards as you recycle more",
      value: "3 Tiers"
    },
    {
      icon: Users,
      title: "Referral Rewards",
      description: "Refer friends and earn ₹200 per referral",
      value: "₹200/referral"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" id="rewards">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
            <Gift className="w-4 h-4 mr-2" />
            Rewards & Offers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get <span className="text-gradient">Rewarded</span> for Recycling
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn cashback, exclusive offers, and rewards every time you recycle with Econova
          </p>
        </div>

        {/* Active Offers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Active Offers & Coupons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {offers.map((offer, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-10`} />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${offer.color} text-white`}>
                      <offer.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                      Active
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {offer.title}
                  </h4>
                  <div className="text-3xl font-bold text-primary mb-3">
                    {offer.discount}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {offer.description}
                  </p>
                  
                  {/* Coupon Code */}
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-primary/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Code:</span>
                      </div>
                      <span className="text-lg font-bold text-primary tracking-wider">
                        {offer.code}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    onClick={() => navigator.clipboard.writeText(offer.code)}
                  >
                    Copy Code
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Loyalty Program */}
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-white p-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    EcoRewards Loyalty Program
                  </h3>
                  <p className="text-white/90 text-lg">
                    The more you recycle, the more you earn!
                  </p>
                </div>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  Join Now - It's Free!
                </Button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loyaltyFeatures.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      {feature.description}
                    </p>
                    <div className="text-2xl font-bold text-gradient">
                      {feature.value}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Referral CTA */}
              <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-accent/10 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Share the Green Movement</h4>
                      <p className="text-muted-foreground">
                        Refer friends and earn ₹200 when they complete their first pickup
                      </p>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Get Referral Code
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Terms */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          *Terms and conditions apply. Offers valid till stocks last. Rewards calculated based on final verified weight.
        </p>
      </div>
    </section>
  );
};

export default Rewards;
