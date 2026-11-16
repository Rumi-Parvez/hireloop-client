'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Check, 
  Sparkles, 
  Crown, 
  Zap, 
  Flame, 
  Loader2, 
  CheckCircle2,
  Tag
} from 'lucide-react';

type PlanId = 'starter' | 'growth' | 'premium';
type BillingCycle = 'monthly' | 'yearly';

interface PlanDetails {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  icon: React.ElementType;
  badge?: string;
  features: string[];
}

const PLANS: Record<PlanId, PlanDetails> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 0,
    icon: Crown,
    features: [
      'Daily AI match brief (top 5)',
      'Verified salary bands',
      'Company insight dashboards',
      '1-click apply, unlimited',
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 17,
    icon: Zap,
    badge: 'MOST POPULAR',
    features: [
      'Daily AI match brief (top 5)',
      'Verified salary bands',
      'Company insight dashboards',
      '1-click apply, unlimited',
      'Priority AI resume scoring',
    ],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 99,
    icon: Flame,
    features: [
      'Everything in Pro',
      'Multi-profile career portfolios',
      'Shared talent rooms',
      'Recruiter view (read-only)',
    ],
  },
};

function  CheckoutContent () {




  const router = useRouter();


  
  const searchParams = useSearchParams();

  const initialPlan = (searchParams.get('plan')?.toLowerCase() as PlanId) || 'growth';
  const initialBilling = (searchParams.get('billing')?.toLowerCase() as BillingCycle) || 'monthly';

  const [selectedPlan, setSelectedPlan] = useState<PlanId>(PLANS[initialPlan] ? initialPlan : 'growth');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBilling === 'yearly' ? 'yearly' : 'monthly');

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Submission States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentPlan = PLANS[selectedPlan];
  const PlanIcon = currentPlan.icon;

  // Price Calculations (Matching your 25% Yearly discount badge)
  const baseMonthly = currentPlan.monthlyPrice;
  const discountedMonthly = billingCycle === 'yearly' ? Math.round(baseMonthly * 0.75) : baseMonthly;
  const subtotal = billingCycle === 'yearly' ? discountedMonthly * 12 : discountedMonthly;
  const extraDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% extra with HIRELOOP10
  const totalDue = Math.max(0, subtotal - extraDiscount);

  // Card Number Auto-Formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Expiry Date Auto-Formatting (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'HIRELOOP10') {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setPromoError('Invalid promo code. Try "HIRELOOP10"');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing & plan activation
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/job-seeker');
      }, 2200);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-[#111115] border border-indigo-500/40 rounded-3xl text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            {totalDue === 0 ? 'Starter Plan Activated!' : 'Payment Successful!'}
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Welcome to <span className="text-white font-semibold">HireLoop {currentPlan.name}</span>. Your AI insights hub and career tools are now unlocked. Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-6">
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Pricing
          </Link>

          <Link href="/" className="text-xl font-bold font-serif tracking-wide text-white">
            hire<span className="text-indigo-500">loop</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>

        {/* Main 2-Column Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Plan Configuration & Billing Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Switch Plan & Billing Cycle */}
            <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-base font-bold text-white font-serif">1. Select Plan & Billing</h2>

                {/* Monthly / Yearly Toggle */}
                <div className="inline-flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-full">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      billingCycle === 'monthly' ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      billingCycle === 'yearly' ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Yearly
                    <span className="px-1.5 py-0.5 bg-pink-600 text-white rounded-full text-[9px] font-bold">
                      25%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plan Switcher Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(PLANS) as PlanId[]).map((planKey) => {
                  const item = PLANS[planKey];
                  const isSelected = selectedPlan === planKey;
                  const price = billingCycle === 'yearly' ? Math.round(item.monthlyPrice * 0.75) : item.monthlyPrice;
                  return (
                    <button
                      key={planKey}
                      type="button"
                      onClick={() => setSelectedPlan(planKey)}
                      className={`p-4 rounded-2xl border text-left transition-all relative ${
                        isSelected 
                          ? 'bg-[#171722] border-indigo-500 shadow-lg shadow-indigo-500/10' 
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded-full uppercase">
                          Popular
                        </span>
                      )}
                      <p className="text-xs font-semibold text-neutral-300">{item.name}</p>
                      <p className="text-xl font-extrabold text-white mt-1">
                        ${price}<span className="text-[10px] font-normal text-neutral-500">/mo</span>
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>



             <form action="/api/checkout_sessions" method="POST">
                 <section>
                <button
                type="submit" role="link"
                disabled={isProcessing}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm rounded-xl transition shadow-xl shadow-white/10 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
               
          {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : totalDue === 0 ? (
                  <>Activate Starter Plan Free <Sparkles className="w-4 h-4" /></>
                ) : (
                  <>Complete Payment • ${totalDue}</>
                )}
        </button>
      </section>
                
              
             </form>
           
          </div>

          {/* Right Column: Order Summary Card (5 cols) */}
          <div className="lg:col-span-5 p-8 bg-[#111115] border-2 border-indigo-500/40 rounded-3xl space-y-6 shadow-2xl sticky top-8">
            <div className="flex items-center justify-between pb-5 border-b border-neutral-900">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 text-indigo-400">
                  <PlanIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
                    {billingCycle} Plan
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif">{currentPlan.name}</h3>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-white">
                  ${discountedMonthly}<span className="text-xs font-normal text-neutral-400">/mo</span>
                </div>
                {billingCycle === 'yearly' && baseMonthly > 0 && (
                  <span className="text-[11px] text-emerald-400 font-medium">Saved 25%</span>
                )}
              </div>
            </div>

            {/* Included Features */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                What&apos;s included:
              </p>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                {currentPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo Code Input (Only for paid plans) */}
            {baseMonthly > 0 && (
              <div className="pt-4 border-t border-neutral-900 space-y-2">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (HIRELOOP10)"
                      className="bg-transparent border-none outline-none text-xs text-white placeholder-neutral-600 w-full uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-white rounded-xl transition"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
                {promoApplied && <p className="text-[11px] text-emerald-400">10% promo discount applied!</p>}
              </div>
            )}

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-neutral-900 space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>
                  {currentPlan.name} ({billingCycle === 'yearly' ? '12 months billed annually' : 'Billed monthly'})
                </span>
                <span className="text-white font-medium">${subtotal}.00</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount (10%)</span>
                  <span>-${extraDiscount}.00</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Estimated Tax</span>
                <span className="text-white font-medium">$0.00</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-neutral-900 text-base font-bold text-white">
                <span>Total Due Today</span>
                <span className="text-2xl font-extrabold text-indigo-400">${totalDue}.00</span>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="p-3.5 bg-neutral-950/80 border border-neutral-900 rounded-2xl flex items-center gap-3 text-[11px] text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Cancel anytime in 1-click from your Billing dashboard. No hidden fees.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}