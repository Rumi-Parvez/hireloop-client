'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

export default function ManageJobPostsPage() {
  const jobPosts = [
    { id: '1', title: 'Senior Product Designer', applicants: 142, status: 'Active', postedDate: 'Oct 12, 2023' },
    { id: '2', title: 'Backend Engineer (Node.js)', applicants: 98, status: 'Active', postedDate: 'Oct 15, 2023' },
    { id: '3', title: 'Full Stack Developer', applicants: 210, status: 'Closed', postedDate: 'Sep 28, 2023' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white font-serif">Manage Job Posts</h1>
          <p className="text-xs text-neutral-400">View, edit, and update your active or closed listings</p>
        </div>

        <Link 
          href="/dashboard/employer/post-job"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </Link>
      </div>

      {/* Table List */}
      <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/50 text-neutral-500 font-semibold uppercase tracking-wider border-b border-neutral-900">
              <tr>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Applicants</th>
                <th className="py-3 px-4">Posted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60">
              {jobPosts.map((job) => (
                <tr key={job.id} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">{job.title}</td>
                  <td className="py-4 px-4 text-indigo-400 font-medium">{job.applicants} candidates</td>
                  <td className="py-4 px-4 text-neutral-400">{job.postedDate}</td>
                  <td className="py-4 px-4">
                    {job.status === 'Active' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">Active</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] bg-neutral-900 text-neutral-500 border border-neutral-800">Closed</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-indigo-400 transition">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-rose-400 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}