import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
}

export default function DashboardCard({ title, value, icon: Icon }: DashboardCardProps) {
  return (
    <div className="p-6 bg-[#111115] border border-neutral-800/80 rounded-2xl shadow-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-neutral-700 transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">{title}</span>
        <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-400">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
    </div>
  );
}