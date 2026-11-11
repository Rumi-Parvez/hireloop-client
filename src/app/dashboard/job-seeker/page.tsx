'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, FileText, Calendar, Award, ArrowUpRight, CheckCircle, Bell, MessageSquare } from 'lucide-react';

import DashboardCard from '@/components/dashboard/DashboardCard';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: 'application' | 'alert' | 'message';
  link: string;
}

export default function JobSeekerDashboard() {
  const router = useRouter();
  const [filterType, setFilterType] = useState<'all' | 'application' | 'alert' | 'message'>('all');

  const activities: ActivityItem[] = [
    { 
      id: '1',
      title: "Application for Senior Product Designer at TechFlow updated to 'Under Review'", 
      time: "2 hours ago", 
      type: 'application',
      link: '/dashboard/applications'
    },
    { 
      id: '2',
      title: "New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.", 
      time: "5 hours ago", 
      type: 'alert',
      link: '/dashboard/jobs'
    },
    { 
      id: '3',
      title: "You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).", 
      time: "1 day ago", 
      type: 'message',
      link: '/dashboard/messages'
    },
    { 
      id: '4',
      title: "Interview scheduled with Stripe for Full Stack Developer role.", 
      time: "2 days ago", 
      type: 'application',
      link: '/dashboard/applications'
    },
  ];

  const filteredActivities = filterType === 'all' 
    ? activities 
    : activities.filter(item => item.type === filterType);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'application':
        return <FileText className="w-4 h-4 text-indigo-400" />;
      case 'alert':
        return <Bell className="w-4 h-4 text-amber-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-pink-400" />;
      default:
        return <Bookmark className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Job Seeker Overview</h1>
          <p className="text-xs text-neutral-400">Track your job search progress and latest applications</p>
        </div>
        <Link 
          href="/dashboard/jobs"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
        >
          Browse Jobs <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stat Cards Grid with Click Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => router.push('/dashboard/saved-jobs')} className="cursor-pointer">
          <DashboardCard title="Saved Jobs" value="12" icon={Bookmark} />
        </div>
        <div onClick={() => router.push('/dashboard/applications')} className="cursor-pointer">
          <DashboardCard title="Applications Submitted" value="24" icon={FileText} />
        </div>
        <div onClick={() => router.push('/dashboard/applications?filter=interview')} className="cursor-pointer">
          <DashboardCard title="Interviews Scheduled" value="3" icon={Calendar} />
        </div>
        <div onClick={() => router.push('/dashboard/applications?filter=offers')} className="cursor-pointer">
          <DashboardCard title="Offers Received" value="1" icon={Award} />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-900">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Recent Activity</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-900 text-neutral-400 border border-neutral-800">
              {filteredActivities.length} updates
            </span>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg transition ${filterType === 'all' ? 'bg-indigo-600 text-white font-medium' : 'text-neutral-400 hover:text-white bg-neutral-900'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterType('application')}
              className={`px-3 py-1 rounded-lg transition ${filterType === 'application' ? 'bg-indigo-600 text-white font-medium' : 'text-neutral-400 hover:text-white bg-neutral-900'}`}
            >
              Apps
            </button>
            <button 
              onClick={() => setFilterType('alert')}
              className={`px-3 py-1 rounded-lg transition ${filterType === 'alert' ? 'bg-indigo-600 text-white font-medium' : 'text-neutral-400 hover:text-white bg-neutral-900'}`}
            >
              Alerts
            </button>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <p className="text-center text-xs text-neutral-500 py-6">No activity found for this filter.</p>
          ) : (
            filteredActivities.map((item) => (
              <div 
                key={item.id} 
                onClick={() => router.push(item.link)}
                className="flex items-center justify-between p-4 bg-neutral-950/60 border border-neutral-900/80 rounded-2xl hover:border-neutral-700 hover:bg-neutral-900/40 transition cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-indigo-500/50 transition">
                    {getActivityIcon(item.type)}
                  </div>
                  <p className="text-xs text-neutral-300 font-medium group-hover:text-indigo-400 transition">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-500 whitespace-nowrap">{item.time}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}