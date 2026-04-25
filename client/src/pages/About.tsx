import { CheckCircle } from "lucide-react";

/**
 * About Page
 * Design: Company information with vision, mission, and values
 */
export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn more about Hope Services Centre and our commitment to excellence
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Hope Services Centre is a management consultancy firm established with specialization to provide human resources needs to companies and other customized and innovative consultancy services to address the capacity needs of its clients.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                With over a decade of experience, we have built a pool of professionals dedicated to delivering exceptional results across multiple sectors.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Expertise</h3>
              <ul className="space-y-3">
                {[
                  "Human Resources Management",
                  "Finance & Accounting",
                  "Microfinance Services",
                  "Banking Solutions",
                  "Investment Advisory",
                  "Agricultural Value Chains",
                  "Product Development",
                  "Strategic Business Planning",
                  "Market Research",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-[#F59E0B]">
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the most preferred recruitment and training partner providing customized services in compliance with standards and quality to meet clients' needs.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-[#F59E0B]">
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide clients with unique, innovative, and highly practical consultancy services to empower companies for operational and financial sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-16">
            Our Corporate Values - H.O.P.E
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                letter: "H",
                value: "Honesty",
                description: "We conduct our business with integrity and transparency in all dealings.",
              },
              {
                letter: "O",
                value: "Openness",
                description: "We embrace diverse perspectives and foster open communication with all stakeholders.",
              },
              {
                letter: "P",
                value: "Politeness",
                description: "We treat all individuals with respect, courtesy, and professionalism.",
              },
              {
                letter: "E",
                value: "Endurance",
                description: "We are committed to long-term success and sustainable growth.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">{item.letter}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">
                  {item.value}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Status */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-12">
            Legal Status
          </h2>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <p className="text-gray-700 text-lg">
              Hope Services Centre is a limited liability company registered under the laws of the Republic of Ghana.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-[#F59E0B] pl-4">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Company Registration Number
                </p>
                <p className="text-lg font-bold text-[#0A2540]">CS587942015</p>
              </div>
              <div className="border-l-4 border-[#F59E0B] pl-4">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Tax Identification Number (TIN)
                </p>
                <p className="text-lg font-bold text-[#0A2540]">C0004786467</p>
              </div>
              <div className="border-l-4 border-[#F59E0B] pl-4">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Address
                </p>
                <p className="text-lg font-bold text-[#0A2540]">
                  P.O. Box 1438, 3rd Floor GCB Bank, Tamale Main
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-16">
            Why Choose Hope Services Centre?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Experience",
                description: "Over a decade of proven success in recruitment and consultancy services",
              },
              {
                title: "Expertise",
                description: "Specialized professionals across multiple industries and sectors",
              },
              {
                title: "Quality",
                description: "Commitment to excellence and compliance with international standards",
              },
              {
                title: "Innovation",
                description: "Customized and innovative solutions tailored to client needs",
              },
              {
                title: "Reliability",
                description: "Trusted partner for operational and financial sustainability",
              },
              {
                title: "Support",
                description: "Dedicated team providing comprehensive support throughout engagement",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
