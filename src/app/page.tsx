import Hero from '@/components/hero/Hero';
import FeaturedJobs from '@/components/jobs/FeaturedJobs';
import Navbar from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-indigo-500 selection:text-white">
      
      <Hero />
      <FeaturedJobs />
    </main>
  );
}