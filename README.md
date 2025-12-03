# WooCommerce + Stripe Payments Backend (Vercel Serverless)

A minimal backend for mobile apps using WooCommerce + WooCommerce Payments (Stripe).

## Endpoints
- POST /api/orders/create
- POST /api/orders/finalize
- POST /api/payments/create-intent
- POST /api/payments/confirm
- GET /api/shipping/methods

## Environment Variables
- API_KEY
- WOO_BASE_URL
- WOO_CONSUMER_KEY
- WOO_CONSUMER_SECRET
- STRIPE_SECRET_KEY
