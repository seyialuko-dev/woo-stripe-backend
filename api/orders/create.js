import { requireAuth, wooFetch } from '../_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log("Invalid method:", req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  // Log environment variables
  console.log("WOO_BASE_URL:", process.env.WOO_BASE_URL);
  console.log("WOO_CONSUMER_KEY:", process.env.WOO_CONSUMER_KEY ? "SET" : "MISSING");
  console.log("WOO_CONSUMER_SECRET:", process.env.WOO_CONSUMER_SECRET ? "SET" : "MISSING");

  try {
    const { billing, shipping, line_items } = req.body;

    console.log("Request body:", JSON.stringify(req.body, null, 2));

    if (!billing || !shipping || !line_items) {
      console.error("Missing required fields in request body");
      return res.status(400).json({ error: "Missing billing, shipping, or line_items" });
    }

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

    console.log("Woo order response:", order);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      total_amount: Math.round(parseFloat(order.total) * 100)
    });

  } catch (e) {
    console.error("Error in /orders/create:", e);
    res.status(500).json({ error: e.message });
  }
}
