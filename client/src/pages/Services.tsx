import { Briefcase, Users, BookOpen, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/**
 * Services Page
 * Design: Detailed service offerings and benefits
 */
export default function Services() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive recruitment and consultancy solutions tailored to meet your needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#F59E0B]">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Job Recruitment Services
              </h3>
              <p className="text-gray-700 mb-4">
                We provide comprehensive recruitment solutions including job posting, candidate screening, interviews, and placement services for both entry-level and senior positions across various industries.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Job posting and distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Candidate screening and shortlisting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Interview coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Placement and onboarding support</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#F59E0B]">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Candidate Sourcing & Placement
              </h3>
              <p className="text-gray-700 mb-4">
                Our expert team identifies and sources qualified candidates from our extensive network, ensuring the best match for your organization's specific requirements and culture.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Active candidate sourcing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Passive candidate engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Candidate skill assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Successful placement</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#F59E0B]">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Employment Registration
              </h3>
              <p className="text-gray-700 mb-4">
                We assist with all employment registration requirements, ensuring compliance with Ghanaian labor laws and regulations for both employers and employees.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Employment contract preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Labor law compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Registration documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Regulatory guidance</span>
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#F59E0B]">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Employer Staffing Support
              </h3>
              <p className="text-gray-700 mb-4">
                We provide ongoing staffing support to employers, helping build and maintain high-performing teams through strategic recruitment and HR management.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Workforce planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Temporary staffing solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Staff retention strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>HR advisory services</span>
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#F59E0B]">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Candidate Screening & Recommendations
              </h3>
              <p className="text-gray-700 mb-4">
                Our thorough screening process ensures only the most qualified candidates are presented to employers, saving time and improving hiring success rates.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Resume and qualification review</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Skills assessment and testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Reference verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Detailed candidate reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a job seeker or employer, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/employers">
              <Button
                variant="outline"
                className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-semibold px-8 py-3 text-lg"
              >
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
