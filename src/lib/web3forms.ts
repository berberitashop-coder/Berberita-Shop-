import type { Order } from '@/lib/supabase';

// Web3Forms access keys are designed to be public (client-side); the recipient email is configured on web3forms.com.
const WEB3FORMS_ACCESS_KEY = '33579ed5-c719-460c-8993-bf0606dfe166';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function sendOrderEmail(order: Order, imageFileName?: string): Promise<boolean> {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Nouvelle commande - ${order.full_name}`,
    from_name: 'Berberita Shop',
    'Nom complet': order.full_name,
    Instagram: `@${order.instagram_username}`,
    'Téléphone': order.phone,
    'Wilaya / Ville': order.wilaya_city,
    'Code postal': order.postal_code,
    'Adresse de livraison': order.delivery_address,
    'Lien du produit': order.product_url || '—',
    'Détails du produit': order.product_details || '—',
    'Image du produit': order.product_image_path
      ? `${imageFileName ?? 'image'} (Supabase Storage: product-images/${order.product_image_path})`
      : imageFileName
        ? `${imageFileName} (non enregistrée)`
        : '—',
    botcheck: '',
  };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { success?: boolean };
    return res.ok && json.success === true;
  } catch {
    return false;
  }
}
