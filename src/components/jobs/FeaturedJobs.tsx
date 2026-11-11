import Link from 'next/link';
import { MapPin, Briefcase, Euro, ArrowRight } from 'lucide-react';

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string;
}

const jobList: JobCardProps[] = [
  {
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="relative bg-[#0a0a0c] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      
      {/* Header Info */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] tracking-widest text-indigo-400 font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          SMART JOB DISCOVERY
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
          The roles {`you'd`} never find by searching
        </h2>
      </div>

      {/* Job Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobList.map((job, index) => (
          <div 
            key={index}
            className="p-6 bg-[#111115] border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                {job.description}
              </p>

              {/* Tags / Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {job.location}
                </span>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  {job.type}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
                  <Euro className="w-3.5 h-3.5 text-pink-400" />
                  {job.salary}
                </span>
              </div>
            </div>

            {/* Apply Link */}
            <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
              <Link 
                href="/jobs" 
                className="text-sm font-medium text-white group-hover:text-indigo-400 inline-flex items-center gap-2 transition-colors"
              >
                Apply Now <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Job Button */}
      <div className="flex justify-center mt-12">
        <Link 
          href="/jobs"
          className="px-6 py-3 bg-white text-neutral-950 font-semibold text-sm rounded-xl hover:bg-neutral-200 transition-all shadow-lg shadow-white/5"
        >
          View all job open
        </Link>
      </div>

    </section>
  );
}