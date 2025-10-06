import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Recycle, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Heart
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "How It Works", href: "how-it-works" },
    { label: "Categories", href: "categories" },
    { label: "Live Rates", href: "market-rates" },
    { label: "Schedule Pickup", href: "booking" },
  ];

  const companyLinks = [
    { label: "About Econova", href: "about" },
    { label: "Contact Us", href: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const supportLinks = [
    { label: "Help Center", href: "contact" },
    { label: "Contact Support", href: "contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
    { label: "Refund Policy", href: "#refund" }
  ];

  return (
    <footer className="bg-gradient-to-br from-earth-brown to-primary text-white">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Recycle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Econova</h3>
                  <p className="text-sm text-white/80">Eco + Innovation</p>
                </div>
              </div>
              
              <p className="text-white/90 mb-6 leading-relaxed">
                India's smartest digital Kabadiwala platform, revolutionizing recycling with 
                technology, transparency, and trust.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white/70" />
                  <span className="text-white/90">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white/70" />
                  <span className="text-white/90">hello@econova.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span className="text-white/90">Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-white/80 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <div className="space-y-3">
                {companyLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-white/80 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
              <p className="text-white/80 mb-4">
                Get the latest rates, eco-tips, and sustainability news.
              </p>
              
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button 
                  size="sm" 
                  className="bg-white text-primary hover:bg-white/90 flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="font-semibold mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Links Section */}
        <div className="border-t border-white/20 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="grid grid-cols-2 gap-2">
                {supportLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Download App */}
            <div>
              <h4 className="font-semibold mb-4">Download Our App</h4>
              <p className="text-sm text-white/80 mb-4">
                Get the Econova app for easier booking and real-time tracking.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Play Store
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  App Store
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/70 flex items-center gap-2">
              <span>© 2024 Econova. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for the planet.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;