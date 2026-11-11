'use client';

import { useState } from 'react';
import { Crown, Zap, Flame, Check, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative bg-[#0a0a0c] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 overflow-hidden">
      
      {/* Header Info */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] tracking-widest text-indigo-400 font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          PRICING
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
          Pay for the leverage,<br />
          not the listings
        </h2>
      </div>

      {/* Monthly / Yearly Toggle */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-full shadow-lg">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${
              !isYearly ? 'bg-white text-neutral-950 shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
              isYearly ? 'bg-white text-neutral-950 shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="px-2 py-0.5 bg-pink-600 text-white rounded-full text-[10px] tracking-wide animate-pulse">
              25%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* Starter Plan ($0) */}
        <div className="p-8 bg-[#111115] border border-neutral-800/80 rounded-3xl flex flex-col justify-between transition-all hover:border-neutral-700 shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-400">
                  <Crown className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Starter</h3>
              </div>
              <div className="text-3xl font-extrabold text-white">
                $0<span className="text-xs font-normal text-neutral-400">/month</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Start building your insights hub:
            </p>

            <ul className="space-y-3.5 mb-8 text-sm text-neutral-300">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                Daily AI match brief (top 5)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                Verified salary bands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                Company insight dashboards
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                1-click apply, unlimited
              </li>
            </ul>
          </div>

          <button className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 group">
            Choose This Plan
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Growth Plan ($17) - Highlighted */}
        <div className="p-8 bg-[#14141a] border-2 border-indigo-500/60 rounded-3xl flex flex-col justify-between transition-all shadow-2xl relative">
          
          {/* Popular Badge / Glow */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-indigo-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Growth</h3>
              </div>
              <div className="text-3xl font-extrabold text-white">
                ${isYearly ? '12' : '17'}<span className="text-xs font-normal text-neutral-400">/month</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Start building your insights hub:
            </p>

            <ul className="space-y-3.5 mb-8 text-sm text-neutral-300">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                Daily AI match brief (top 5)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                Verified salary bands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                Company insight dashboards
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-xs text-indigo-400 font-bold">+</span>
                1-click apply, unlimited
              </li>
            </ul>
          </div>

          <button className="w-full py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 group">
            Choose This Plan
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Premium Plan ($99) */}
        <div className="p-8 bg-[#111115] border border-neutral-800/80 rounded-3xl flex flex-col justify-between transition-all hover:border-neutral-700 shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-pink-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Premium</h3>
              </div>
              <div className="text-3xl font-extrabold text-white">
                ${isYearly ? '74' : '99'}<span className="text-xs font-normal text-neutral-400">/month</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Start building your insights hub:
            </p>

            <ul className="space-y-3.5 mb-8 text-sm text-neutral-300">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-pink-400 font-bold">+</span>
                Everything in Pro
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-pink-400 font-bold">+</span>
                Multi-profile career portfolios
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-pink-400 font-bold">+</span>
                Shared talent rooms
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-pink-400 font-bold">+</span>
                Recruiter view (read-only)
              </li>
            </ul>
          </div>

          <button className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 group">
            Choose This Plan
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
}