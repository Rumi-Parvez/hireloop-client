'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

export default function PostNewJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Engineering',
    location: '',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    description: '',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Posting job:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header Navigation */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/employer" className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white font-serif">Post a New Job</h1>
            <p className="text-xs text-neutral-400">Fill out the form below to publish your job listing</p>
          </div>
        </div>

        <button 
          type="submit" 
          form="job-form"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Publish Job
        </button>
      </div>

      {/* Form Content */}
      <form id="job-form" onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-neutral-900 pb-3">1. Basic Details</h3>
          
          <div className="space-y-1">
            <label className="text-xs text-neutral-300 font-medium">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-indigo-500 outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium">Location</label>
              <input
                type="text"
                placeholder="e.g. San Francisco, CA or Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Compensation & Type */}
        <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-neutral-900 pb-3">2. Job Type & Salary Range</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium">Workplace Type</label>
              <select
                value={formData.workplaceType}
                onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-indigo-500 outline-none"
              >
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium">Employment Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-indigo-500 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium">Min Salary ($/year)</label>
              <input
                type="number"
                placeholder="120000"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium">Max Salary ($/year)</label>
              <input
                type="number"
                placeholder="160000"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Job Description */}
        <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-neutral-900 pb-3">3. Job Description</h3>
          
          <div className="space-y-1">
            <textarea
              rows={6}
              required
              placeholder="Describe the role responsibilities, ideal candidate background, and perks..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:border-indigo-500 outline-none leading-relaxed resize-none"
            />
          </div>
        </div>

      </form>

    </div>
  );
}