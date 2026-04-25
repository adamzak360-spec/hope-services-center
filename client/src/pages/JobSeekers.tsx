import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Users, TrendingUp, Upload } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { sendNotificationEmail, generateNotificationData } from "@/lib/notificationService";

/**
 * JobSeekers Page
 * Design: Comprehensive registration form for job seekers with CV upload
 */
export default function JobSeekers() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    surname: "",
    otherNames: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    hometown: "",
    ethnicity: "",
    maritalStatus: "",
    religion: "",
    nationality: "",
    residentialLocation: "",
    email: "",
    telephone: "",
    languagesSpoken: "",
    qualifications: "",
    otherSkills: "",
    computerSoftware: "",
    salaryRange: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      setCvFile(file);
      toast.success("CV uploaded successfully");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.surname || !formData.email || !formData.telephone) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Add CV file if uploaded
      if (cvFile) {
        submitData.append("cv_file", cvFile);
      }

      // Add metadata
      submitData.append("_subject", `New Job Seeker Registration: ${formData.surname}`);
      submitData.append("_captcha", "false");
      submitData.append("_next", `${window.location.origin}/job-seeker-confirmation`);

      // Submit to FormSubmit.co
      const response = await fetch("https://formsubmit.co/hope.services@ymail.com", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        // Also save to localStorage for admin dashboard
        const submissions = JSON.parse(
          localStorage.getItem("jobSeekerRegistrations") || "[]"
        );
        submissions.push({
          id: Date.now(),
          ...formData,
          cvFileName: cvFile?.name || "No CV uploaded",
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("jobSeekerRegistrations", JSON.stringify(submissions));

        toast.success(
          "Registration submitted successfully! Check your email for confirmation."
        );
        setFormData({
          jobTitle: "",
          surname: "",
          otherNames: "",
          gender: "",
          dateOfBirth: "",
          age: "",
          hometown: "",
          ethnicity: "",
          maritalStatus: "",
          religion: "",
          nationality: "",
          residentialLocation: "",
          email: "",
          telephone: "",
          languagesSpoken: "",
          qualifications: "",
          otherSkills: "",
          computerSoftware: "",
          salaryRange: "",
        });
        setCvFile(null);
      } else {
        toast.error("Failed to submit registration. Please try again.");
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
            For Job Seekers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Register with us to access exclusive job opportunities and career support
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-16">
            Why Register With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Quality Job Listings
              </h3>
              <p className="text-gray-700">
                Access carefully curated job opportunities from reputable employers across Ghana.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Career Support
              </h3>
              <p className="text-gray-700">
                Get guidance on resume building, interview preparation, and career development strategies.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Skill Development
              </h3>
              <p className="text-gray-700">
                Access professional training programs to enhance your skills and advance your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-12">
            Job Seeker Registration Form
          </h2>

          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Marketing Manager"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surname *
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      placeholder="Your surname"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Names
                    </label>
                    <input
                      type="text"
                      name="otherNames"
                      value={formData.otherNames}
                      onChange={handleInputChange}
                      placeholder="Your other names"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Your age"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Background */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Location & Background
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hometown
                    </label>
                    <input
                      type="text"
                      name="hometown"
                      value={formData.hometown}
                      onChange={handleInputChange}
                      placeholder="Your hometown"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ethnicity
                    </label>
                    <input
                      type="text"
                      name="ethnicity"
                      value={formData.ethnicity}
                      onChange={handleInputChange}
                      placeholder="Your ethnicity"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marital Status
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Religion
                    </label>
                    <input
                      type="text"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      placeholder="Your religion"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="Your nationality"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Residential Location
                    </label>
                    <input
                      type="text"
                      name="residentialLocation"
                      value={formData.residentialLocation}
                      onChange={handleInputChange}
                      placeholder="Where you currently live"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telephone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      placeholder="+233 XXX XXX XXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Qualifications */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Skills & Qualifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages Spoken
                    </label>
                    <textarea
                      name="languagesSpoken"
                      value={formData.languagesSpoken}
                      onChange={handleInputChange}
                      placeholder="e.g., English, Twi, Hausa"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualifications
                    </label>
                    <textarea
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      placeholder="List your educational qualifications and certifications"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Skills
                    </label>
                    <textarea
                      name="otherSkills"
                      value={formData.otherSkills}
                      onChange={handleInputChange}
                      placeholder="List any additional skills you possess"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Computer Software Knowledge
                    </label>
                    <textarea
                      name="computerSoftware"
                      value={formData.computerSoftware}
                      onChange={handleInputChange}
                      placeholder="e.g., MS Office, Adobe, SAP, etc."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      name="salaryRange"
                      value={formData.salaryRange}
                      onChange={handleInputChange}
                      placeholder="e.g., GHS 2,000 - 3,500"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Upload Your CV
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#F59E0B] transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-[#F59E0B] font-semibold hover:underline">
                      Click to upload
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                    <input
                      type="file"
                      onChange={handleCvUpload}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF or Word document (Max 5MB)
                  </p>
                  {cvFile && (
                    <p className="text-sm text-[#F59E0B] font-semibold mt-3">
                      ✓ {cvFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold py-3 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start browsing our job opportunities today and take the next step in
            your career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-semibold px-8 py-3 text-lg"
              >
                Get Career Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
