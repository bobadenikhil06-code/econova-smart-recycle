import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MapLocationPicker from "./MapLocationPicker";
import { supabase } from "@/integrations/supabase/client";
import { useScrapCategories } from "@/hooks/useScrapCategories";
import { toast } from "sonner";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Scale, 
  CheckCircle,
  ArrowRight,
  Phone,
  User,
  Tag
} from "lucide-react";

const BookingForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const { data: categories } = useScrapCategories();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    category: "",
    estimatedWeight: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });

  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM", 
    "3:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (address: string, coords: [number, number]) => {
    setFormData(prev => ({ ...prev, address }));
    setCoordinates(coords);
    setShowMap(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to book a pickup");
      navigate("/auth");
      return;
    }

    if (!formData.category || !formData.estimatedWeight || !formData.address || !formData.preferredDate || !formData.preferredTime) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const pickupDateTime = new Date(`${formData.preferredDate} ${formData.preferredTime.split(' - ')[0]}`);
      
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        category_id: formData.category,
        estimated_weight: parseFloat(formData.estimatedWeight),
        pickup_address: formData.address,
        pickup_time: pickupDateTime.toISOString(),
        notes: formData.notes || null,
        status: "pending"
      });

      if (error) throw error;

      toast.success("Booking created successfully!");
      setFormData({
        name: "",
        phone: "",
        address: "",
        category: "",
        estimatedWeight: "",
        preferredDate: "",
        preferredTime: "",
        notes: ""
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast.error(error.message || "Failed to create booking");
    }
  };

  return (
    <section className="py-20 bg-white" id="booking">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Schedule Your <span className="text-gradient">Pickup</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book a convenient pickup time and get instant price estimates for your recyclables
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-0 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Pickup Location
                    </h3>
                    
                    {!showMap ? (
                      <>
                        <div>
                          <Label htmlFor="address">Complete Address *</Label>
                          <Textarea
                            id="address"
                            placeholder="House/Flat No., Street, Area, Landmark"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="mt-1"
                            rows={3}
                            required
                          />
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setShowMap(true)}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Select Location on Map
                        </Button>
                      </>
                    ) : (
                      <MapLocationPicker 
                        onLocationSelect={handleLocationSelect}
                        defaultAddress={formData.address}
                      />
                    )}
                  </div>

                  {/* Scrap Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" />
                      Scrap Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Primary Category *</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => handleInputChange("category", e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select category</option>
                          {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="weight">Estimated Weight (kg) *</Label>
                        <Input
                          id="weight"
                          type="number"
                          min="1"
                          step="0.1"
                          placeholder="e.g., 10"
                          value={formData.estimatedWeight}
                          onChange={(e) => handleInputChange("estimatedWeight", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Preferred Schedule
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                          className="mt-1"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <select
                          id="time"
                          value={formData.preferredTime}
                          onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select time slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific instructions or additional items to mention..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>


                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Pickup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </Card>
            </div>

            {/* Booking Summary & Info */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose Econova?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Free doorstep pickup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Instant weight verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Transparent pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Immediate payment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Environmental impact tracking</span>
                  </div>
                </div>
              </Card>

              {/* Contact Card */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">+91 98765 43210</div>
                      <div className="text-sm text-muted-foreground">9 AM - 8 PM, All days</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </Card>

              {/* Emergency Pickup */}
              <Card className="p-6 border-amber-200 bg-amber-50">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Same-Day Pickup</h3>
                <p className="text-sm text-amber-700 mb-4">
                  Need urgent pickup? We offer same-day service in select areas for orders above 50kg.
                </p>
                <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100">
                  Request Same-Day
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;