import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, DollarSign, Clock, ArrowLeft } from "lucide-react";
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
    "1": {
      title: "Marketing Manager",
      company: "Tech Solutions Ghana",
      location: "Accra",
      salary: "GHS 3,000 - 4,500",
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
      salary: "GHS 2,500 - 3,800",
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
      salary: "GHS 2,000 - 3,000",
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
    "4": {
      title: "Sales Executive",
      company: "Business Ventures Ltd",
      location: "Accra",
      salary: "GHS 1,800 - 2,800",
      type: "Full-time",
      posted: "3 days ago",
      description:
        "Dynamic Sales Executive needed to drive sales growth and client relationships.",
      fullDescription: `Business Ventures Ltd is looking for a motivated Sales Executive to expand our client base.

Key Responsibilities:
- Identify and pursue new business opportunities
- Build and maintain client relationships
- Prepare sales proposals and presentations
- Meet sales targets and quotas
- Provide excellent customer service
- Report on sales activities and forecasts

Requirements:
- Bachelor's degree in Business or related field
- 2+ years of sales experience
- Strong communication and negotiation skills
- Ability to work independently and in teams
- Customer-focused mindset
- Proficiency in CRM tools`,
    },
    "5": {
      title: "Financial Analyst",
      company: "Finance Group Ghana",
      location: "Accra",
      salary: "GHS 2,800 - 4,000",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "Analyze financial data and provide insights to support business decisions.",
      fullDescription: `Finance Group Ghana seeks a Financial Analyst to support our finance team.

Key Responsibilities:
- Analyze financial statements and data
- Prepare financial reports and forecasts
- Identify financial trends and opportunities
- Support budgeting and planning processes
- Conduct financial modeling and analysis
- Present findings to management

Requirements:
- Bachelor's degree in Finance, Accounting, or related field
- 2+ years of financial analysis experience
- Proficiency in Excel and financial software
- Strong analytical and mathematical skills
- Knowledge of accounting principles
- Attention to detail`,
    },
    "6": {
      title: "Customer Service Officer",
      company: "Service Excellence Ltd",
      location: "Multiple",
      salary: "GHS 1,500 - 2,200",
      type: "Full-time",
      posted: "4 days ago",
      description:
        "Provide excellent customer support and handle client inquiries professionally.",
      fullDescription: `Service Excellence Ltd is hiring Customer Service Officers for multiple locations.

Key Responsibilities:
- Handle customer inquiries via phone, email, and chat
- Resolve customer issues and complaints
- Provide product information and support
- Maintain customer records and documentation
- Follow up on customer satisfaction
- Meet service quality standards

Requirements:
- High school diploma or equivalent
- 1+ years of customer service experience
- Excellent communication skills
- Patient and empathetic approach
- Ability to multitask
- Proficiency in customer service software`,
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
                    <DollarSign className="w-4 h-4" />
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
                <div className="text-gray-700 whitespace-pre-line">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
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
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+233 XXX XXX XXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload CV
                    </label>
                    <input
                      type="file"
                      name="cvFile"
                      onChange={handleInputChange}
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, or DOCX (optional)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold py-3 mt-6"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Questions? Contact us:
                  </p>
                  <a
                    href="https://wa.me/233243105412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-[#25D366] hover:bg-[#1a9e4a] text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Chat on WhatsApp
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
