import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, Search, Filter } from "lucide-react";
import { Link } from "wouter";

/**
 * JobListings Page
 * Design: Public page displaying all employer job postings
 */
export default function JobListings() {
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContractType, setSelectedContractType] = useState("All");
  const [selectedOrganization, setSelectedOrganization] = useState("All");

  useEffect(() => {
    loadJobPostings();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobPostings, searchTerm, selectedContractType, selectedOrganization]);

  const loadJobPostings = () => {
    const employerPostings = JSON.parse(
      localStorage.getItem("employerSubmissions") || "[]"
    );
    const adminPostings = JSON.parse(
      localStorage.getItem("adminJobs") || "[]"
    );
    
    // Combine both sources, ensuring admin jobs and newer jobs appear first
    // Both sources use 'submittedAt' for timestamp
    const combinedPostings = [...adminPostings, ...employerPostings].sort((a, b) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });

    setJobPostings(combinedPostings);
  };

  const filterJobs = () => {
    let filtered = jobPostings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.positionRequired
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job.organizationName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job.jobDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by contract type
    if (selectedContractType !== "All") {
      filtered = filtered.filter(
        (job) => job.contractType === selectedContractType
      );
    }

    // Filter by organization
    if (selectedOrganization !== "All") {
      filtered = filtered.filter(
        (job) => job.organizationName === selectedOrganization
      );
    }

    setFilteredJobs(filtered);
  };

  const organizations = [
    "All",
    ...Array.from(new Set(jobPostings.map((job) => job.organizationName))),
  ];

  const contractTypes = [
    "All",
    ...Array.from(new Set(jobPostings.map((job) => job.contractType).filter(Boolean))),
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Listings</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Browse all available job opportunities from our partner employers
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title, company, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Contract Type
                </label>
                <select
                  value={selectedContractType}
                  onChange={(e) => setSelectedContractType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                >
                  {contractTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Organization
                </label>
                <select
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                >
                  {organizations.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredJobs.length}</span>{" "}
              job{filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 border-l-4 border-[#F59E0B]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Job Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#F59E0B] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-[#0A2540]">
                            {job.positionRequired}
                          </h3>
                          <p className="text-lg text-gray-600">
                            {job.organizationName}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {job.jobDescription}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        {job.contractType && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-[#F59E0B]" />
                            <span>{job.contractType}</span>
                          </div>
                        )}
                        {job.remuneration && (
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-[#0A2540]">
                              {job.remuneration}
                            </span>
                          </div>
                        )}
                        {job.startDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-[#F59E0B]" />
                            <span>Start: {job.startDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Quick Details */}
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        {job.preferredAge && (
                          <div>
                            <p className="text-gray-600">Age Range</p>
                            <p className="font-semibold text-[#0A2540]">
                              {job.preferredAge}
                            </p>
                          </div>
                        )}
                        {job.genderPreference && (
                          <div>
                            <p className="text-gray-600">Gender</p>
                            <p className="font-semibold text-[#0A2540]">
                              {job.genderPreference}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-gray-600 uppercase mb-1">
                            Contact
                          </p>
                          {job.contactPerson && (
                            <p className="text-sm font-semibold text-[#0A2540]">
                              {job.contactPerson}
                            </p>
                          )}
                          {job.email && (
                            <a
                              href={`mailto:${job.email}`}
                              className="text-sm text-[#F59E0B] hover:underline break-all"
                            >
                              {job.email}
                            </a>
                          )}
                          {job.telephone && (
                            <a
                              href={`tel:${job.telephone}`}
                              className="text-sm text-[#F59E0B] hover:underline block"
                            >
                              {job.telephone}
                            </a>
                          )}
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-600 uppercase mb-2">
                            Posted
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(job.submittedAt).toLocaleDateString()}
                          </p>
                        </div>

                        <Link href="/job-seekers">
                          <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold">
                            Apply Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Full Description (Expandable) */}
                  <details className="mt-6 pt-6 border-t border-gray-200 group">
                    <summary className="cursor-pointer font-bold text-[#0A2540] hover:text-[#F59E0B] flex items-center gap-2 list-none">
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                      View Full Job Details
                    </summary>
                    <div className="mt-4 space-y-6 text-sm text-gray-700 bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-bold text-[#0A2540] text-base mb-2 border-b border-gray-200 pb-1">
                          Job Description
                        </p>
                        <p className="whitespace-pre-wrap leading-relaxed">{job.jobDescription}</p>
                      </div>
                      
                      {job.preferredQualifications && (
                        <div>
                          <p className="font-bold text-[#0A2540] text-base mb-2 border-b border-gray-200 pb-1">
                            Qualifications
                          </p>
                          <p className="whitespace-pre-wrap leading-relaxed">{job.preferredQualifications}</p>
                        </div>
                      )}
                      
                      {job.skillsExperience && (
                        <div>
                          <p className="font-bold text-[#0A2540] text-base mb-2 border-b border-gray-200 pb-1">
                            Skills & Experience
                          </p>
                          <p className="whitespace-pre-wrap leading-relaxed">{job.skillsExperience}</p>
                        </div>
                      )}
                      
                      {job.conditionsOfService && (
                        <div>
                          <p className="font-bold text-[#0A2540] text-base mb-2 border-b border-gray-200 pb-1">
                            Conditions of Service
                          </p>
                          <p className="whitespace-pre-wrap leading-relaxed">{job.conditionsOfService}</p>
                        </div>
                      )}

                      {job.location && (
                        <div>
                          <p className="font-bold text-[#0A2540] text-base mb-2 border-b border-gray-200 pb-1">
                            Location
                          </p>
                          <p>{job.location}</p>
                        </div>
                      )}

                      {job.deadline && (
                        <div>
                          <p className="font-bold text-[#0A2540] text-base mb-2 border-b border-gray-200 pb-1">
                            Application Deadline
                          </p>
                          <p className="text-red-600 font-semibold">{job.deadline}</p>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Register your profile and apply to your dream job today.
          </p>
          <Link href="/job-seekers">
            <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold px-8 py-3 text-lg">
              Register as Job Seeker
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
