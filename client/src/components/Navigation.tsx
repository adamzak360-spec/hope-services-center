import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Navigation Component
 * Design: Modern corporate navigation with sticky positioning
 * - Primary color: #0A2540 (deep blue)
 * - Accent color: #F59E0B (amber/yellow)
 * - Mobile hamburger menu for responsiveness
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Job Listings", href: "/job-listings" },
    { label: "Employers", href: "/employers" },
    { label: "Job Seekers", href: "/job-seekers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-[#0A2540] p-1.5 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src="/assets/logo.png"
                alt="Hope Services Centre Logo"
                className="h-10 w-auto object-contain mix-blend-screen brightness-110"
              />
            </div>
            <span className="hidden sm:inline font-bold text-[#0A2540] text-xl tracking-tight">
              Hope Services
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#0A2540] hover:bg-gray-100 transition-colors duration-200">
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Admin Link & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-xs border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
              >
                Admin
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#0A2540] hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="space-y-1 pt-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A2540] hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <Link href="/admin">
                <a
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#0A2540] bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
