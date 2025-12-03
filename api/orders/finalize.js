import { requireAuth, wooFetch } from '../_utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!requireAuth(req, res)) return;

  try {
    const { order_id } = req.body;

    const updated = await wooFetch(`/orders/${order_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: 'processing',
        set_paid: true
      }),
    });

    res.status(200).json({
      id: updated.id,
      status: updated.status
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}