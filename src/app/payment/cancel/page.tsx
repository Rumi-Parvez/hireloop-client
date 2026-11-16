import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0c] px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111115] p-8 text-center">
        <h1 className="text-3xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-neutral-400">
          Your payment was cancelled.
        </p>

        <Link
          href="/premium"
          className="mt-6 inline-block rounded-xl border border-neutral-700 px-6 py-3 font-medium transition hover:bg-neutral-900"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}