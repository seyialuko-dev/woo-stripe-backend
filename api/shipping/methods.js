import { requireAuth, wooFetch } from '../_utils';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!requireAuth(req, res)) return;

  try {
    const methods = await wooFetch('/shipping_methods');
    res.status(200).json(methods);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}