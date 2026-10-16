import { assertEquals, assertExists } from "@std/assert";
import { PGlite } from "@electric-sql/pglite";

// Helper to set up Supabase mock auth and roles in PostgreSQL
async function createSupabaseMockDb(): Promise<PGlite> {
  const db = new PGlite();

  // Create standard Supabase roles and auth schema
  await db.exec(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        CREATE ROLE anon;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        CREATE ROLE authenticated;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
        CREATE ROLE service_role;
      END IF;
    END $$;

    CREATE SCHEMA IF NOT EXISTS auth;

    CREATE TABLE IF NOT EXISTS auth.users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE,
      raw_user_meta_data JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE OR REPLACE FUNCTION auth.uid() RETURNS UUID AS $$
      SELECT NULL::UUID;
    $$ LANGUAGE sql STABLE;

    CREATE OR REPLACE FUNCTION auth.role() RETURNS TEXT AS $$
      SELECT COALESCE(current_setting('request.jwt.claim.role', true), 'anon');
    $$ LANGUAGE sql STABLE;
  `);

  return db;
}

const migrationSql = await Deno.readTextFile(
  new URL("../src/infrastructure/database/supabase_migration.sql", import.meta.url)
);

Deno.test("Migration - runs cleanly on fresh database", async () => {
  const db = await createSupabaseMockDb();
  await db.exec(migrationSql);

  // Verify core tables exist
  const tables = await db.query<{ table_name: string }>(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);
  const tableNames = tables.rows.map((r: { table_name: string }) => r.table_name);
  assertEquals(tableNames.includes("bookings"), true);
  assertEquals(tableNames.includes("services"), true);
  assertEquals(tableNames.includes("service_categories"), true);
  assertEquals(tableNames.includes("user_profiles"), true);
  assertEquals(tableNames.includes("retainer_tiers"), true);
  assertEquals(tableNames.includes("business_settings"), true);
});

Deno.test("Migration - is fully idempotent when re-run a second time", async () => {
  const db = await createSupabaseMockDb();
  // First run
  await db.exec(migrationSql);
  // Second run (must not throw errors or create duplicate objects)
  await db.exec(migrationSql);

  // Verify row counts unchanged
  const services = await db.query<{ count: number | string }>("SELECT COUNT(*) as count FROM public.services;");
  assertEquals(Number(services.rows[0].count), 3);

  const categories = await db.query<{ count: number | string }>("SELECT COUNT(*) as count FROM public.service_categories;");
  assertEquals(Number(categories.rows[0].count), 3);
});

Deno.test("Migration - category resolution with pre-existing category under different UUID", async () => {
  const db = await createSupabaseMockDb();
  
  // Pre-seed an existing schema where 'Executive Haircuts' has a non-standard UUID
  const customUuid = "99999999-9999-9999-9999-999999999999";
  await db.exec(`
    CREATE TABLE IF NOT EXISTS public.service_categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      sort_order INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
    INSERT INTO public.service_categories (id, name, description, sort_order)
    VALUES ('${customUuid}', 'Executive Haircuts', 'Pre-existing custom category', 1);
  `);

  // Run migration
  await db.exec(migrationSql);

  // Service should link to the existing category UUID, not fail FK
  const service = await db.query<{ category_id: string }>(`
    SELECT category_id FROM public.services 
    WHERE id = 'a0000000-0000-0000-0000-000000000001';
  `);
  assertEquals(service.rows[0].category_id, customUuid);
});

Deno.test("Migration - category preferred UUID occupied by different category name", async () => {
  const db = await createSupabaseMockDb();

  // Preferred UUID '11111111-1111-1111-1111-111111111111' is taken by 'Classic Vintage Shaves'
  await db.exec(`
    CREATE TABLE IF NOT EXISTS public.service_categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      sort_order INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
    INSERT INTO public.service_categories (id, name, description, sort_order)
    VALUES ('11111111-1111-1111-1111-111111111111', 'Classic Vintage Shaves', 'Legacy Shaving', 10);
  `);

  // Run migration
  await db.exec(migrationSql);

  // 'Executive Haircuts' should be created with a generated UUID, and service should link to it
  const execCat = await db.query<{ id: string }>(`
    SELECT id FROM public.service_categories WHERE name = 'Executive Haircuts';
  `);
  assertExists(execCat.rows[0]?.id);

  const service = await db.query<{ category_id: string }>(`
    SELECT category_id FROM public.services 
    WHERE id = 'a0000000-0000-0000-0000-000000000001';
  `);
  assertEquals(service.rows[0].category_id, execCat.rows[0].id);
});

Deno.test("Migration - self-repairs service category_id while preserving user customizations", async () => {
  const db = await createSupabaseMockDb();
  await db.exec(migrationSql);

  // Simulate an admin modifying the price/description of service 1, but having an outdated category_id
  const dummyCat = "88888888-8888-8888-8888-888888888888";
  await db.exec(`
    INSERT INTO public.service_categories (id, name, description, sort_order)
    VALUES ('${dummyCat}', 'Old Category', 'Temporary', 99);

    UPDATE public.services 
    SET category_id = '${dummyCat}',
        price_kes = 4200.00,
        description = 'Customized admin description'
    WHERE id = 'a0000000-0000-0000-0000-000000000001';
  `);

  // Re-run migration
  await db.exec(migrationSql);

  // Check that category_id was self-repaired to Executive Haircuts, while price & description were preserved
  const service = await db.query<{ category_id: string; price_kes: string; description: string }>(`
    SELECT category_id, price_kes, description FROM public.services 
    WHERE id = 'a0000000-0000-0000-0000-000000000001';
  `);
  const execCat = await db.query<{ id: string }>(`
    SELECT id FROM public.service_categories WHERE name = 'Executive Haircuts';
  `);
  assertEquals(service.rows[0].category_id, execCat.rows[0].id);
  assertEquals(service.rows[0].price_kes, "4200.00");
  assertEquals(service.rows[0].description, "Customized admin description");
});

Deno.test("Migration - cleans up bookings.service_id FK pointing to a different table", async () => {
  const db = await createSupabaseMockDb();
  await db.exec(migrationSql);

  // Inject a foreign key where bookings.service_id points to public.service_categories(id)
  await db.exec(`
    ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_service_id_fkey;
    ALTER TABLE public.bookings 
      ADD CONSTRAINT bookings_service_id_wrong_target_fk 
      FOREIGN KEY (service_id) REFERENCES public.service_categories(id) ON DELETE SET NULL;
  `);

  // Run migration to repair schema
  await db.exec(migrationSql);

  // Verify that the wrong target constraint was dropped and replaced by public.services(id)
  const constraints = await db.query<{ conname: string; confdeltype: string; target_table: string }>(`
    SELECT 
      c.conname,
      c.confdeltype,
      rel_target.relname AS target_table
    FROM pg_constraint c
    JOIN pg_class rel_source ON c.conrelid = rel_source.oid
    JOIN pg_class rel_target ON c.confrelid = rel_target.oid
    JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attname = 'service_id'
    WHERE rel_source.relname = 'bookings'
      AND c.contype = 'f'
      AND a.attnum = ANY(c.conkey);
  `);

  assertEquals(constraints.rows.length, 1);
  assertEquals(constraints.rows[0].target_table, "services");
  assertEquals(constraints.rows[0].confdeltype, "n");
});

Deno.test("Migration - cleans up composite FK that includes service_id", async () => {
  const db = await createSupabaseMockDb();
  await db.exec(migrationSql);

  // Create a composite target table and attach a composite FK on bookings(service_id, id)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS public.dummy_composite_target (
      service_id UUID,
      booking_id UUID,
      PRIMARY KEY (service_id, booking_id)
    );

    ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_service_id_fkey;
    ALTER TABLE public.bookings 
      ADD CONSTRAINT bookings_composite_fk 
      FOREIGN KEY (service_id, id) REFERENCES public.dummy_composite_target(service_id, booking_id) ON DELETE SET NULL;
  `);

  // Run migration to repair schema
  await db.exec(migrationSql);

  // Verify that the composite FK was dropped and the single-column FK to services(id) was established
  const constraints = await db.query<{ conname: string; confdeltype: string; target_table: string; key_count: number }>(`
    SELECT 
      c.conname,
      c.confdeltype,
      rel_target.relname AS target_table,
      array_length(c.conkey, 1) AS key_count
    FROM pg_constraint c
    JOIN pg_class rel_source ON c.conrelid = rel_source.oid
    JOIN pg_class rel_target ON c.confrelid = rel_target.oid
    JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attname = 'service_id'
    WHERE rel_source.relname = 'bookings'
      AND c.contype = 'f'
      AND a.attnum = ANY(c.conkey);
  `);

  assertEquals(constraints.rows.length, 1);
  assertEquals(constraints.rows[0].target_table, "services");
  assertEquals(constraints.rows[0].confdeltype, "n");
  assertEquals(Number(constraints.rows[0].key_count), 1);
});

Deno.test("Migration - cleans up wrong-action and duplicate FKs on bookings.service_id", async () => {
  const db = await createSupabaseMockDb();
  // Run once to create basic schema
  await db.exec(migrationSql);

  // Inject messy foreign keys on bookings.service_id:
  // 1. Wrong delete rule: CASCADE
  // 2. Duplicate FK constraint
  await db.exec(`
    ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_service_id_fkey;
    
    -- Constraint with CASCADE instead of SET NULL
    ALTER TABLE public.bookings 
      ADD CONSTRAINT bookings_service_id_cascade_fk 
      FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

    -- Duplicate constraint
    ALTER TABLE public.bookings 
      ADD CONSTRAINT bookings_service_id_dup_fk 
      FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE SET NULL;
  `);

  // Re-run migration
  await db.exec(migrationSql);

  // Inspect FK constraints on bookings.service_id using PostgreSQL catalogs
  const constraints = await db.query<{ conname: string; confdeltype: string; target_table: string }>(`
    SELECT 
      c.conname,
      c.confdeltype,
      rel_target.relname AS target_table
    FROM pg_constraint c
    JOIN pg_class rel_source ON c.conrelid = rel_source.oid
    JOIN pg_class rel_target ON c.confrelid = rel_target.oid
    JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attname = 'service_id'
    WHERE rel_source.relname = 'bookings'
      AND c.contype = 'f'
      AND a.attnum = ANY(c.conkey);
  `);

  // Exactly ONE constraint should remain: pointing to services with confdeltype = 'n' (SET NULL)
  assertEquals(constraints.rows.length, 1);
  assertEquals(constraints.rows[0].target_table, "services");
  assertEquals(constraints.rows[0].confdeltype, "n");
});

Deno.test("Migration - column privilege security: only full_name and phone updateable by authenticated", async () => {
  const db = await createSupabaseMockDb();
  await db.exec(migrationSql);

  // Check column privileges on user_profiles for authenticated
  const colPrivs = await db.query<{ column_name: string; privilege_type: string }>(`
    SELECT column_name, privilege_type
    FROM information_schema.column_privileges
    WHERE table_schema = 'public' 
      AND table_name = 'user_profiles'
      AND grantee = 'authenticated'
    ORDER BY column_name, privilege_type;
  `);

  const privSummary = colPrivs.rows.map(
    (r: { column_name: string; privilege_type: string }) => `${r.column_name}:${r.privilege_type}`
  );
  assertEquals(privSummary.includes("full_name:UPDATE"), true);
  assertEquals(privSummary.includes("phone:UPDATE"), true);
  assertEquals(privSummary.includes("role:UPDATE"), false);
  assertEquals(privSummary.includes("id:UPDATE"), false);
  assertEquals(privSummary.includes("email:UPDATE"), false);

  // Check table privileges on services and bookings
  const tablePrivs = await db.query<{ table_name: string; privilege_type: string; grantee: string }>(`
    SELECT table_name, privilege_type, grantee
    FROM information_schema.table_privileges
    WHERE table_schema = 'public'
      AND table_name IN ('services', 'bookings', 'business_settings', 'retainer_tiers', 'service_categories')
      AND grantee IN ('anon', 'authenticated')
      AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE');
  `);
  // All write privileges must be 0 for anon and authenticated
  assertEquals(tablePrivs.rows.length, 0);
});
