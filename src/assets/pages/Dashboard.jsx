import React, { useState, useMemo, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import jobsData from "../../Data/Data.json";
import { Navbar } from "../components";
import { JobCard } from "../components/JobCard";
import { JobDetail } from "../components/JobDetail";
import { useDebounce } from "../hooks/useDebounce";

export const Dashboard = () => {
    const [selectedJob, setSelectedJob] = useState(jobsData[0]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 8;

    const debouncedTitle = useDebounce(searchTitle);
    const debouncedLocation = useDebounce(searchLocation);

    const filteredJobs = useMemo(() => {
        return jobsData.filter((job) =>
            job.jobTitle.toLowerCase().includes(debouncedTitle.toLowerCase()) &&
            job.company.location.toLowerCase().includes(debouncedLocation.toLowerCase())
        );
    }, [debouncedTitle, debouncedLocation]);

    useEffect(() => {
        setIsLoading(true);
        const t = setTimeout(() => setIsLoading(false), 250);
        return () => clearTimeout(t);
    }, [debouncedTitle, debouncedLocation]);

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

            {/* SEARCH */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-2 flex flex-col md:flex-row items-stretch gap-2 shadow-sm">

                    {/* Title */}
                    <div className="flex-1 flex items-center px-4">
                        <Search className="text-gray-400 mr-3" size={18} />
                        <input
                            placeholder="Search job title..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="w-full py-3 bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                    </div>

                    <div className="hidden md:block w-px bg-gray-200" />

                    {/* Location */}
                    <div className="flex-1 flex items-center px-4">
                        <MapPin className="text-gray-400 mr-3" size={18} />
                        <input
                            placeholder="Location..."
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="w-full py-3 bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                    </div>

                    <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition">
                        Search
                    </button>
                </div>
            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* SIDEBAR */}
                    <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 h-fit">

                        {/* header */}
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold">Recommended Jobs</h2>
                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                {filteredJobs.length}
                            </span>
                        </div>

                        {/* list */}
                        <div className="space-y-3">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-16 bg-gray-100 animate-pulse rounded-xl"
                                    />
                                ))
                            ) : currentJobs.length ? (
                                currentJobs.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        job={job}
                                        isSelected={selectedJob?.jobId === job.jobId}
                                        onClick={() => setSelectedJob(job)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-400 text-sm">
                                    No jobs found
                                </div>
                            )}
                        </div>

                        {/* pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 text-sm rounded-lg ${currentPage === i + 1
                                                ? "bg-gray-900 text-white"
                                                : "hover:bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* DETAILS */}
                    <div className="lg:col-span-8">
                        <JobDetail job={selectedJob} />
                    </div>
                </div>
            </div>
        </div>
    );
};