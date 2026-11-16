import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { auth } from '../../../lib/auth'
import { stripe } from '../../../lib/stripe'

export async function POST() {
  try {
    // 1. Get request headers
    const headersList = await headers()
    const origin = headersList.get('origin')

    // 2. Get currently logged-in user from Better Auth
    const session = await auth.api.getSession({
      headers: headersList,
    })

    // 3. Check authentication
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Please login before making a payment' },
        { status: 401 }
      )
    }

    // 4. Get user information
    const user = session.user

    // 5. Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1UcQhQCAhRe74wQWEYPpplIq',
          quantity: 1,
        },
      ],

      mode: 'payment',

      // 6. Save user information in Stripe metadata
      metadata: {
        userId: user.id,
        userName: user.name || '',
        userEmail: user.email,
        planName: 'Premium',
        planMode: 'one-time',
      },

      managed_payments: {
        enabled: false,
      },

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      integration_identifier: 'hireloop_web_0001',
    })

    // 7. Redirect user to Stripe Checkout
    return NextResponse.redirect(checkoutSession.url, 303)

  } catch (err) {
    console.error('Stripe Checkout Error:', err)

    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payment failed' },
      { status: err?.statusCode || 500 }
    )
  }
}
