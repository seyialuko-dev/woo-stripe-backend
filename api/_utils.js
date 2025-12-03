import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export function requireAuth(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.API_KEY}`) {
    res.status(401).json({ error: 'unauthorized' });
    return false;
  }
  return true;
}

export async function wooFetch(path, options = {}) {
  const url = `${process.env.WOO_BASE_URL}${path}${path.includes('?') ? '&' : '?'
    }consumer_key=${process.env.WOO_CONSUMER_KEY}&consumer_secret=${process.env.WOO_CONSUMER_SECRET}`;

  const resp = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Woo error ${resp.status}: ${text}`);
  }

  return resp.json();
}
