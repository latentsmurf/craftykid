# Stripe Integration Setup

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# Stripe Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Getting Stripe Keys

1. **Sign up for Stripe**: Go to https://stripe.com and create an account
2. **Get API Keys**: 
   - Go to Developers > API keys
   - Copy the "Publishable key" and "Secret key" from test mode
3. **Set up Webhooks**:
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`
   - Copy the webhook signing secret

## Test Cards

Use these test card numbers in development:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Any future expiry date, any CVC, and any postal code.

## Webhook Testing

For local development, use Stripe CLI:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook signing secret from the CLI output

## Production Setup

1. Switch to live mode in Stripe dashboard
2. Update environment variables with live keys
3. Update webhook endpoint to production URL
4. Test with real payment methods

## Features Implemented

✅ Payment Intent creation
✅ Secure payment processing with Stripe Elements
✅ Webhook handling for payment confirmations
✅ Booking status updates
✅ Receipt generation
✅ Error handling and validation
✅ Mobile-responsive payment forms

## Security Notes

- Never expose secret keys in client-side code
- Always validate webhooks with signing secrets
- Use HTTPS in production
- Implement proper error handling
- Log payment events for debugging
