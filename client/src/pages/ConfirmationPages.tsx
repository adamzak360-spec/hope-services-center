import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, FileText, Briefcase } from "lucide-react";
import { Link } from "wouter";

/**
 * Confirmation Pages
 * Design: Custom confirmation pages for each form submission type
 */

export function JobSeekerConfirmation() {
  return (
    <div className="w-full">
      <section className="min-h-screen bg-gradient-to-br from-[#0A2540] to-[#0A2540] text-white flex items-center justify-center py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-[#F59E0B] animate-bounce" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Registration Successful!
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            Thank you for registering with Hope Services Centre. Your job seeker profile has been submitted successfully.
          </p>

          <div className="bg-white bg-opacity-10 rounded-lg p-8 mb-8 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <Mail className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-bold mb-2">Check Your Email</h3>
                <p className="text-gray-300">
                  We've sent a confirmation email to your registered email address. Please check your inbox and spam folder for details about your registration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-bold mb-2">Your CV</h3>
                <p className="text-gray-300">
                  Your uploaded CV has been securely stored and will be reviewed by our team. We'll contact you soon with job opportunities matching your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              What happens next? Our team will review your profile and contact you within 48 hours with relevant job opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/job-listings">
                <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                  Browse Available Jobs
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-semibold px-8 py-3 text-lg"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function EmployerConfirmation() {
  return (
    <div className="w-full">
      <section className="min-h-screen bg-gradient-to-br from-[#0A2540] to-[#0A2540] text-white flex items-center justify-center py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-[#F59E0B] animate-bounce" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Job Posted Successfully!
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            Your job opening has been posted on Hope Services Centre and is now visible to qualified candidates.
          </p>

          <div className="bg-white bg-opacity-10 rounded-lg p-8 mb-8 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <Mail className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-bold mb-2">Confirmation Email Sent</h3>
                <p className="text-gray-300">
                  A confirmation email with your job posting details has been sent to your registered email address. You can reference this for future updates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-bold mb-2">Live on Job Listings</h3>
                <p className="text-gray-300">
                  Your job posting is now live and visible to all job seekers on our platform. Qualified candidates can apply directly through our system.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Candidates will start applying to your position. We'll notify you of new applications, and you can manage them through our admin dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/job-listings">
                <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                  View Your Job Posting
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-semibold px-8 py-3 text-lg"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactConfirmation() {
  return (
    <div className="w-full">
      <section className="min-h-screen bg-gradient-to-br from-[#0A2540] to-[#0A2540] text-white flex items-center justify-center py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-[#F59E0B] animate-bounce" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Message Sent Successfully!
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            Thank you for contacting Hope Services Centre. We've received your message and will get back to you soon.
          </p>

          <div className="bg-white bg-opacity-10 rounded-lg p-8 mb-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-bold mb-2">We'll Be in Touch</h3>
                <p className="text-gray-300">
                  Our team typically responds to messages within 24 hours during business days (Monday - Friday, 9:00 AM - 5:00 PM). Check your email for our response.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              In the meantime, feel free to explore our services or contact us directly via phone or WhatsApp for urgent matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/233243105412"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#25D366] hover:bg-[#1FAE5D] text-white font-semibold px-8 py-3 text-lg">
                  Chat on WhatsApp
                </Button>
              </a>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-semibold px-8 py-3 text-lg"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
