import Image from "next/image";

import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Star
} from "lucide-react";

import hero from "../../app/assets/globe.png";

export default function Hero() {
  const stats = [
    {
      icon: Briefcase,
      value: "50K",
      label: "Active Jobs"
    },
    {
      icon: Building2,
      value: "12K",
      label: "Companies"
    },
    {
      icon: Users,
      value: "2M",
      label: "Job Seekers"
    },
    {
      icon: Star,
      value: "97%",
      label: "Satisfaction Rate"
    }
  ];

  const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer"
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0c] px-4 pt-12 pb-20 text-white sm:px-6 lg:px-8">

      {/* Full Section Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src={hero}
          alt="Globe Background"
          fill
          priority
          className="object-cover object-center opacity-80"
        />

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/50 via-[#0a0a0c]/10 to-[#0a0a0c]" />
      </div>

      {/* Top Badge */}
      <div className="relative z-10 mb-6 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs text-neutral-300 shadow-inner backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          <span>50,000+ NEW JOBS THIS MONTH</span>
        </div>
      </div>

      {/* Main Heading */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-4 text-center">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto max-w-2xl text-base text-neutral-300 sm:text-lg">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your
          next role — faster.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-3 shadow-2xl backdrop-blur-xl md:flex-row">

        <div className="flex w-full flex-1 items-center gap-3 rounded-xl border border-neutral-800/80 bg-neutral-950/70 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-neutral-400" />

          <input
            type="text"
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </div>

        <div className="flex w-full flex-1 items-center gap-3 rounded-xl border border-neutral-800/80 bg-neutral-950/70 px-4 py-3">
          <MapPin className="h-5 w-5 shrink-0 text-neutral-400" />

          <input
            type="text"
            placeholder="Location or Remote"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 md:w-auto"
        >
          <Search className="h-5 w-5" />
          <span className="md:hidden">Search Jobs</span>
        </button>
      </div>

      {/* Trending Positions */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400">
        <span className="font-medium text-neutral-300">
          Trending Positions:
        </span>

        {trendingPositions.map((position) => (
          <span
            key={position}
            className="cursor-pointer rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 transition hover:border-indigo-500 hover:text-white"
          >
            {position}
          </span>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="relative z-10 mx-auto mt-20 max-w-7xl">

        {/* Subtitle */}
        <h3 className="mb-12 text-center text-lg font-medium text-neutral-300 sm:text-xl">
          Assisting over{" "}
          <span className="font-semibold text-white">
            15,000
          </span>{" "}
          job seekers find their dream positions.
        </h3>

        {/* Stats Cards */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex h-36 flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-6 shadow-2xl backdrop-blur-xl"
              >
                <Icon className="h-5 w-5 text-indigo-400" />

                <div>
                  <h4 className="text-3xl font-bold text-white">
                    {stat.value}
                  </h4>

                  <p className="mt-1 text-xs text-neutral-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
