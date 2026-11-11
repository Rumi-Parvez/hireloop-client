"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import Logo from "../../app/assets/logo.png";
import { useSession, authClient } from "@/lib/auth-client";

interface NavLink {
  name: string;
  href: string;
}

interface ProfileLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  const user = session?.user;

  const navLinks: NavLink[] = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ];

  const profileLinks: ProfileLink[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Applications",
      href: "/dashboard/applications",
      icon: BriefcaseBusiness,
    },
    {
      name: "Saved Jobs",
      href: "/dashboard/saved-jobs",
      icon: Bookmark,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out
  const handleSignOut = async (): Promise<void> => {
    try {
      await authClient.signOut();

      setProfileOpen(false);
      setIsOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // User initials
  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/60 bg-[#0a0a0c]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setIsOpen(false)}
        >
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">

          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-neutral-800" />
          ) : user ? (

            /* Logged In Profile */
            <div className="relative" ref={profileRef}>

              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900/70 py-1.5 pl-1.5 pr-3 transition hover:border-neutral-700 hover:bg-neutral-800"
              >

                {/* Profile Image / Initial */}
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    unoptimized
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                    {getInitials(user.name)}
                  </div>
                )}

                <div className="max-w-28 text-left">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-neutral-400">
                    My Account
                  </p>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-neutral-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-neutral-800 bg-[#111114] p-2 shadow-2xl shadow-black/40">

                  {/* User Information */}
                  <div className="border-b border-neutral-800 px-3 py-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name || "User"}
                    </p>

                    <p className="truncate text-xs text-neutral-400">
                      {user.email}
                    </p>
                  </div>

                  {/* Profile Links */}
                  <div className="space-y-1 py-2">
                    {profileLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                        >
                          <Icon className="h-4 w-4" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-neutral-800 pt-2">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>

                </div>
              )}
            </div>

          ) : (

            /* Logged Out Actions */
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500"
              >
                Get Started
              </Link>
            </>
          )}
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
        <div className="absolute left-0 top-full w-full border-b border-neutral-800 bg-[#0a0a0c] p-5 shadow-xl md:hidden">

          <nav className="flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-neutral-800" />

            {isPending ? (
              <div className="h-10 animate-pulse rounded-lg bg-neutral-800" />
            ) : user ? (

              /* Mobile Logged In Profile */
              <>
                <div className="flex items-center gap-3 px-3 py-3">

                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={42}
                      height={42}
                      unoptimized
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                      {getInitials(user.name)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs text-neutral-400">
                      {user.email}
                    </p>
                  </div>

                </div>

                {profileLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 flex w-full items-center gap-3 rounded-lg border-t border-neutral-800 px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>

            ) : (

              /* Mobile Logged Out Actions */
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Get Started
                </Link>
              </>
            )}

          </nav>
        </div>
      )}

    </header>
  );
}
