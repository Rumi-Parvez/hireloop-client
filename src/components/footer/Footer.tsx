import Image from 'next/image';
import Link from 'next/link';

import logo from '../../app/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] text-neutral-400 border-t border-neutral-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
        
        {/* Left Col: Brand & Info */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="inline-block">
            <Image 
              src={logo} 
              alt="HireLoop Logo" 
              width={120} 
              height={35} 
              className="object-contain"
            />
          </Link>
          <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
            The AI-native career platform. Built for people who take their work seriously.
          </p>
        </div>

        {/* Right Col: Navigation Links (Grid of 3 columns) */}
        <div className="md:col-span-7 grid grid-cols-3 gap-8">
          
          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/jobs" className="hover:text-white transition-colors">Job discovery</Link></li>
              <li><Link href="/ai" className="hover:text-white transition-colors">Worker AI</Link></li>
              <li><Link href="/companies" className="hover:text-white transition-colors">Companies</Link></li>
              <li><Link href="/salary" className="hover:text-white transition-colors">Salary data</Link></li>
            </ul>
          </div>

          {/* Navigations */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider">Navigations</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/help" className="hover:text-white transition-colors">Help center</Link></li>
              <li><Link href="/library" className="hover:text-white transition-colors">Career library</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/brand" className="hover:text-white transition-colors">Brand Guideline</Link></li>
              <li><Link href="/newsroom" className="hover:text-white transition-colors">Newsroom</Link></li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Social Icons & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        
        {/* Social Icons with SVG */}
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          {/* Pinterest */}
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.221 7.462-1.214 0-2.355-.63-2.744-1.379l-.749 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Copyright & Policy */}
        <div className="flex flex-wrap items-center gap-4 text-center sm:text-right">
          <span>Copyright 2024 — Programming Hero</span>
          <span>•</span>
          <Link href="/terms" className="hover:text-neutral-300 transition">Terms & Policy</Link>
          <span>-</span>
          <Link href="/privacy" className="hover:text-neutral-300 transition">Privacy Guideline</Link>
        </div>

      </div>
    </footer>
  );
}