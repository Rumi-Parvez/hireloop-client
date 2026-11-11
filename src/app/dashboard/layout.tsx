'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useSession, signOut } from '@/lib/auth-client';

import { 
  Home, 
  LayoutDashboard, 
  Briefcase, 
  Bookmark, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Mail,
  Users,
  Building,
  DollarSign,
  ShieldAlert,
  X,
  UploadCloud,
  CheckCircle2,
  Loader2,
  Plus
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login');
          },
        },
      });
    } catch (err) {
      router.push('/login');
    }
  };

  // User Info & Role (Role can be 'seeker' | 'employer' | 'admin')
  const userName = session?.user?.name || "Rumi Parvez";
  const userEmail = session?.user?.email || "romy@openyhool.com";
  
  // ডেমো বা সেশন থেকে রোল চেক করা (ডিফল্ট হিসেবে seeker সেট করা আছে, প্রয়োজনে পরিবর্তন করতে পারেন)
  const userRole = (session?.user as { role?: 'seeker' | 'employer' | 'admin' } | undefined)?.role ?? 'seeker';

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // ১. Job Seeker Navigation (ফিজমা স্ক্রিনশট A169B275 অনুযায়ী)
  const seekerNav = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard/job-seeker', icon: LayoutDashboard },
    { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
    { name: 'Saved Jobs', href: '/dashboard/saved-jobs', icon: Bookmark },
    { name: 'Applications', href: '/dashboard/applications', icon: FileText },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // ২. Employer / Recruiter Navigation (ফিজমা স্ক্রিনশট 7BAE32EB অনুযায়ী)
  const employerNav = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard/employer', icon: LayoutDashboard },
    { name: 'Manage Jobs', href: '/dashboard/employer/manage-jobs', icon: Briefcase },
    { name: 'Applications', href: '/dashboard/employer/applications', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // ৩. Admin Navigation (ফিজমা স্ক্রিনশট C734A14D অনুযায়ী)
  const adminNav = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Companies', href: '/dashboard/admin/companies', icon: Building },
    { name: 'Jobs', href: '/dashboard/admin/jobs', icon: Briefcase },
    { name: 'Payments', href: '/dashboard/admin/payments', icon: DollarSign },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // রোল অনুযায়ী সঠিক মেনু সিলেক্ট করা
  const navItems = userRole === 'employer' ? employerNav : userRole === 'admin' ? adminNav : seekerNav;

  const handleResumeUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setIsResumeModalOpen(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen  bg-[#0a0a0c] text-white flex select-none">
      
      {/* Sidebar */}
      <aside className="w-64 mt-20 bg-[#0d0d12] border-r border-neutral-900 flex flex-col justify-between p-6 fixed inset-y-0 z-30">
        <div className="space-y-6">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold font-serif tracking-wide text-white group-hover:text-indigo-400 transition">
              hire<span className="text-indigo-500">loop</span>
            </span>
          </Link>

          {/* User Profile Card based on Figma */}
          <Link 
            href="/dashboard/settings" 
            className="p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-2xl flex items-center gap-3 transition group cursor-pointer shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold flex items-center justify-center text-xs shadow-inner group-hover:border-indigo-400">
              {userInitials}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-semibold text-white truncate group-hover:text-indigo-400 transition">{userName}</h4>
              <p className="text-[10px] text-neutral-400 truncate capitalize">
                {userRole === 'employer' ? 'Recruiter' : userRole === 'admin' ? 'Super Admin' : 'Professional Tier'}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-neutral-800 text-white shadow-inner font-semibold border-l-2 border-indigo-500' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-neutral-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-4 border-t border-neutral-900">
          {userRole === 'seeker' && (
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="w-full py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl transition shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" /> Post Resume
            </button>
          )}

          {userRole === 'employer' && (
            <Link 
              href="/dashboard/employer/post-job"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Post New Job
            </Link>
          )}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Topbar */}
        <header className="h-16 border-b border-neutral-900 bg-[#0a0a0c]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 w-96 px-3.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl focus-within:border-indigo-500 transition">
            <Search className="w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${userRole === 'admin' ? 'users, companies...' : 'opportunities...'}`} 
              className="bg-transparent border-none outline-none text-xs text-white placeholder-neutral-600 w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/dashboard/messages')}
              className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition"
              title="Messages"
            >
              <Mail className="w-4 h-4" />
            </button>
            <button 
              onClick={() => router.push('/dashboard/notifications')}
              className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </button>
            
            {/* Topbar Avatar Fallback */}
            <Link 
              href="/dashboard/settings"
              className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold flex items-center justify-center text-xs hover:border-indigo-400 transition"
              title="Account Settings"
            >
              {userInitials}
            </Link>
          </div>
        </header>

        {/* Page Children */}
        <main className="flex-1 p-8 bg-[#0a0a0c]">
          {children}
        </main>
      </div>

      {/* Post Resume Modal (For Seeker) */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111115] border border-neutral-800 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-serif">Upload Your Resume</h3>
              <p className="text-xs text-neutral-400">Share your latest PDF resume with top recruiters</p>
            </div>

            {uploadSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
                <p className="text-sm font-semibold">Resume Uploaded Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleResumeUpload} className="space-y-4">
                <div className="border-2 border-dashed border-neutral-800 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs text-neutral-300 font-medium">Click or Drag & Drop PDF Resume</p>
                  <p className="text-[10px] text-neutral-500 mt-1">Maximum file size: 5MB</p>
                  <input type="file" accept=".pdf" className="hidden" />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Resume'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}