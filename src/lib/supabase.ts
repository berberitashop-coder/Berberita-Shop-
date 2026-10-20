import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Order = {
  id?: string;
  full_name: string;
  instagram_username: string;
  phone: string;
  wilaya_city: string;
  postal_code: string;
  delivery_address: string;
  product_url: string | null;
  product_image_path?: string | null;
  product_details: string;
  status?: string;
  created_at?: string;
};
