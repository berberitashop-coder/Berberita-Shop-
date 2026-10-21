/*
# Add product image uploads to orders

1. Purpose
- Let customers identify a product with either a product link or a screenshot.
- Store uploaded product images in a private Supabase Storage bucket.

2. Modified Tables
- `orders.product_url`
  - Becomes nullable because a screenshot can be used instead of a link.
- `orders.product_image_path`
  - New nullable text column containing the private Storage object path.

3. Storage
- Create the private `product-images` bucket if it does not already exist.
- Limit uploads to 5 MB and common image formats only.
- Allow anonymous visitors to upload images but not read, update, or delete stored objects.

4. Security
- Keep the existing orders INSERT-only policy unchanged.
- Add an INSERT-only Storage policy restricted to the `product-images` bucket.
- No public read policy is added; uploaded images remain private and visible to the site owner through Supabase.

5. Important Notes
- Existing order rows are preserved.
- Existing product links remain unchanged.
- The application must provide either a valid link or an uploaded image before creating a new order.
*/

ALTER TABLE orders
  ALTER COLUMN product_url DROP NOT NULL;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS product_image_path text;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[];

DROP POLICY IF EXISTS "anon_insert_product_images" ON storage.objects;
CREATE POLICY "anon_insert_product_images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND (storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
);

DROP POLICY IF EXISTS "anon_select_product_images" ON storage.objects;
DROP POLICY IF EXISTS "anon_update_product_images" ON storage.objects;
DROP POLICY IF EXISTS "anon_delete_product_images" ON storage.objects;