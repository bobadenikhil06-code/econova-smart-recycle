-- Create enum types
CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'collector');
CREATE TYPE public.booking_status AS ENUM ('pending', 'assigned', 'completed', 'cancelled');
CREATE TYPE public.payment_method AS ENUM ('upi', 'cash', 'wallet');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  address TEXT,
  wallet_balance DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  role user_role DEFAULT 'user' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create scrap_categories table
CREATE TABLE public.scrap_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  unit TEXT DEFAULT 'kg' NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create market_rates table (stores daily rates with history)
CREATE TABLE public.market_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.scrap_categories(id) ON DELETE CASCADE NOT NULL,
  price_per_kg DECIMAL(10, 2) NOT NULL,
  location TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(category_id, location, date)
);

-- Create collectors table
CREATE TABLE public.collectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_areas TEXT[] NOT NULL,
  earnings DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.scrap_categories(id) ON DELETE CASCADE NOT NULL,
  estimated_weight DECIMAL(10, 2) NOT NULL,
  pickup_time TIMESTAMP WITH TIME ZONE NOT NULL,
  pickup_address TEXT NOT NULL,
  status booking_status DEFAULT 'pending' NOT NULL,
  collector_id UUID REFERENCES public.collectors(id) ON DELETE SET NULL,
  actual_weight DECIMAL(10, 2),
  final_amount DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  method payment_method NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  transaction_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrap_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for scrap_categories (public read)
CREATE POLICY "Anyone can view scrap categories"
  ON public.scrap_categories FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for market_rates (public read)
CREATE POLICY "Anyone can view market rates"
  ON public.market_rates FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for collectors
CREATE POLICY "Anyone can view collectors"
  ON public.collectors FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_collectors_updated_at
  BEFORE UPDATE ON public.collectors
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default scrap categories
INSERT INTO public.scrap_categories (name, description, unit, icon) VALUES
  ('Paper', 'Newspapers, magazines, cardboard, office paper', 'kg', 'FileText'),
  ('Plastic', 'Bottles, containers, bags, packaging materials', 'kg', 'Recycle'),
  ('Metal', 'Aluminum cans, steel, copper, brass items', 'kg', 'CircleDot'),
  ('Electronics', 'Old phones, computers, cables, appliances', 'kg', 'Smartphone'),
  ('Glass', 'Bottles, jars, broken glass items', 'kg', 'Wine'),
  ('Hair', 'Human hair for recycling purposes', 'kg', 'User'),
  ('Clothes', 'Old textiles, fabric, garments', 'kg', 'Shirt');

-- Insert sample market rates for different locations
INSERT INTO public.market_rates (category_id, price_per_kg, location, date) 
SELECT id, 
  CASE 
    WHEN name = 'Paper' THEN 15.00
    WHEN name = 'Plastic' THEN 20.00
    WHEN name = 'Metal' THEN 45.00
    WHEN name = 'Electronics' THEN 35.00
    WHEN name = 'Glass' THEN 8.00
    WHEN name = 'Hair' THEN 500.00
    WHEN name = 'Clothes' THEN 12.00
  END,
  location,
  CURRENT_DATE
FROM public.scrap_categories
CROSS JOIN (VALUES ('Mumbai'), ('Delhi'), ('Bangalore'), ('Hyderabad')) AS locations(location);