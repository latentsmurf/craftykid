#!/bin/bash

echo "🔧 Setting up Stripe environment variables..."

# Add Stripe environment variables to .env.local
cat >> .env.local << EOL

# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_51234567890abcdef...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
EOL

echo "✅ Stripe environment variables added to .env.local"
echo ""
echo "📝 Next steps:"
echo "1. Sign up at https://stripe.com"
echo "2. Get your test API keys from Developers > API keys"
echo "3. Replace the placeholder values in .env.local"
echo "4. Set up webhooks at Developers > Webhooks"
echo "5. Add webhook endpoint: http://localhost:3000/api/webhooks/stripe"
echo "6. Select events: payment_intent.succeeded, payment_intent.payment_failed, payment_intent.canceled"
echo ""
echo "📖 See STRIPE_SETUP.md for detailed instructions"
