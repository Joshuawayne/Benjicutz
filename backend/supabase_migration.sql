-- ============================================================
-- CRAFTSMAN BARBERSHOP — Supabase Database Migration
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price_kes NUMERIC NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'SIGNATURE_CUTS',
  popular_tag TEXT,
  target_audience TEXT NOT NULL DEFAULT 'ALL',
  icon_name TEXT DEFAULT 'Scissors',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  preferred_zone TEXT DEFAULT 'KILELESHWA',
  preferred_style_notes TEXT,
  is_vip_retainer BOOLEAN DEFAULT FALSE,
  retainer_tier TEXT DEFAULT 'NONE',
  total_bookings_count INTEGER DEFAULT 0,
  last_booking_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  price_amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'KES',
  zone TEXT NOT NULL,
  location_address TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RETAINER TIERS TABLE
CREATE TABLE IF NOT EXISTS retainer_tiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  monthly_kes NUMERIC NOT NULL,
  visits_per_month INTEGER NOT NULL DEFAULT 2,
  perks JSONB DEFAULT '[]'::jsonb,
  recommended_zone TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BUSINESS SETTINGS TABLE (key-value store)
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_bookings_client_phone ON bookings(client_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_zone ON bookings(zone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_business_settings_key ON business_settings(key);

-- ============================================================
-- SEED DATA — Services (matches existing hardcoded data)
-- ============================================================
INSERT INTO services (title, subtitle, description, duration_minutes, price_kes, category, popular_tag, target_audience, icon_name, sort_order)
VALUES
  (
    'Executive Signature Cut & Beard Sculpting',
    'Precision Hot-Towel Haircut & Razor Lineup',
    'Tailored precision cut matching head shape & hairline, hot-towel steam, razor finish, and organic beard oil treatment.',
    45, 4500, 'SIGNATURE_CUTS', 'Most Popular', 'EXECUTIVE', 'Scissors', 1
  ),
  (
    'Micro-Airblading Hairline Restoration',
    'Non-Invasive Micro-Pigment Definition',
    'Semi-permanent micro-airblading pigment touch-up for receded, thinning, or uneven hairlines. Sharp crisp finish.',
    60, 7000, 'HAIRLINE_RESTORATION', 'Gen Z & Executive Choice', 'TRENDSETTER', 'Sparkles', 2
  ),
  (
    'Father & Son VIP House-Call Package',
    'Back-to-Back Family Private Studio Session',
    'Two complete haircuts & beard grooming in one quiet home visit. Ideal for parents & busy weekend family schedules.',
    90, 8500, 'HOUSE_CALL_PACKAGES', 'Best Family Value', 'FAMILY', 'Users', 3
  ),
  (
    'Organic Scalp Detox & Botanical Therapy',
    'Handcrafted Herbal Scalp & Follicle Treatment',
    'Exfoliating tea tree & eucalyptus scalp scrub, deep conditioning beard wash, and high-frequency scalp stimulation.',
    40, 3500, 'ORGANIC_TREATMENTS', NULL, 'ALL', 'Droplet', 4
  ),
  (
    'Skin Fade & Gradient Edging',
    'Clean Zero-to-Skin Taper with Edge Definition',
    'Ultra-precise skin fade with seamless gradient transition. Includes hot towel prep and aftershave balm.',
    35, 3500, 'SIGNATURE_CUTS', NULL, 'ALL', 'Scissors', 5
  ),
  (
    'Hot Towel Steam & Straight Razor Shave',
    'Classic Barber Straight Razor Experience',
    'Traditional hot towel steam prep, premium lather, and precision straight razor shave. Includes aftershave treatment.',
    30, 2500, 'ORGANIC_TREATMENTS', NULL, 'EXECUTIVE', 'Flame', 6
  ),
  (
    'Beard Sculpt & Lineup',
    'Precision Beard Shaping & Edge Definition',
    'Expert beard sculpting with razor-sharp lineup, oil treatment, and styling. Perfect for maintaining a groomed look.',
    25, 2500, 'SIGNATURE_CUTS', NULL, 'ALL', 'Scissors', 7
  ),
  (
    'Scalp Follicle Stimulation',
    'Advanced Hair Growth Stimulation Treatment',
    'High-frequency scalp stimulation therapy designed to promote follicle health and encourage natural hair growth.',
    35, 3000, 'ORGANIC_TREATMENTS', NULL, 'ALL', 'Zap', 8
  )
ON CONFLICT DO NOTHING;

-- Ensure perks column is jsonb if table already existed as text[]
DO $$ 
BEGIN 
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'retainer_tiers' AND column_name = 'perks' AND data_type = 'ARRAY'
  ) THEN 
    ALTER TABLE retainer_tiers ALTER COLUMN perks TYPE jsonb USING to_jsonb(perks);
  END IF;
END $$;

INSERT INTO retainer_tiers (name, monthly_kes, visits_per_month, perks, recommended_zone, sort_order)
VALUES
  (
    'The Executive Pass',
    9000, 2,
    '["2 Reserved Fixed Monthly House-Calls (e.g. 2nd & 4th Friday)", "Priority Emergency Event Booking Guarantee", "Complimentary Scalp Detox & Airblading Lineup Touch-Up", "Zero Transport Fee within Kileleshwa, Lavington & Westlands"]'::jsonb,
    'Kileleshwa, Westlands, Lavington',
    1
  ),
  (
    'Family Heritage Pass',
    16000, 2,
    '["2 Back-to-Back Father & Son House Calls per month", "Dedicated Mobile Studio Slot (Saturdays or After-Hours)", "Custom Organic Beard & Scalp Maintenance Kits Included", "Direct Priority WhatsApp Craftsman Hotline"]'::jsonb,
    'Kilimani, Lavington & Westlands',
    2
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA — Business Settings
-- ============================================================
INSERT INTO business_settings (key, value)
VALUES
  ('business_name', '"BENJI CUTZ BARBER SHOP"'),
  ('tagline', '"Executive Mobile Studio • Nairobi"'),
  ('phone', '"+254 751 022224"'),
  ('email', '"[EMAIL_ADDRESS]"'),
  ('working_hours', '"07:30 AM – 07:00 PM (Tue – Sun)"'),
  ('currency', '"KES"'),
  ('established_year', '"2020"'),
  ('location_city', '"Nairobi"'),
  ('zones', '[{"id":"KILELESHWA","name":"Kileleshwa","transportFeeKes":500},{"id":"WESTLANDS","name":"Westlands","transportFeeKes":500},{"id":"LAVINGTON","name":"Lavington","transportFeeKes":500},{"id":"KILIMANI","name":"Kilimani","transportFeeKes":600},{"id":"EASTLANDS","name":"Eastlands","transportFeeKes":1000}]')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- SEED DATA — Sample Clients
-- ============================================================
INSERT INTO clients (name, phone, email, preferred_zone, is_vip_retainer, retainer_tier, total_bookings_count, last_booking_at)
VALUES
  ('David Omondi', '+254712345678', 'david.omondi@corp.co.ke', 'KILELESHWA', TRUE, 'EXECUTIVE_PASS', 8, NOW() - INTERVAL '14 days'),
  ('Anthony Ndirangu', '+254722987654', 'anthony@westlands.co.ke', 'WESTLANDS', TRUE, 'FAMILY_HOUSE_CALL', 12, NOW() - INTERVAL '13 days'),
  ('Dr. Hassan Kamau', '+254733112233', 'hassan@lavington.org', 'LAVINGTON', FALSE, 'NONE', 3, NOW() - INTERVAL '2 days')
ON CONFLICT (phone) DO NOTHING;

-- ============================================================
-- RLS POLICIES (optional — backend uses service_role key)
-- ============================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE retainer_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read on services, retainer_tiers, and business_settings
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active retainer tiers" ON retainer_tiers FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read business settings" ON business_settings FOR SELECT USING (TRUE);

-- Authenticated users can do everything
CREATE POLICY "Authenticated full access on services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access on clients" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access on bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access on retainer_tiers" ON retainer_tiers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access on business_settings" ON business_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- BUSINESS INTELLIGENCE (BI) STORED PROCEDURE
-- Native PostgreSQL aggregated analytics calculations
-- ============================================================
CREATE OR REPLACE FUNCTION get_dashboard_analytics()
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'totalRevenueKes', COALESCE(SUM(price_amount), 0),
        'activeClientsCount', COUNT(DISTINCT client_phone),
        'vipRetainerClientsCount', COUNT(DISTINCT CASE WHEN price_amount >= 10000 THEN client_phone END),
        'rebookingRetentionRatePct', CASE 
            WHEN COUNT(DISTINCT client_phone) > 0 THEN 
                ROUND(((COUNT(client_phone) - COUNT(DISTINCT client_phone))::numeric / COUNT(DISTINCT client_phone)::numeric) * 100, 1)
            ELSE 0 
        END,
        'totalCompletedBookings', COUNT(*),
        'avgBookingValueKes', COALESCE(ROUND(AVG(price_amount), 0), 0),
        'zoneBreakdown', COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'zone', UPPER(zone),
                'bookingCount', cnt,
                'revenueAmount', rev
            ))
            FROM (
                SELECT zone, COUNT(*) as cnt, SUM(price_amount) as rev
                FROM public.bookings
                GROUP BY zone
            ) z
        ), '[]'::jsonb),
        'generatedAt', NOW()
    ) INTO result
    FROM public.bookings;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
