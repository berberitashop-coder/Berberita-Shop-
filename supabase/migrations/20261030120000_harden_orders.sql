-- Security hardening for anonymous order submissions.
DROP POLICY IF EXISTS "anon_insert_orders" ON public.orders;
CREATE POLICY "anon_insert_pending_orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_postal_code_format;
ALTER TABLE public.orders ADD CONSTRAINT orders_postal_code_format CHECK (postal_code ~ '^\\d{5}$');
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_text_lengths;
ALTER TABLE public.orders ADD CONSTRAINT orders_text_lengths CHECK (char_length(full_name) <= 120 AND char_length(instagram_username) <= 100 AND char_length(phone) <= 20 AND char_length(wilaya_city) <= 120 AND char_length(delivery_address) <= 300 AND char_length(product_url) <= 500 AND char_length(product_details) <= 1000);
DROP POLICY IF EXISTS "anon_insert_product_images" ON storage.objects;
