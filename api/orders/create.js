import { requireAuth, wooFetch } from '../_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!requireAuth(req, res)) return;

  try {
    const { billing, shipping, line_items } = req.body;

    const order = await wooFetch('/orders', {
      method: 'POST',
      body: JSON.stringify({
        payment_method: 'wcpay',
        payment_method_title: 'WooCommerce Payments',
        set_paid: false,
        billing,
        shipping,
        line_items
      }),
    });

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      total_amount: Math.round(parseFloat(order.total) * 100)
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}