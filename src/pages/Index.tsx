import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ScrapCategories from "@/components/ScrapCategories";
import MarketDetector from "@/components/MarketDetector";
import BookingForm from "@/components/BookingForm";
import Sustainability from "@/components/Sustainability";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ScrapCategories />
        <MarketDetector />
        <BookingForm />
        <Sustainability />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
