import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative bg-[#0a0a0c] text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-neutral-900">
      
      {/* Custom Gradient Background based on your exact color stops */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 flex justify-center items-end overflow-hidden"
        style={{
          background: `linear-gradient(180deg, 
            #1D1D1D 0%, 
            #363636 12%, 
            #595959 39%, 
            #302B84 63%, 
            #564DED 83%, 
            #080716 96%
          )`
        }}
      >
        {/* Curved Globe / Grid Overlay simulation */}
        <div className="w-[1200px] h-[600px] rounded-t-full border-t border-[#564DED]/50 bg-[#080716]/80 flex justify-center shadow-[0_-60px_120px_rgba(86,77,237,0.3)]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#302B84_1px,transparent_1px),linear-gradient(to_bottom,#302B84_1px,transparent_1px)] bg-[size:4rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Heading */}
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-serif">
          Your next role is <br />
          already looking for you
        </h2>

        {/* Subtitle */}
        <p className="text-neutral-300 text-sm sm:text-base max-w-lg mx-auto">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/register"
            className="px-7 py-3.5 bg-white text-neutral-950 font-semibold text-sm rounded-xl hover:bg-neutral-200 transition-all shadow-xl shadow-white/10"
          >
            Create a free account
          </Link>

          <Link 
            href="/pricing"
            className="px-7 py-3.5 bg-neutral-950/80 hover:bg-neutral-900 text-white font-medium text-sm rounded-xl border border-neutral-800 transition-all backdrop-blur-md"
          >
            View pricing
          </Link>
        </div>

      </div>

    </section>
  );
}