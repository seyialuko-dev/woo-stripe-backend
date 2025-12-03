import { requireAuth, stripe } from '../_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!requireAuth(req, res)) return;

  try {
    const { order_id, amount, currency } = req.body;

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { order_id: `${order_id}` }
    });

    res.status(200).json({
      intent_id: intent.id,
      client_secret: intent.client_secret
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}