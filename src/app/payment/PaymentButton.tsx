"use client";

import { useState } from "react";

export default function PayButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/checkout_sessions",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to create checkout session"
        );
      }

      console.log("Stripe Session ID:", data.sessionId);
      console.log("Stripe Checkout URL:", data.url);

      // Redirect user to Stripe hosted Checkout
      window.location.href = data.url;

    } catch (error) {
      console.error("Payment Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong with payment";

      alert(message);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Opening Checkout..." : "Pay Now"}
    </button>
  );
}