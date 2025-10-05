import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ScrapCategories from "@/components/ScrapCategories";
import MarketDetector from "@/components/MarketDetector";
import Rewards from "@/components/Rewards";
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
        <section id="how-it-works"><HowItWorks /></section>
        <section id="categories"><ScrapCategories /></section>
        <MarketDetector />
        <Rewards />
        <section id="booking"><BookingForm /></section>
        <section id="about"><Sustainability /></section>
        <section id="contact"><Testimonials /></section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
