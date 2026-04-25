import { useState, useEffect } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Mail, Phone, Send, LogOut } from "lucide-react";
import { toast } from "sonner";

/**
 * AdminDashboard Page
 * Design: Dashboard to view and manage submissions with email/WhatsApp notifications
 * Protected by admin authentication
 */
export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("applications");
  const [jobSeekerRegs, setJobSeekerRegs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [employerSubmissions, setEmployerSubmissions] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin-login");
      return;
    }
    loadData();
  }, [isAuthenticated, setLocation]);

  const loadData = () => {
    const jobSeekers = JSON.parse(
      localStorage.getItem("jobSeekerRegistrations") || "[]"
    );
    const apps = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    const employers = JSON.parse(
      localStorage.getItem("employerSubmissions") || "[]"
    );

    setJobSeekerRegs(jobSeekers);
    setApplications(apps);
    setContactMessages(messages);
    setEmployerSubmissions(employers);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setLocation("/");
  };

  const deleteItem = (type: string, id: number) => {
    if (type === "jobSeekers") {
      const updated = jobSeekerRegs.filter((item) => item.id !== id);
      setJobSeekerRegs(updated);
      localStorage.setItem("jobSeekerRegistrations", JSON.stringify(updated));
    } else if (type === "applications") {
      const updated = applications.filter((app) => app.id !== id);
      setApplications(updated);
      localStorage.setItem("jobApplications", JSON.stringify(updated));
    } else if (type === "messages") {
      const updated = contactMessages.filter((msg) => msg.id !== id);
      setContactMessages(updated);
      localStorage.setItem("contactMessages", JSON.stringify(updated));
    } else if (type === "employers") {
      const updated = employerSubmissions.filter((emp) => emp.id !== id);
      setEmployerSubmissions(updated);
      localStorage.setItem("employerSubmissions", JSON.stringify(updated));
    }
    toast.success("Item deleted successfully");
  };

  const sendWhatsAppMessage = (phone: string, name: string, type: string) => {
    let message = "";
    if (type === "jobSeeker") {
      message = `Hi ${name}, Thank you for registering with Hope Services Centre! We have received your profile and will review it shortly. We'll contact you soon with job opportunities. Best regards, Hope Services Centre`;
    } else if (type === "employer") {
      message = `Hi ${name}, Thank you for posting a job with Hope Services Centre! Your job listing is now live and visible to qualified candidates. We'll notify you of new applications. Best regards, Hope Services Centre`;
    } else if (type === "contact") {
      message = `Hi ${name}, Thank you for contacting Hope Services Centre! We have received your message and will get back to you within 24 hours. Best regards, Hope Services Centre`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    toast.success("WhatsApp opened in new window");
  };

  const generateEmailTemplate = (item: any, type: string) => {
    let subject = "";
    let body = "";

    if (type === "jobSeeker") {
      subject = `Application Received - ${item.surname}`;
      body = `Dear ${item.surname},\n\nThank you for registering with Hope Services Centre. We have received your profile and CV.\n\nYour Details:\n- Job Title: ${item.jobTitle}\n- Email: ${item.email}\n- Phone: ${item.telephone}\n\nWe will review your profile and contact you soon with suitable job opportunities.\n\nBest regards,\nHope Services Centre Team`;
    } else if (type === "employer") {
      subject = `Job Posted Successfully - ${item.positionRequired}`;
      body = `Dear ${item.contactPerson},\n\nYour job posting has been successfully posted on Hope Services Centre.\n\nJob Details:\n- Position: ${item.positionRequired}\n- Organization: ${item.organizationName}\n- Contract Type: ${item.contractType}\n\nYour job is now visible to all job seekers on our platform. We'll notify you of new applications.\n\nBest regards,\nHope Services Centre Team`;
    } else if (type === "contact") {
      subject = `Message Received - ${item.subject}`;
      body = `Dear ${item.name},\n\nThank you for contacting Hope Services Centre. We have received your message:\n\n"${item.message}"\n\nWe will review your inquiry and get back to you within 24 hours.\n\nBest regards,\nHope Services Centre Team`;
    }

    return { subject, body };
  };

  const copyEmailTemplate = (item: any, type: string) => {
    const { subject, body } = generateEmailTemplate(item, type);
    const emailText = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(emailText);
    toast.success("Email template copied to clipboard");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0A2540] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === "applications"
                  ? "border-[#F59E0B] text-[#F59E0B]"
                  : "border-transparent text-gray-600 hover:text-[#0A2540]"
              }`}
            >
              Job Seeker Registrations ({jobSeekerRegs.length})
            </button>
            <button
              onClick={() => setActiveTab("employers")}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === "employers"
                  ? "border-[#F59E0B] text-[#F59E0B]"
                  : "border-transparent text-gray-600 hover:text-[#0A2540]"
              }`}
            >
              Employer Submissions ({employerSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === "messages"
                  ? "border-[#F59E0B] text-[#F59E0B]"
                  : "border-transparent text-gray-600 hover:text-[#0A2540]"
              }`}
            >
              Contact Messages ({contactMessages.length})
            </button>
          </div>

          {/* Job Seeker Registrations */}
          {activeTab === "applications" && (
            <div className="space-y-4">
              {jobSeekerRegs.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No job seeker registrations yet
                </p>
              ) : (
                jobSeekerRegs.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A2540]">
                          {reg.surname} {reg.otherNames}
                        </h3>
                        <p className="text-gray-600">{reg.jobTitle}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(reg.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(reg);
                            setShowEmailModal(true);
                          }}
                          className="p-2 text-[#F59E0B] hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            sendWhatsAppMessage(
                              reg.telephone,
                              reg.surname,
                              "jobSeeker"
                            )
                          }
                          className="p-2 text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Send WhatsApp"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            copyEmailTemplate(reg, "jobSeeker")
                          }
                          className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copy Email Template"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            deleteItem("jobSeekers", reg.id)
                          }
                          className="p-2 text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-semibold text-[#0A2540]">{reg.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <p className="font-semibold text-[#0A2540]">{reg.telephone}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-semibold text-[#0A2540]">
                          {reg.residentialLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">CV</p>
                        <p className="font-semibold text-[#0A2540]">
                          {reg.cvFileName || "No CV"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Employer Submissions */}
          {activeTab === "employers" && (
            <div className="space-y-4">
              {employerSubmissions.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No employer submissions yet
                </p>
              ) : (
                employerSubmissions.map((emp) => (
                  <div
                    key={emp.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A2540]">
                          {emp.positionRequired}
                        </h3>
                        <p className="text-gray-600">{emp.organizationName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(emp.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(emp);
                            setShowEmailModal(true);
                          }}
                          className="p-2 text-[#F59E0B] hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            sendWhatsAppMessage(
                              emp.telephone,
                              emp.contactPerson,
                              "employer"
                            )
                          }
                          className="p-2 text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Send WhatsApp"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            copyEmailTemplate(emp, "employer")
                          }
                          className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copy Email Template"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            deleteItem("employers", emp.id)
                          }
                          className="p-2 text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Contact</p>
                        <p className="font-semibold text-[#0A2540]">
                          {emp.contactPerson}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-semibold text-[#0A2540]">{emp.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <p className="font-semibold text-[#0A2540]">
                          {emp.telephone}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Contract Type</p>
                        <p className="font-semibold text-[#0A2540]">
                          {emp.contractType}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Contact Messages */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              {contactMessages.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No contact messages yet
                </p>
              ) : (
                contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A2540]">
                          {msg.name}
                        </h3>
                        <p className="text-gray-600">{msg.subject}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(msg.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(msg);
                            setShowEmailModal(true);
                          }}
                          className="p-2 text-[#F59E0B] hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            copyEmailTemplate(msg, "contact")
                          }
                          className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copy Email Template"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            deleteItem("messages", msg.id)
                          }
                          className="p-2 text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-semibold text-[#0A2540]">{msg.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Message</p>
                        <p className="font-semibold text-[#0A2540] line-clamp-2">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
