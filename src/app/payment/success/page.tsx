import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "../../../lib/auth";
import { stripe } from "../../../lib/stripe";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }

  // =========================
  // 1. Get current user
  // =========================

  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authSession?.user) {
    redirect("/sign-in");
  }

  const user = authSession.user;

  // =========================
  // 2. Get Stripe session
  // =========================

  const session =
    await stripe.checkout.sessions.retrieve(
      session_id,
      {
        expand: [
          "line_items",
          "payment_intent",
        ],
      }
    );

  // =========================
  // 3. Security check
  // =========================

  const stripeUserId =
    session.metadata?.userId;

  if (
    stripeUserId &&
    stripeUserId !== user.id
  ) {
    redirect("/");
  }

  // =========================
  // 4. Payment information
  // =========================

  const customerEmail =
    session.customer_details?.email ??
    user.email;

  const paymentStatus =
    session.payment_status;

  const checkoutStatus =
    session.status;

  const amount =
    session.amount_total ?? 0;

  const currency =
    session.currency ?? "usd";

  const planName =
    session.metadata?.planName ??
    "Premium";

  const planMode =
    session.metadata?.planMode ??
    "one-time";

  const paymentIntent =
    typeof session.payment_intent === "object"
      ? session.payment_intent
      : null;

  // =========================
  // 5. Payment data
  // =========================

  const paymentData = {
    status: paymentStatus,
    checkoutStatus,

    sessionId: session.id,

    paymentIntentId:
      paymentIntent?.id ?? null,

    amount,

    currency,

    planName,

    planMode,

    customerEmail,

    paidAt:
      paymentStatus === "paid"
        ? new Date()
        : null,
  };

  // =========================
  // 6. Payment report
  // =========================
const premiumUser = {
  id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          payment: paymentData,

}
  console.log(
    "========== PAYMENT =========="
  );

  console.log(premiumUser);

  console.log(
    "=============================="
  );

  // =========================
  // 7. Show success page
  // =========================
// Save premium user after Stripe verification

if (
  checkoutStatus === "complete" &&
  paymentStatus === "paid"
) {
  const response = await fetch(
    `${process.env.SERVER_URL}/user/premium`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: session.id,
      }),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Premium Save Error:", result);
  } else {
    console.log("Premium Saved Successfully:", result);
  }
}



const serverUrl = process.env.SERVER_URL;


if (!serverUrl) {
  throw new Error("SERVER_URL is not configured");
}

const response = await fetch(`${serverUrl}/user/premium`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sessionId: session_id,
  }),
  cache: "no-store",
});

const result = await response.json();

if (!response.ok) {
  throw new Error(
    result.message || "Failed to upgrade Premium account"
  );
}

console.log("Premium Update:", result);


  if (
    checkoutStatus === "open"
  ) {
    redirect("/");
  }

  if (
    checkoutStatus === "complete" &&
    paymentStatus === "paid"
  ) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8">

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl text-black">
            ✓
          </div>

          <p className="text-sm font-medium uppercase tracking-widest text-green-400">
            Payment Successful
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Welcome, {user.name || "User"}!
          </h1>

          <p className="mt-3 text-gray-400">
            Your payment has been successfully
            completed.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Customer
              </p>

              <p className="mt-2 break-all font-medium">
                {user.email}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Plan
              </p>

              <p className="mt-2 font-medium">
                {planName}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Amount
              </p>

              <p className="mt-2 font-medium text-green-400">
                {(amount / 100).toFixed(2)}{" "}
                {currency.toUpperCase()}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Payment Status
              </p>

              <p className="mt-2 font-medium text-green-400">
                Paid
              </p>
            </div>

          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">

            <p className="text-xs text-gray-500">
              Stripe Session ID
            </p>

            <p className="mt-2 break-all font-mono text-xs text-gray-400">
              {session.id}
            </p>

          </div>

          <div className="mt-8 flex gap-3">

            <a
              href="/dashboard"
              className="rounded-lg bg-white px-5 py-3 font-semibold text-black"
            >
              Go to Dashboard
            </a>

            <Link
              href="/"
              className="rounded-lg border border-white/10 px-5 py-3 text-gray-300"
            >
              Home
            </Link>

          </div>

        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-8">

        <h1 className="text-2xl font-bold">
          Payment Not Confirmed
        </h1>

        <p className="mt-3 text-gray-400">
          Current payment status:
          {" "}
          {paymentStatus}
        </p>

      </section>
    </main>
  );
}