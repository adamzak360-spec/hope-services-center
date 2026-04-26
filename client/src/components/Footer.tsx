import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

/**
 * Footer Component
 * Design: Professional corporate footer with company info and links
 * - Color scheme: Dark blue (#0A2540) background with white text
 * - Contains: Contact info, navigation links, social media
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo.png"
                alt="Hope Services Centre Logo"
                className="h-14 w-auto object-contain mix-blend-screen brightness-110"
              />
              <span className="font-bold text-xl tracking-tight">Hope Services</span>
            </div>
            <p className="text-gray-300 text-sm">
              Professional recruitment and consultancy services in Tamale, Ghana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-[#F59E0B]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/jobs">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    Jobs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/employers">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    For Employers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-[#F59E0B]">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    Recruitment
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    Consultancy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-[#F59E0B] transition-colors">
                    Training
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-[#F59E0B]">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F59E0B]" />
                <a
                  href="tel:+233243105412"
                  className="text-gray-300 hover:text-[#F59E0B] transition-colors"
                >
                  +233 243 105 412
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F59E0B]" />
                <span className="text-gray-300">
                  GCB Bank, Tamale Main, Ghana
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F59E0B]" />
                <span className="text-gray-300">NT-0003-5187</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Hope Services Centre. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#F59E0B] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#F59E0B] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/233243105412"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#F59E0B] transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.022 1.022-1.756 2.119-2.259 3.357-.506 1.238-.749 2.565-.949 4.255-.2 1.69.016 3.386.25 5.05.234 1.664.703 3.27 1.408 4.744.705 1.475 1.635 2.77 2.789 3.924 1.154 1.154 2.449 2.084 3.924 2.789 1.475.705 3.08 1.174 4.744 1.408 1.664.234 3.36.45 5.05.25 1.69-.2 3.017-.443 4.255-.949 1.238-.503 2.335-1.236 3.356-2.259 1.022-1.022 1.756-2.119 2.259-3.357.506-1.238.749-2.565.949-4.255.2-1.69-.016-3.386-.25-5.05-.234-1.664-.703-3.27-1.408-4.744-.705-1.475-1.635-2.77-2.789-3.924-1.154-1.154-2.449-2.084-3.924-2.789-1.475-.705-3.08-1.174-4.744-1.408-1.664-.234-3.36-.45-5.05-.25z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
