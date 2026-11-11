"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Logo from "../../app/assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/companies" },
    { name: "Pricing", href: "/pricing" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/50 bg-[#0a0a0c] px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="HireLoop Logo"
            width={120}
            height={35}
            priority
            className="h-auto w-28 object-contain sm:w-[120px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="rounded-lg border border-neutral-800 p-2 text-neutral-300 transition hover:bg-neutral-900 md:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-neutral-800 bg-[#0a0a0c]/95 p-5 shadow-xl backdrop-blur-xl md:hidden">

          <nav className="flex flex-col gap-4 text-sm font-medium text-neutral-300">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 transition hover:bg-neutral-900 hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-1 border-t border-neutral-800" />

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 transition hover:bg-neutral-900 hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-indigo-600 px-5 py-3 text-center font-medium text-white transition hover:bg-indigo-500"
            >
              Get Started
            </Link>

          </nav>
        </div>
      )}

    </header>
  );
}
