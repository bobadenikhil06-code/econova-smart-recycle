import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Shield,
  RefreshCw,
  Search,
  Calendar
} from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { data: userRole, isLoading } = useUserRole(user?.id);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeCollectors: 0
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading && userRole !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/dashboard");
    }
  }, [userRole, isLoading, navigate]);

  useEffect(() => {
    if (userRole === "admin") {
      loadStats();
    }
  }, [userRole]);

  const loadStats = async () => {
    try {
      const [usersRes, bookingsRes, transactionsRes, collectorsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("transactions").select("amount"),
        supabase.from("collectors").select("id", { count: "exact", head: true })
      ]);

      const totalRevenue = transactionsRes.data?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

      setStats({
        totalUsers: usersRes.count || 0,
        totalBookings: bookingsRes.count || 0,
        totalRevenue,
        activeCollectors: collectorsRes.count || 0
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (userRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage Econova platform</p>
          </div>
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Users</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{stats.totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{stats.totalBookings}</p>
              </div>
              <Package className="w-12 h-12 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">₹{stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Active Collectors</p>
                <p className="text-3xl font-bold text-orange-900 mt-2">{stats.activeCollectors}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rates">Market Rates</TabsTrigger>
            <TabsTrigger value="roles">User Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="rates">
            <MarketRatesTab />
          </TabsContent>

          <TabsContent value="roles">
            <UserRolesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const BookingsTab = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select(`
        *,
        profiles!bookings_user_id_fkey (name, phone),
        scrap_categories (name)
      `)
      .order("created_at", { ascending: false })
      .limit(10);
    
    setBookings(data || []);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Recent Bookings</h3>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{booking.profiles?.name}</p>
              <p className="text-sm text-muted-foreground">{booking.scrap_categories?.name} - {booking.estimated_weight}kg</p>
              <p className="text-xs text-muted-foreground">{new Date(booking.pickup_time).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === "completed" ? "bg-green-100 text-green-800" :
                booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const UsersTab = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    
    setUsers(data || []);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Users</h3>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">{user.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">₹{user.wallet_balance}</p>
              <p className="text-xs text-muted-foreground">Wallet Balance</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const MarketRatesTab = () => {
  const [rates, setRates] = useState<any[]>([]);
  const [newRate, setNewRate] = useState({
    category_id: "",
    price_per_kg: "",
    location: "Mumbai"
  });

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    const { data } = await supabase
      .from("market_rates")
      .select(`
        *,
        scrap_categories (name)
      `)
      .order("date", { ascending: false });
    
    setRates(data || []);
  };

  const handleAddRate = async () => {
    if (!newRate.category_id || !newRate.price_per_kg) {
      toast.error("Please fill all fields");
      return;
    }

    const { error } = await supabase.from("market_rates").insert({
      category_id: newRate.category_id,
      price_per_kg: parseFloat(newRate.price_per_kg),
      location: newRate.location,
      date: new Date().toISOString().split('T')[0]
    });

    if (error) {
      toast.error("Failed to add rate");
    } else {
      toast.success("Rate added successfully");
      setNewRate({ category_id: "", price_per_kg: "", location: "Mumbai" });
      loadRates();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Market Rates Management</h3>
      
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-3">Add New Rate</h4>
        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="Category ID"
            value={newRate.category_id}
            onChange={(e) => setNewRate({...newRate, category_id: e.target.value})}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Price per kg"
            value={newRate.price_per_kg}
            onChange={(e) => setNewRate({...newRate, price_per_kg: e.target.value})}
          />
          <Button onClick={handleAddRate}>Add Rate</Button>
        </div>
      </div>

      <div className="space-y-3">
        {rates.map((rate) => (
          <div key={rate.id} className="p-3 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{rate.scrap_categories?.name}</p>
              <p className="text-sm text-muted-foreground">{rate.location} - {rate.date}</p>
            </div>
            <p className="text-lg font-bold text-primary">₹{rate.price_per_kg}/kg</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const UserRolesTab = () => {
  const [userEmail, setUserEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "moderator" | "user">("user");

  const handleAssignRole = async () => {
    if (!userEmail) {
      toast.error("Please enter user email");
      return;
    }

    try {
      // Note: This requires service role permissions
      // For now, users need to manually insert roles using SQL
      toast.info("Please use the backend to assign roles directly via SQL");
      
      // Example SQL command for user:
      // INSERT INTO public.user_roles (user_id, role) 
      // VALUES ('user-id-here', 'admin');
      
    } catch (error: any) {
      console.error("Error assigning role:", error);
      toast.error(error.message || "Failed to assign role");
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">User Roles Management</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="userEmail">User Email</Label>
          <Input
            id="userEmail"
            type="email"
            placeholder="user@example.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as any)}
            className="mt-1 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button onClick={handleAssignRole} className="w-full">
          Assign Role
        </Button>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">How to make yourself admin:</h4>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>Sign up for an account first if you haven't</li>
            <li>After signing up, note your user ID</li>
            <li>Open your backend SQL editor</li>
            <li>Run this query (replace YOUR_USER_ID with your actual ID):</li>
          </ol>
          <div className="mt-3 font-mono text-xs bg-white p-3 rounded border border-blue-300">
            INSERT INTO public.user_roles (user_id, role)<br/>
            VALUES ('YOUR_USER_ID', 'admin');
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Admin;
