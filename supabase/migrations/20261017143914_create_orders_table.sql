/*
# Create orders table (single-tenant, no auth)

This app is a landing page where customers submit custom product orders
(products from AliExpress etc.) to an intermediary who places the order
on their behalf. There is no sign-in/account system — anyone visiting the
page can submit an order. Data is intentionally public/shared (all orders
visible to the site owner via the Supabase dashboard).

1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — customer's full name
  - `instagram_username` (text, not null) — contact handle for confirmation
  - `phone` (text, not null) — phone number
  - `wilaya_city` (text, not null) — wilaya / city
  - `delivery_address` (text, not null) — full delivery address
  - `product_url` (text, not null) — link to the product (AliExpress etc.)
  - `product_details` (text) — color, size, quantity, etc.
  - `status` (text, default 'pending') — order status
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `orders`.
- Allow anon + authenticated INSERT only (anyone can submit an order).
- No SELECT/UPDATE/DELETE for anon — order data is managed by the site
  owner through the Supabase dashboard (authenticated/service role).
3. Notes
- No user_id column — no auth system in this app.
- Only INSERT is exposed publicly to prevent reading or tampering with
  other people's orders.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  instagram_username text NOT NULL,
  phone text NOT NULL,
  wilaya_city text NOT NULL,
  delivery_address text NOT NULL,
  product_url text NOT NULL,
  product_details text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders"
ON orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);
