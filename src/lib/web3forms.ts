import type { Order } from '@/lib/supabase';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function sendOrderEmail(order: Order): Promise<boolean> {
  const payload = { access_key: WEB3FORMS_ACCESS_KEY, subject: `Nouvelle commande - ${order.full_name}`, from_name: 'Berberita Shop', 'Nom complet': order.full_name, Instagram: `@${order.instagram_username}`, 'Téléphone': order.phone, 'Wilaya / Ville': order.wilaya_city, 'Code postal': order.postal_code, 'Adresse de livraison': order.delivery_address, 'Lien du produit': order.product_url || '—', 'Détails du produit': order.product_details || '—' };
  const res = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
  const json = await res.json() as { success?: boolean };
  if (!res.ok || json.success !== true) throw new Error('Web3Forms rejected the request');
  return true;
}
