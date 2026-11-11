'use client';

import React from 'react';
import { Users, Building2, Briefcase, DollarSign, ArrowUpRight, Download, Calendar } from 'lucide-react';

import DashboardCard from '@/components/dashboard/DashboardCard';

interface Transaction {
  id: string;
  email: string;
  company: string;
  plan: string;
  txId: string;
  amount: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
}

const transactions: Transaction[] = [
  {
    id: '1',
    email: 'marcus.k@techcorp.io',
    company: 'TechCorp Inc.',
    plan: 'Enterprise Monthly',
    txId: '#TXN-982341',
    amount: '$1,299.00',
    date: 'Oct 24, 2023, 14:20',
    status: 'Success',
  },
  {
    id: '2',
    email: 'sarah.l@creativestudio.com',
    company: 'Creative Studio',
    plan: 'Professional Annual',
    txId: '#TXN-882103',
    amount: '$499.00',
    date: 'Oct 24, 2023, 11:05',
    status: 'Success',
  },
  {
    id: '3',
    email: 'j.doe@freelance.org',
    company: 'Independent',
    plan: 'Starter Monthly',
    txId: '#TXN-774129',
    amount: '$49.00',
    date: 'Oct 23, 2023, 16:45',
    status: 'Pending',
  },
  {
    id: '4',
    email: 'admin@retailglobal.net',
    company: 'Retail Global',
    plan: 'Enterprise Monthly',
    txId: '#TXN-552014',
    amount: '$1,299.00',
    date: 'Oct 23, 2023, 09:12',
    status: 'Failed',
  },
];

export default function AdminDashboardPage() {
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Success
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1.5 text-rose-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Dashboard Overview</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Real-time platform performance and growth metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300">
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>Last 30 Days</span>
          </div>

          <button className="px-4 py-2 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl transition shadow-md flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Top 5 Stat Cards Grid matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        
        {/* Total Users */}
        <div className="p-5 bg-[#111115] border border-neutral-800/80 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900">
              +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-neutral-400">Total Users</p>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">124,892</h3>
          </div>
        </div>

        {/* Total Recruiters */}
        <div className="p-5 bg-[#111115] border border-neutral-800/80 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900">
              +8%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-neutral-400">Total Recruiters</p>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">12,405</h3>
          </div>
        </div>

        {/* Total Companies */}
        <div className="p-5 bg-[#111115] border border-neutral-800/80 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              -0%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-neutral-400">Total Companies</p>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">4,281</h3>
          </div>
        </div>

        {/* Jobs Posted */}
        <div className="p-5 bg-[#111115] border border-neutral-800/80 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900">
              +24%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-neutral-400">Jobs Posted</p>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">8,920</h3>
          </div>
        </div>

        {/* Platform Revenue */}
        <div className="p-5 bg-[#111115] border border-neutral-800/80 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900">
              +18.5%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-neutral-400">Platform Revenue</p>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">$245,800</h3>
          </div>
        </div>

      </div>

      {/* Recent Subscription Transactions Table */}
      <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
          <h3 className="text-sm font-bold text-white tracking-wider">Recent Subscription Transactions</h3>
          <button className="text-xs text-neutral-400 hover:text-white transition">
            View All Activity
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/50 text-neutral-500 font-semibold uppercase tracking-wider border-b border-neutral-900">
              <tr>
                <th className="py-3 px-4">User/Recruiter</th>
                <th className="py-3 px-4">Plan Type</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold flex items-center justify-center text-[10px]">
                        {tx.email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{tx.email}</div>
                        <div className="text-[10px] text-neutral-500">{tx.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-lg text-xs bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {tx.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-neutral-400">{tx.txId}</td>
                  <td className="py-4 px-4 font-semibold text-white">{tx.amount}</td>
                  <td className="py-4 px-4 text-neutral-400">{tx.date}</td>
                  <td className="py-4 px-4 text-right">{getStatusBadge(tx.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}