import PayButton from "../payment/PaymentButton";


export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-neutral-800 bg-[#111115] p-8">
        <h1 className="text-3xl font-bold">
          HireLoop Premium
        </h1>

        <p className="mt-3 text-neutral-400">
          Unlock premium features
          on HireLoop.
        </p>

        <div className="mt-6">
        <PayButton></PayButton>
</div>
      </div>
    </main>
  );
}