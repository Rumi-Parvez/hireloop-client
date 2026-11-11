import { Footer } from 'react-day-picker';

import Hero from '@/components/hero/Hero';
import FeaturedJobs from '@/components/jobs/FeaturedJobs';
import Navbar from '@/components/navbar/Navbar';
import CTASection from '@/components/shearded/CTASection';
import FeaturesSection from '@/components/shearded/FeaturesSection';
import PricingSection from '@/components/shearded/PricingSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-indigo-500 selection:text-white">
      
      <Hero />
      <FeaturedJobs />
      <FeaturesSection></FeaturesSection>
      <PricingSection></PricingSection> 
      <CTASection></CTASection>
       <Footer />
    </main>
  );
}