import { 
  Search, 
  TrendingUp, 
  Building2, 
  Bookmark, 
  MousePointerClick, 
  FileText, 
  Hexagon, 
  LineChart 
} from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: LineChart,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-[#0a0a0c] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      
      {/* Badge & Title */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] tracking-widest text-indigo-400 font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          FEATURES JOB
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
          Everything you need to succeed
        </h2>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start gap-4 group">
              {/* Icon Container */}
              <div className="w-14 h-14 shrink-0 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg group-hover:border-indigo-500/50 transition-colors">
                <Icon className="w-6 h-6 text-pink-400 group-hover:text-indigo-400 transition-colors" />
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}