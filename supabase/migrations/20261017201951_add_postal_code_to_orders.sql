/*
# Add postal code to orders

1. Purpose
- Collect the customer's Algerian postal code alongside the delivery address.

2. Modified Tables
- `orders.postal_code`
  - New nullable text column for the five-digit postal code.
  - It remains nullable in the database so existing orders are preserved without backfilling unknown values.

3. Security
- The existing orders INSERT-only policy remains unchanged.
- Anonymous customers can submit the new value through the existing public order form.

4. Important Notes
- The application requires exactly five digits for new orders.
- Existing orders are not modified or deleted.
*/

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS postal_code text;