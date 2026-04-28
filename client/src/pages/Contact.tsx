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
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.001.332.005c.109.004.253-.041.397.301.144.344.491 1.199.534 1.286.044.087.073.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.101-.177.211-.077.383.101.173.446.735.956 1.19.658.587 1.212.769 1.385.855.173.087.275.072.376-.043.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964 1-3.607c-.61-1.062-.932-2.269-.932-3.504 0-3.759 3.057-6.816 6.817-6.816 3.76 0 6.817 3.057 6.817 6.816s-3.057 6.816-6.817 6.816z" />
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
