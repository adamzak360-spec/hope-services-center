import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

/**
 * JobDetails Page
 * Design: Detailed job information with application form
 */
export default function JobDetails() {
  const [match, params] = useRoute("/jobs/:id");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvFile: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!match) return null;

  const jobId = params?.id;

  const jobsData: Record<string, any> = {
    "driver": {
      title: "Drivers",
      company: "Hope Services Recruitment Limited",
      location: "Tamale",
      salary: "Very Attractive",
      type: "Full-time",
      posted: "Just now",
      description: "Reliable Drivers needed to operate buses for a logistic business. Responsible for safe transportation of staff/clients.",
      fullDescription: `Our client in a logistic business seeks reliable Drivers to operate buses. Responsible for safe transportation of staff/clients.

Duties:
- Drive vehicles safely and maintain vehicle cleanliness
- Manage schedules and routes
- Report issues promptly

Requirements:
- Valid Ghanaian driver's license (category D)
- Should be able to read and write reports
- 2+ years' experience driving buses/minibuses
- Familiar with Ghanaian roads
- Basic mechanic skills a plus

What we offer:
- Competitive salary
- Benefits package

How to Apply:
Send your CV to WhatsApp 0243105412 or 0539090594
Or Email to: dellor206@gmail.com, hope.services@ymail.com
Only shortlisted candidates will be contacted.`,
    },
    "domestic-worker": {
      title: "Domestic Workers",
      company: "Hope Services Recruitment Limited",
      location: "Tamale",
      salary: "Competitive",
      type: "Full-time",
      posted: "Just now",
      description: "Domestic workers needed to manage day-to-day activities in the home.",
      fullDescription: `Our clients are in need of domestic workers to manage the day-to-day activities in the home.

Requirements:
- Should be able to read and write
- Caring
- Smart and good looking
- SHS graduate
- Age 18-23

Duties:
- Cleaning and cooking
- Laundry and childcare
- Shopping, and any other household work

How to Apply:
Send your CV to WhatsApp 0243105412 or 0539090594
Or Email to: dellor206@gmail.com, hope.services@ymail.com
Only shortlisted candidates will be contacted.`,
    },
    "teachers": {
      title: "Teachers (Pre-school & Basic School)",
      company: "Hope Services Recruitment Limited",
      location: "Kalpohini Yapalsi - Tamale",
      salary: "Competitive",
      type: "Full-time",
      posted: "Just now",
      description: "Openings for Pre-school and Basic School Teachers in Tamale.",
      fullDescription: `We are hiring Teachers for the following positions:
- Pre-school Teachers
- Basic School Teachers

Requirement:
- Diploma in Basic Education
- Secondary School Graduate

Location: Kalpohini Yapalsi - Tamale

How to Apply:
Send your CV to WhatsApp 0243105412 or 0539090594
Or Email to: dellor206@gmail.com, hope.services@ymail.com
Only shortlisted candidates will be contacted.`,
    },
    "1": {
      title: "Marketing Manager",
      company: "Tech Solutions Ghana",
      location: "Accra",
      salary: "GHC 3,000 - 4,500",
      type: "Full-time",
      posted: "2 days ago",
      description:
        "We are looking for an experienced Marketing Manager to lead our marketing initiatives.",
      fullDescription: `We are seeking a dynamic and experienced Marketing Manager to join our team at Tech Solutions Ghana. This is an excellent opportunity to lead our marketing efforts and drive business growth.

Key Responsibilities:
- Develop and execute marketing strategies
- Manage marketing campaigns across multiple channels
- Lead and mentor the marketing team
- Analyze market trends and competitor activities
- Prepare marketing reports and presentations
- Manage marketing budget and ROI

Requirements:
- Bachelor's degree in Marketing or related field
- 5+ years of marketing experience
- Strong leadership and communication skills
- Experience with digital marketing
- Proficiency in marketing tools and analytics`,
    },
    "2": {
      title: "Software Developer",
      company: "Digital Innovations Ltd",
      location: "Kumasi",
      salary: "GHC 2,500 - 3,800",
      type: "Full-time",
      posted: "5 days ago",
      description:
        "Join our development team as a Software Developer with expertise in web technologies.",
      fullDescription: `Digital Innovations Ltd is looking for a talented Software Developer to join our growing team.

Key Responsibilities:
- Develop and maintain web applications
- Write clean, efficient code
- Collaborate with other developers and designers
- Debug and troubleshoot applications
- Participate in code reviews
- Stay updated with latest technologies

Requirements:
- Bachelor's degree in Computer Science or related field
- 3+ years of development experience
- Proficiency in web technologies (HTML, CSS, JavaScript)
- Experience with React or similar frameworks
- Strong problem-solving skills
- Git and version control experience`,
    },
    "3": {
      title: "HR Specialist",
      company: "Corporate Services Inc",
      location: "Tamale",
      salary: "GHC 2,000 - 3,000",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "We need an HR Specialist to manage recruitment and employee relations.",
      fullDescription: `Corporate Services Inc is seeking an HR Specialist to support our growing organization.

Key Responsibilities:
- Manage recruitment and hiring process
- Handle employee relations and grievances
- Maintain HR records and documentation
- Coordinate training and development programs
- Ensure compliance with labor laws
- Support payroll and benefits administration

Requirements:
- Bachelor's degree in HR or related field
- 3+ years of HR experience
- Knowledge of labor laws and regulations
- Strong communication and interpersonal skills
- Experience with HR systems and tools
- Problem-solving abilities`,
    },
  };

  const job = jobsData[jobId] || jobsData["1"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "cvFile" && files) {
      setFormData((prev) => ({ ...prev, cvFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const applications = JSON.parse(
        localStorage.getItem("jobApplications") || "[]"
      );
      applications.push({
        id: Date.now(),
        jobId,
        jobTitle: job.title,
        ...formData,
        appliedAt: new Date().toISOString(),
      });
      localStorage.setItem("jobApplications", JSON.stringify(applications));

      toast.success("Application submitted successfully!");
      setFormData({ fullName: "", email: "", phone: "", cvFile: null });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0A2540] text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/jobs">
            <a className="inline-flex items-center gap-2 text-[#F59E0B] hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </a>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-300">{job.company}</p>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Job Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-medium">Type</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                    <span className="text-sm font-bold">GHC</span>
                    <span className="text-sm font-medium">Salary</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.salary}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Posted</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.posted}</p>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">
                  About this Job
                </h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.fullDescription}
                </div>
              </div>
            </div>

            {/* Application Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-8 sticky top-24">
                <h3 className="text-xl font-bold text-[#0A2540] mb-6">
                  Apply Now
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload CV (Optional)
                    </label>
                    <input
                      type="file"
                      name="cvFile"
                      onChange={handleInputChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F59E0B]/10 file:text-[#0A2540] hover:file:bg-[#F59E0B]/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold py-3 mt-4"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-4">
                    Or apply directly via WhatsApp:
                  </p>
                  <a
                    href="https://wa.me/233243105412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Apply on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
