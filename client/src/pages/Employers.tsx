import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Briefcase, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";

/**
 * Employers Page
 * Design: Information for employers with comprehensive job posting form
 * Integrates FormSubmit.co for automatic email sending
 */
export default function Employers() {
  const [formData, setFormData] = useState({
    organizationName: "",
    typeOfBusiness: "",
    contactPerson: "",
    telephone: "",
    email: "",
    positionRequired: "",
    preferredQualifications: "",
    jobDescription: "",
    skillsExperience: "",
    preferredAge: "",
    genderPreference: "",
    conditionsOfService: "",
    remuneration: "",
    contractType: "",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.organizationName ||
      !formData.email ||
      !formData.positionRequired ||
      !formData.jobDescription
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for submission
      const submitData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Add metadata for FormSubmit.co
      submitData.append(
        "_subject",
        `New Job Posting: ${formData.positionRequired} - ${formData.organizationName}`
      );
      submitData.append("_captcha", "false");
      submitData.append("_next", `${window.location.origin}/employer-confirmation`);

      // Submit to FormSubmit.co
      const response = await fetch("https://formsubmit.co/hope.services@ymail.com", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        // Also save to localStorage for public job listings
        const submissions = JSON.parse(
          localStorage.getItem("employerSubmissions") || "[]"
        );
        submissions.push({
          id: Date.now(),
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("employerSubmissions", JSON.stringify(submissions));

        toast.success(
          "Job posting submitted successfully! Check your email for confirmation."
        );
        setFormData({
          organizationName: "",
          typeOfBusiness: "",
          contactPerson: "",
          telephone: "",
          email: "",
          positionRequired: "",
          preferredQualifications: "",
          jobDescription: "",
          skillsExperience: "",
          preferredAge: "",
          genderPreference: "",
          conditionsOfService: "",
          remuneration: "",
          contractType: "",
          startDate: "",
        });
      } else {
        toast.error("Failed to submit job posting. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            For Employers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the right talent for your organization. Post your job openings
            and connect with qualified candidates.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-16">
            Why Partner With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Access to Talent Pool
              </h3>
              <p className="text-gray-700">
                Connect with pre-screened, qualified professionals actively
                seeking employment opportunities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Faster Hiring
              </h3>
              <p className="text-gray-700">
                Reduce time-to-hire and recruitment costs with our efficient
                matching process.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Professional Support
              </h3>
              <p className="text-gray-700">
                Get expert guidance throughout the recruitment process from our
                experienced team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Posting Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-12">
            Post a Job Opening
          </h2>

          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Info */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Organization Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="Your organization name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Business
                    </label>
                    <input
                      type="text"
                      name="typeOfBusiness"
                      value={formData.typeOfBusiness}
                      onChange={handleInputChange}
                      placeholder="e.g., Manufacturing, Services, Technology"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      placeholder="+233 XXX XXX XXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Job Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position Required *
                    </label>
                    <input
                      type="text"
                      name="positionRequired"
                      value={formData.positionRequired}
                      onChange={handleInputChange}
                      placeholder="e.g., Marketing Manager"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Describe the job role and responsibilities"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Qualifications
                    </label>
                    <textarea
                      name="preferredQualifications"
                      value={formData.preferredQualifications}
                      onChange={handleInputChange}
                      placeholder="List required qualifications and experience"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills & Experience Required
                    </label>
                    <textarea
                      name="skillsExperience"
                      value={formData.skillsExperience}
                      onChange={handleInputChange}
                      placeholder="Describe required skills and experience"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Candidate Preferences */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Candidate Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Age Range
                    </label>
                    <input
                      type="text"
                      name="preferredAge"
                      value={formData.preferredAge}
                      onChange={handleInputChange}
                      placeholder="e.g., 25-40 years"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender Preference
                    </label>
                    <select
                      name="genderPreference"
                      value={formData.genderPreference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    >
                      <option value="">No Preference</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Conditions & Remuneration */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Conditions & Remuneration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conditions of Service
                    </label>
                    <textarea
                      name="conditionsOfService"
                      value={formData.conditionsOfService}
                      onChange={handleInputChange}
                      placeholder="Describe working conditions, benefits, etc."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remuneration (Salary & Benefits)
                    </label>
                    <input
                      type="text"
                      name="remuneration"
                      value={formData.remuneration}
                      onChange={handleInputChange}
                      placeholder="e.g., GHS 3,000 - 4,500 plus benefits"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contract Type
                      </label>
                      <select
                        name="contractType"
                        value={formData.contractType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      >
                        <option value="">Select Contract Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold py-3 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Post Job Opening"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need More Information?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss your recruitment needs or for custom solutions.
          </p>
          <a
            href="https://wa.me/233243105412"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
              Contact Us
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
