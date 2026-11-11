'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Users, Zap, CheckCircle2, Plus } from 'lucide-react';

import DashboardCard from '@/components/dashboard/DashboardCard';

interface CandidateApplication {
  id: string;
  name: string;
  avatar: string;
  role: string;
  dateApplied: string;
  experience: string;
  status: 'Interviewing' | 'New' | 'Reviewing' | 'Rejected';
}

const recentApplications: CandidateApplication[] = [
  {
    id: '1',
    name: 'Julianne Moore',
    avatar: 'JM',
    role: 'Senior Product Designer',
    dateApplied: 'Oct 24, 2023',
    experience: '6 years',
    status: 'Interviewing',
  },
  {
    id: '2',
    name: 'Robert Downey',
    avatar: 'RD',
    role: 'Backend Engineer',
    dateApplied: 'Oct 23, 2023',
    experience: '4 years',
    status: 'New',
  },
  {
    id: '3',
    name: 'Emma Stone',
    avatar: 'ES',
    role: 'Marketing Lead',
    dateApplied: 'Oct 22, 2023',
    experience: '8 years',
    status: 'Reviewing',
  },
  {
    id: '4',
    name: 'Chris Pratt',
    avatar: 'CP',
    role: 'Product Manager',
    dateApplied: 'Oct 21, 2023',
    experience: '5 years',
    status: 'Rejected',
  },
];

export default function EmployerDashboardPage() {
  const recruiterName = "Alex Sterling";

  const getStatusBadge = (status: CandidateApplication['status']) => {
    switch (status) {
      case 'Interviewing':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-950/70 text-purple-400 border border-purple-800/60">Interviewing</span>;
      case 'New':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-950/70 text-indigo-400 border border-indigo-800/60">New</span>;
      case 'Reviewing':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-950/70 text-amber-400 border border-amber-800/60">Reviewing</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-950/70 text-rose-400 border border-rose-800/60">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto relative min-h-[calc(100vh-100px)]">
      
      {/* Greeting Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
          Welcome back, {recruiterName}
        </h1>
      </div>

      {/* Stats Cards Grid (Matching Figma Screen) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Job Posts" value="48" icon={FileText} />
        <DashboardCard title="Total Applicants" value="1,284" icon={Users} />
        <DashboardCard title="Active Jobs" value="18" icon={Zap} />
        <DashboardCard title="Jobs Closed" value="32" icon={CheckCircle2} />
      </div>

      {/* Recent Applications Table */}
      <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
          <h3 className="text-sm font-bold text-white tracking-wider">Recent Applications</h3>
          <Link href="/dashboard/employer/applications" className="text-xs text-neutral-400 hover:text-white transition">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/50 text-neutral-500 font-semibold uppercase tracking-wider border-b border-neutral-900">
              <tr>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Date Applied</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60">
              {recentApplications.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold flex items-center justify-center text-[10px]">
                      {candidate.avatar}
                    </div>
                    <span className="font-semibold text-white">{candidate.name}</span>
                  </td>
                  <td className="py-4 px-4 text-neutral-400">{candidate.role}</td>
                  <td className="py-4 px-4 text-neutral-400">{candidate.dateApplied}</td>
                  <td className="py-4 px-4 text-neutral-400">{candidate.experience}</td>
                  <td className="py-4 px-4 text-right">{getStatusBadge(candidate.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button (+ Post Job) */}
      <Link
        href="/dashboard/employer/post-job"
        className="fixed bottom-8 right-8 w-14 h-14 bg-white text-neutral-950 rounded-full flex items-center justify-center shadow-2xl hover:bg-neutral-200 transition-all hover:scale-105 z-40"
        title="Post a New Job"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </Link>

    </div>
  );
}