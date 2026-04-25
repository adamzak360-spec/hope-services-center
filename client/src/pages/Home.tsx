import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, Target } from "lucide-react";

/**
 * Home Page
 * Design: Modern hero section with auto-sliding banner, feature cards, and CTA sections
 * - Hero: Full-width image carousel with overlay text
 * - Features: Three key service areas with icons
 * - CTA: Dual call-to-action for job seekers and employers
 */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663591823588/EJoBp6DuLE5BTpXoGSpSoP/hero-recruitment-team-SEETKqwZ7emCznKB9HFwA6.webp",
      title: "Find Your Perfect Career",
      subtitle: "Connect with top employers in Ghana",
    },
    {
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663591823588/EJoBp6DuLE5BTpXoGSpSoP/job-interview-scene-CgEPEW7JRW5nqEzpqXczn5.webp",
      title: "Grow Your Business",
      subtitle: "Find talented professionals for your team",
    },
    {
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663591823588/EJoBp6DuLE5BTpXoGSpSoP/training-workshop-M7i5czF4H4H42QpVsRnPZ2.webp",
      title: "Professional Development",
      subtitle: "Enhance your skills with our training programs",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section with Auto-Sliding Banner */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-gray-100">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/jobs">
              <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                Browse Jobs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/employers">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0A2540] font-semibold px-8 py-3 text-lg"
              >
                Post a Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#F59E0B] w-8"
                  : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
              Why Choose Hope Services Centre?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We connect talented professionals with leading employers across
              Ghana, providing comprehensive recruitment and consultancy
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Quality Recruitment
              </h3>
              <p className="text-gray-600">
                We carefully match qualified candidates with the right job
                opportunities, ensuring the best fit for both employers and job
                seekers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Expert Consultancy
              </h3>
              <p className="text-gray-600">
                Our experienced consultants provide strategic advice to help
                businesses build strong teams and develop their human resources.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Professional Training
              </h3>
              <p className="text-gray-600">
                We offer comprehensive training programs to enhance skills and
                prepare professionals for career advancement and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Job Seekers */}
      <section className="py-16 md:py-24 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Dream Job?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Browse our extensive job listings and apply to positions that
                match your skills and career goals. Our team is here to support
                your journey.
              </p>
              <Link href="/jobs">
                <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                  Explore Jobs <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Latest Opportunities</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Marketing Manager - Accra
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Software Developer - Kumasi
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  HR Specialist - Tamale
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Sales Executive - Multiple Locations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Employers */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Why Partner With Us?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Access to pre-screened talent pool
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Reduced hiring time and costs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Professional recruitment support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  Ongoing HR consultancy services
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
                Looking for Top Talent?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Post your job openings and reach qualified professionals across
                Ghana. Our team will help you find the perfect candidates for
                your organization.
              </p>
              <Link href="/employers">
                <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                  Post a Job <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#F59E0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-[#0A2540] mb-8 max-w-2xl mx-auto">
            Get in touch with our team for more information about our services,
            job opportunities, or to discuss your recruitment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-[#0A2540] hover:bg-[#051d2d] text-white font-semibold px-8 py-3 text-lg">
                Contact Us
              </Button>
            </Link>
            <a
              href="https://wa.me/233243105412"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white font-semibold px-8 py-3 text-lg"
              >
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
