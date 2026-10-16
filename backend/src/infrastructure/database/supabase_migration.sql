-- ==============================================================================
-- MOBILE BARBER CRAFTSMAN & B2B ACADEMY PLATFORM — IDEMPOTENT SUPABASE MIGRATION
-- High Performance, 3NF Normalization, ACID Concurrency, Airtight RLS Security
-- Location Context: Nairobi, Kenya (Kilimani, Lavington, Westlands, Karen, etc.)
-- ==============================================================================

-- 1. ENUMS (Consolidated and Idempotent)
DO $$ BEGIN
    CREATE TYPE public.booking_status AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.nairobi_zone AS ENUM (
        'Kilimani', 'Lavington', 'Westlands', 'Karen', 
        'Gigiri', 'Runda', 'Muthaiga', 'CBD', 'Kileleshwa', 'Parklands'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('CLIENT', 'ADMIN', 'INSTITUTION_PARTNER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. AUTOMATED TIMESTAMP TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. USER PROFILES TABLE (Normalized User Metadata linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT,
    phone TEXT,
    role public.user_role DEFAULT 'CLIENT'::public.user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Idempotent column and nullability adjustments (email is nullable to support phone-only auth)
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS role public.user_role DEFAULT 'CLIENT'::public.user_role NOT NULL;
ALTER TABLE public.user_profiles ALTER COLUMN email DROP NOT NULL;

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Protect immutable user_profiles columns and prevent client-side role escalation.
-- NOTE: Do NOT use CURRENT_USER inside SECURITY DEFINER — it always resolves to the
-- function owner (e.g. postgres), not the calling user. Instead, check the JWT claim
-- set by PostgREST/Supabase in the request context.
CREATE OR REPLACE FUNCTION public.protect_user_profile_fields()
RETURNS TRIGGER AS $$
DECLARE
    jwt_role TEXT := COALESCE(current_setting('request.jwt.claim.role', true), '');
BEGIN
    -- Prevent client from mutating immutable identity fields
    NEW.id = OLD.id;
    NEW.created_at = OLD.created_at;

    -- Role modification protection:
    -- Only allow role changes when the request explicitly carries the service_role JWT.
    -- Default-deny: empty jwt_role (direct DB session) also blocks role changes.
    -- Use a privileged admin function or direct SQL with SET LOCAL for migrations.
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        IF jwt_role IS DISTINCT FROM 'service_role' THEN
            NEW.role = OLD.role;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_prevent_user_profile_role_update ON public.user_profiles;
DROP TRIGGER IF EXISTS tr_protect_user_profile_fields ON public.user_profiles;
CREATE TRIGGER tr_protect_user_profile_fields
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_user_profile_fields();

-- App-specific auth trigger (ALWAYS defaults role to CLIENT, never trusts client metadata)
CREATE OR REPLACE FUNCTION public.barber_handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, phone, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'phone',
        'CLIENT'::public.user_role
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only manage the app-specific auth trigger (does NOT drop third-party or generic triggers)
DROP TRIGGER IF EXISTS barber_on_auth_user_created ON auth.users;
CREATE TRIGGER barber_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.barber_handle_new_user();

-- Backfill profile rows for any existing auth users missing in user_profiles (preserves NULL emails)
INSERT INTO public.user_profiles (id, email, full_name, phone, role)
SELECT 
    u.id, 
    u.email, 
    u.raw_user_meta_data->>'full_name', 
    u.raw_user_meta_data->>'phone', 
    'CLIENT'::public.user_role
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- 4. SERVICE CATEGORIES TABLE (3NF Normalization)
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. SERVICES TABLE (Grooming & Barber Packages)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    price_kes NUMERIC(10, 2) NOT NULL CHECK (price_kes >= 0),
    category TEXT NOT NULL,
    popular_tag TEXT,
    target_audience TEXT NOT NULL DEFAULT 'Executive Men',
    icon_name TEXT NOT NULL DEFAULT 'Scissors',
    sort_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS popular_tag TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'Executive Men' NOT NULL;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT 'Scissors' NOT NULL;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE NOT NULL;

DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. RETAINER TIERS TABLE (B2B & VIP Subscription Packages)
CREATE TABLE IF NOT EXISTS public.retainer_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    monthly_kes NUMERIC(10, 2) NOT NULL CHECK (monthly_kes >= 0),
    visits_per_month INT NOT NULL CHECK (visits_per_month > 0),
    perks JSONB DEFAULT '[]'::jsonb,
    recommended_zone TEXT,
    sort_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Ensure perks is JSONB in existing tables
DO $$ BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'retainer_tiers' AND column_name = 'perks' AND data_type != 'jsonb'
    ) THEN
        ALTER TABLE public.retainer_tiers ALTER COLUMN perks TYPE JSONB USING perks::jsonb;
    END IF;
END $$;

ALTER TABLE public.retainer_tiers ADD COLUMN IF NOT EXISTS recommended_zone TEXT;
ALTER TABLE public.retainer_tiers ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0 NOT NULL;
ALTER TABLE public.retainer_tiers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE NOT NULL;

DROP TRIGGER IF EXISTS update_retainer_tiers_updated_at ON public.retainer_tiers;
CREATE TRIGGER update_retainer_tiers_updated_at
BEFORE UPDATE ON public.retainer_tiers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. BUSINESS SETTINGS TABLE (Dynamic Key-Value Store)
CREATE TABLE IF NOT EXISTS public.business_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS update_business_settings_updated_at ON public.business_settings;
CREATE TRIGGER update_business_settings_updated_at
BEFORE UPDATE ON public.business_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. BOOKINGS TABLE (Client Appointments & Location Data)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL DEFAULT NULL,
    service_name TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    price_amount NUMERIC(10, 2) NOT NULL CHECK (price_amount >= 0),
    currency VARCHAR(3) DEFAULT 'KES' NOT NULL,
    zone public.nairobi_zone NOT NULL,
    location_address TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status public.booking_status DEFAULT 'CONFIRMED'::public.booking_status NOT NULL,
    reminder_sent BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT FALSE NOT NULL;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS client_email TEXT;

-- Update foreign key constraint on existing bookings table to ON DELETE SET NULL.
-- Inspect all existing FK constraints on bookings.service_id using PostgreSQL system catalogs (pg_constraint).
-- Verifies single-column shape (conkey = 1 column, confkey = 1 column), exact mapping (bookings.service_id -> services.id),
-- and delete rule (confdeltype = 'n' for SET NULL).
-- Drops any wrong-target, wrong-delete-action, duplicate, or composite foreign keys involving bookings.service_id,
-- and guarantees exactly one desired FK remains.
DO $$ 
DECLARE
    src_attnum INT2;
    tgt_attnum INT2;
    c RECORD;
    has_desired_fk BOOLEAN := FALSE;
BEGIN
    -- Get attribute numbers for service_id on bookings and id on services
    SELECT attnum INTO src_attnum 
    FROM pg_attribute 
    WHERE attrelid = 'public.bookings'::regclass AND attname = 'service_id' AND NOT attisdropped;

    SELECT attnum INTO tgt_attnum 
    FROM pg_attribute 
    WHERE attrelid = 'public.services'::regclass AND attname = 'id' AND NOT attisdropped;

    IF src_attnum IS NULL OR tgt_attnum IS NULL THEN
        RAISE EXCEPTION 'Required columns bookings.service_id or services.id not found.';
    END IF;

    -- Inspect all foreign key constraints on public.bookings that involve service_id
    FOR c IN
        SELECT 
            conname,
            confrelid,
            conkey,
            confkey,
            confdeltype
        FROM pg_constraint
        WHERE conrelid = 'public.bookings'::regclass
          AND contype = 'f'
          AND src_attnum = ANY(conkey)
    LOOP
        -- Check for exact single-column mapping: bookings(service_id) -> services(id) ON DELETE SET NULL ('n')
        IF c.confrelid = 'public.services'::regclass
           AND c.conkey = ARRAY[src_attnum]
           AND c.confkey = ARRAY[tgt_attnum]
           AND c.confdeltype = 'n'
           AND NOT has_desired_fk THEN
            has_desired_fk := TRUE;
        ELSE
            -- Drop obsolete, wrong-target, wrong-delete-action, composite, or duplicate FK constraint
            EXECUTE 'ALTER TABLE public.bookings DROP CONSTRAINT ' || quote_ident(c.conname);
        END IF;
    END LOOP;

    -- Add the constraint if not already present
    IF NOT has_desired_fk THEN
        ALTER TABLE public.bookings
            ADD CONSTRAINT bookings_service_id_fkey
            FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE SET NULL;
    END IF;
END $$;

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. PERFORMANCE INDEXING
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_at ON public.bookings(scheduled_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_client_phone ON public.bookings(client_phone);
CREATE INDEX IF NOT EXISTS idx_services_category_id ON public.services(category_id);

-- 10. ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retainer_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Targeted Policy Cleanup: Drop only the known policies this script manages.
-- This avoids accidentally removing policies added by other parts of the system.
-- Also drop legacy overly-permissive policy names from earlier script versions.
DO $$
DECLARE
    known_policies TEXT[][] := ARRAY[
        -- [table_name, policy_name]
        ARRAY['service_categories', 'public_read_categories'],
        ARRAY['services',           'public_read_active_services'],
        ARRAY['retainer_tiers',     'public_read_active_retainer_tiers'],
        ARRAY['business_settings',  'public_read_safe_settings'],
        ARRAY['user_profiles',      'users_read_own_profile'],
        ARRAY['user_profiles',      'users_update_own_profile'],
        -- Legacy names from earlier versions that should be removed
        ARRAY['services',           'full access for service role'],
        ARRAY['services',           'Authenticated full access on services'],
        ARRAY['bookings',           'full access for service role'],
        ARRAY['bookings',           'Authenticated full access on bookings'],
        ARRAY['retainer_tiers',     'full access for service role'],
        ARRAY['retainer_tiers',     'Authenticated full access on retainer_tiers'],
        ARRAY['business_settings',  'full access for service role'],
        ARRAY['business_settings',  'Authenticated full access on business_settings'],
        ARRAY['business_settings',  'Public can read business settings'],
        ARRAY['user_profiles',      'full access for service role'],
        ARRAY['service_categories', 'full access for service role']
    ];
    p TEXT[];
BEGIN
    FOREACH p SLICE 1 IN ARRAY known_policies LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p[2], p[1]);
    END LOOP;
END $$;

-- Public Read-Only Policies (Strictly SELECT on active catalog items)
CREATE POLICY "public_read_categories" ON public.service_categories 
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_active_services" ON public.services 
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "public_read_active_retainer_tiers" ON public.retainer_tiers 
    FOR SELECT TO anon, authenticated USING (is_active = true);

-- Scoped Settings Read: Only expose public configuration keys (operating hours, contact, zones)
CREATE POLICY "public_read_safe_settings" ON public.business_settings 
    FOR SELECT TO anon, authenticated 
    USING (key IN ('operating_hours', 'contact_info', 'service_zones', 'business_name', 'tagline', 'location_city', 'established_year'));

-- User Profiles: Authenticated users can only read/update their own profile
CREATE POLICY "users_read_own_profile" ON public.user_profiles 
    FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON public.user_profiles 
    FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Defense-in-depth: Revoke direct write privileges from anon, authenticated, AND PUBLIC.
-- In PostgreSQL, roles inherit grants from PUBLIC. Revoking from `authenticated` alone
-- does NOT remove privileges granted through PUBLIC. We must revoke from all three.
-- All administrative writes and booking creations use service_role via the backend server.
REVOKE INSERT, UPDATE, DELETE ON public.services FROM PUBLIC, anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.service_categories FROM PUBLIC, anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.retainer_tiers FROM PUBLIC, anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.business_settings FROM PUBLIC, anon, authenticated;
REVOKE INSERT, SELECT, UPDATE, DELETE ON public.bookings FROM PUBLIC, anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.user_profiles FROM PUBLIC, anon, authenticated;

-- Dynamic Column-Level Privilege Cleanup:
-- In PostgreSQL, column-level grants survive table-level REVOKEs.
-- Clean up any existing column-level write grants on all managed tables for PUBLIC, anon, and authenticated.
DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT table_schema, table_name, column_name, grantee, privilege_type
        FROM information_schema.column_privileges
        WHERE table_schema = 'public'
          AND table_name IN ('user_profiles', 'services', 'service_categories', 'retainer_tiers', 'business_settings', 'bookings')
          AND grantee IN ('PUBLIC', 'anon', 'authenticated')
          AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE')
    LOOP
        EXECUTE format('REVOKE %s (%I) ON %I.%I FROM %s',
            rec.privilege_type, rec.column_name, rec.table_schema, rec.table_name, rec.grantee);
    END LOOP;
END $$;

-- Explicitly grant only safe column-level UPDATE on user_profiles to authenticated users.
-- Profiles are created by the signup trigger (SECURITY DEFINER), so authenticated users
-- never need INSERT. Role changes require service_role.
GRANT UPDATE (full_name, phone) ON public.user_profiles TO authenticated;

-- 11. BOOTSTRAP SEED DATA (Insert-Only / Conflict-Safe by ID and Name)
-- Insert categories if not present by name. If the preferred UUID is taken by a different
-- category, generate a fresh random UUID so the category is still created.
INSERT INTO public.service_categories (id, name, description, sort_order)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.service_categories WHERE id = '11111111-1111-1111-1111-111111111111') 
        THEN gen_random_uuid() 
        ELSE '11111111-1111-1111-1111-111111111111'::uuid 
    END,
    'Executive Haircuts', 
    'Precision haircuts tailored for professionals and corporate executives.', 
    1
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Executive Haircuts');

INSERT INTO public.service_categories (id, name, description, sort_order)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.service_categories WHERE id = '22222222-2222-2222-2222-222222222222') 
        THEN gen_random_uuid() 
        ELSE '22222222-2222-2222-2222-222222222222'::uuid 
    END,
    'Beard & Facial Care', 
    'Hot towel shaves, beard sculpting, and facial therapy.', 
    2
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'Beard & Facial Care');

INSERT INTO public.service_categories (id, name, description, sort_order)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.service_categories WHERE id = '33333333-3333-3333-3333-333333333333') 
        THEN gen_random_uuid() 
        ELSE '33333333-3333-3333-3333-333333333333'::uuid 
    END,
    'VIP Packages', 
    'Complete full-service mobile grooming experiences.', 
    3
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE name = 'VIP Packages');

-- Seed services dynamically resolving category_id from categories by name.
-- Self-repairing: If a seeded service exists with a different/outdated category_id,
-- update ONLY its category_id to the resolved ID, preserving all other fields.
-- Idempotent and strict: If the expected category cannot be resolved, fails clearly with RAISE EXCEPTION.
DO $$
DECLARE
    cat_exec_id UUID;
    cat_beard_id UUID;
    cat_vip_id UUID;
BEGIN
    SELECT id INTO cat_exec_id FROM public.service_categories WHERE name = 'Executive Haircuts' LIMIT 1;
    SELECT id INTO cat_beard_id FROM public.service_categories WHERE name = 'Beard & Facial Care' LIMIT 1;
    SELECT id INTO cat_vip_id FROM public.service_categories WHERE name = 'VIP Packages' LIMIT 1;

    IF cat_exec_id IS NULL THEN
        RAISE EXCEPTION 'Category "Executive Haircuts" not found for service seeding.';
    END IF;
    IF cat_beard_id IS NULL THEN
        RAISE EXCEPTION 'Category "Beard & Facial Care" not found for service seeding.';
    END IF;
    IF cat_vip_id IS NULL THEN
        RAISE EXCEPTION 'Category "VIP Packages" not found for service seeding.';
    END IF;

    -- Seed or self-repair "The Signature Craftsman Cut"
    INSERT INTO public.services (
        id, category_id, title, subtitle, description, duration_minutes, price_kes, category, popular_tag, target_audience, icon_name, sort_order, is_active
    ) VALUES (
        'a0000000-0000-0000-0000-000000000001', cat_exec_id,
        'The Signature Craftsman Cut', 'Precision Cut & Styling',
        'Mobile haircut service delivered to your home or office. Includes scalp massage and hot towel finish.',
        45, 3500.00, 'Executive Haircuts', 'MOST POPULAR', 'Corporate Executives & Professionals', 'Scissors', 1, true
    )
    ON CONFLICT (id) DO UPDATE 
    SET category_id = EXCLUDED.category_id
    WHERE public.services.category_id IS DISTINCT FROM EXCLUDED.category_id;

    -- Seed or self-repair "Royal Beard Sculpt & Hot Towel"
    INSERT INTO public.services (
        id, category_id, title, subtitle, description, duration_minutes, price_kes, category, popular_tag, target_audience, icon_name, sort_order, is_active
    ) VALUES (
        'a0000000-0000-0000-0000-000000000002', cat_beard_id,
        'Royal Beard Sculpt & Hot Towel', 'Beard Grooming & Therapy',
        'Straight-razor edging, beard conditioning oil, organic balm, and relaxing hot towel treatment.',
        30, 2500.00, 'Beard & Facial Care', 'BEST FOR BEARDS', 'Bearded Gentlemen', 'Razor', 2, true
    )
    ON CONFLICT (id) DO UPDATE 
    SET category_id = EXCLUDED.category_id
    WHERE public.services.category_id IS DISTINCT FROM EXCLUDED.category_id;

    -- Seed or self-repair "Presidential VIP Full Grooming"
    INSERT INTO public.services (
        id, category_id, title, subtitle, description, duration_minutes, price_kes, category, popular_tag, target_audience, icon_name, sort_order, is_active
    ) VALUES (
        'a0000000-0000-0000-0000-000000000003', cat_vip_id,
        'Presidential VIP Full Grooming', 'The Ultimate Mobile Package',
        'Signature Cut, Royal Beard Sculpt, Express Facial, and Manicure. Delivered in supreme privacy.',
        90, 7500.00, 'VIP Packages', 'VIP EXPERIENCE', 'Diplomats, C-Suite & VIPs', 'Crown', 3, true
    )
    ON CONFLICT (id) DO UPDATE 
    SET category_id = EXCLUDED.category_id
    WHERE public.services.category_id IS DISTINCT FROM EXCLUDED.category_id;
END $$;

INSERT INTO public.retainer_tiers (id, name, monthly_kes, visits_per_month, perks, recommended_zone, sort_order, is_active) VALUES
('b0000000-0000-0000-0000-000000000001', 'Executive Weekly Retainer', 12000.00, 4, '["4 Haircuts & Beard Edging", "Priority Booking Slots", "Hot Towel Treatment", "Complimentary Grooming Products"]'::jsonb, 'Kilimani / Lavington', 1, true),
('b0000000-0000-0000-0000-000000000002', 'Corporate VIP Retainer', 25000.00, 8, '["8 Haircut / Beard Treatments for Team or Self", "On-Demand Emergency Slots", "Diplomatic & Office Grooming Visits", "Dedicated Mobile Barber Unit"]'::jsonb, 'Westlands / Karen / Gigiri', 2, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.business_settings (key, value, description) VALUES
('operating_hours', '{"monday_friday": "07:00 - 20:00", "saturday_sunday": "08:00 - 18:00"}', 'Standard business operating hours for mobile bookings'),
('contact_info', '{"phone": "+254 700 000 000", "whatsapp": "+254 700 000 000", "email": "concierge@mobilebarbercraftsman.co.ke"}', 'Customer support and concierge contacts'),
('service_zones', '["Kilimani", "Lavington", "Westlands", "Karen", "Gigiri", "Runda", "Muthaiga", "CBD", "Kileleshwa", "Parklands"]', 'Active mobile barber delivery coverage zones in Nairobi')
ON CONFLICT (key) DO NOTHING;
