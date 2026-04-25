import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

/**
 * Contact Page
 * Design: Contact form with company information and maps
 * Integrates FormSubmit.co for automatic email sending
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      submitData.append("_subject", `New Contact Message from ${formData.name}`);
      submitData.append("_captcha", "false");
      submitData.append("_next", `${window.location.origin}/contact-confirmation`);

      const response = await fetch(
        "https://formsubmit.co/hope.services@ymail.com",
        {
          method: "POST",
          body: submitData,
        }
      );

      if (response.ok) {
        const messages = JSON.parse(
          localStorage.getItem("contactMessages") || "[]"
        );
        messages.push({
          id: Date.now(),
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("contactMessages", JSON.stringify(messages));

        toast.success(
          "Message sent successfully! Check your email for confirmation."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with your recruitment
            and career needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Phone 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">Phone</h3>
              <div className="space-y-2">
                <a
                  href="tel:+233372026054"
                  className="text-gray-700 hover:text-[#F59E0B] transition-colors block"
                >
                  +233 3720 26054
                </a>
                <a
                  href="tel:+233243105412"
                  className="text-gray-700 hover:text-[#F59E0B] transition-colors block"
                >
                  +233 243 105 412
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">Email</h3>
              <a
                href="mailto:hope.services@ymail.com"
                className="text-gray-700 hover:text-[#F59E0B] transition-colors"
              >
                hope.services@ymail.com
              </a>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                Location
              </h3>
              <p className="text-gray-700">
                P.O. Box 1438, 3rd Floor GCB Bank, Tamale Main
              </p>
            </div>

            {/* Digital Address */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                Digital Address
              </h3>
              <p className="text-gray-700">NT-0003-5187</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A2540] mb-8">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold py-3 text-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Map & Quick Contact */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7589346199935!2d-0.6031!3d9.2739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd4b8e8e8e8e8e8d%3A0x8e8e8e8e8e8e8e8e!2sGCB%20Bank%2C%20Tamale!5e0!3m2!1sen!2sgh!4v1234567890"
                />
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-[#0A2540] mb-6">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+233243105412"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-[#F59E0B] hover:text-white transition-colors group"
                  >
                    <Phone className="w-6 h-6 text-[#F59E0B] group-hover:text-white" />
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-sm">+233 243 105 412</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/233243105412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-[#25D366] hover:text-white transition-colors group"
                  >
                    <svg
                      className="w-6 h-6 text-[#25D366] group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.022 1.022-1.756 2.119-2.259 3.357-.506 1.238-.749 2.565-.949 4.255-.2 1.69.016 3.386.25 5.05.234 1.664.703 3.27 1.408 4.744.705 1.475 1.635 2.77 2.789 3.924 1.154 1.154 2.449 2.084 3.924 2.789 1.475.705 3.08 1.174 4.744 1.408 1.664.234 3.36.45 5.05.25 1.69-.2 3.017-.443 4.255-.949 1.238-.503 2.335-1.236 3.356-2.259 1.022-1.022 1.756-2.119 2.259-3.357.506-1.238.749-2.565.949-4.255.2-1.69-.016-3.386-.25-5.05-.234-1.664-.703-3.27-1.408-4.744-.705-1.475-1.635-2.77-2.789-3.924-1.154-1.154-2.449-2.084-3.924-2.789-1.475-.705-3.08-1.174-4.744-1.408-1.664-.234-3.36-.45-5.05-.25z" />
                    </svg>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm">Chat with us</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hope.services@ymail.com"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-[#F59E0B] hover:text-white transition-colors group"
                  >
                    <Mail className="w-6 h-6 text-[#F59E0B] group-hover:text-white" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm">hope.services@ymail.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-12">
            Business Hours
          </h2>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Monday - Friday
                </h3>
                <p className="text-gray-700 text-lg">9:00 AM - 5:00 PM</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                  Saturday - Sunday
                </h3>
                <p className="text-gray-700 text-lg">Closed</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-6 pt-6 border-t border-gray-200">
              We respond to emails and messages within 24 hours during business
              days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
