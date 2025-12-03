import { requireAuth, stripe } from '../_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!requireAuth(req, res)) return;

  try {
    const { order_id, payment_intent_id, payment_method_id } = req.body;

    const intent = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: payment_method_id,
      metadata: { order_id: `${order_id}` }
    });

    res.status(200).json({
      status: intent.status,
      intent_id: intent.id
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}