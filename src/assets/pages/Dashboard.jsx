import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { JobCard } from "../components/JobCard";
import { JobDetail } from "../components";
import jobsData from "../../Data/Data.json";

export const Dashboard = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    // Slice jobs for current page
    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = jobsData.slice(startIndex, startIndex + jobsPerPage);

    const totalPages = Math.ceil(jobsData.length / jobsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

            {/* Navbar */}
            <Navbar />

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-4">

                    {/* Job Title Search */}
                    <input
                        type="text"
                        placeholder="Search Job Title..."
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-red-500 outline-none 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />

                    {/* Location Search */}
                    <input
                        type="text"
                        placeholder="Location..."
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-red-500 outline-none 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />

                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT: Job List */}
                    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Recommended Jobs
                        </h2>

                        {/* Job Cards */}
                        <div className="space-y-4">
                            {currentJobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onClick={() => setSelectedJob(job)}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-4 space-x-2 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 cursor-pointer"
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-lg cursor-pointer ${currentPage === i + 1
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 cursor-pointer"
                            >
                                Next
                            </button>
                        </div>

                    </div>

                    {/* RIGHT: Job Detail */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">

                        {selectedJob ? (
                            <JobDetail job={selectedJob} />
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                Click a job to view details
                            </div>
                        )}

                    </div>

                </div>
            </div>

        </div>
    );
};