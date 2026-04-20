import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import jobsData from '../../Data/Data.json'
import { JobDetail, Navbar } from '../components';
import { JobCard } from '../components/JobCard';


export const Dashboard = () => {
    const [selectedJob, setSelectedJob] = useState(jobsData[0]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const filteredJobs = useMemo(() => {
        return jobsData.filter(job =>
            job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase()) &&
            job.company.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
    }, [searchTitle, searchLocation]);

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
            <Navbar />

            {/* Unified Search Section from Wireframe */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0">

                    {/* Job Title Segment */}
                    <div className="flex-1 flex items-center px-4 group">
                        <Search className="text-gray-400 mr-3 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search Job Title"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="w-full py-4 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-400"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-10 bg-gray-200" />

                    {/* Location Segment */}
                    <div className="flex-1 flex items-center px-4 group">
                        <MapPin className="text-gray-400 mr-3 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Location"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="w-full py-4 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-400"
                        />
                    </div>

                    {/* Search Button */}
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-md shadow-emerald-100 md:ml-2">
                        Search
                    </button>
                </div>
            </div>

            {/* Split Content Layout */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Recommended Jobs Sidebar */}
                    <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                        <div className="flex justify-between items-center mb-6 px-1">
                            <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                {filteredJobs.length} Results
                            </span>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                            {currentJobs.length > 0 ? (
                                currentJobs.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        job={job}
                                        isSelected={selectedJob?.jobId === job.jobId}
                                        onClick={() => setSelectedJob(job)}
                                    />
                                ))
                            ) : (
                                <div className="py-12 text-center text-gray-400">
                                    No jobs found matching your criteria.
                                </div>
                            )}
                        </div>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                        <button
                                            key={num}
                                            onClick={() => setCurrentPage(num)}
                                            className={`w-8 h-8 rounded-lg text-sm font-bold transition ${currentPage === num ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Job Details Main View */}
                    <div className="lg:col-span-8 min-h-[700px]">
                        <JobDetail job={selectedJob} />
                    </div>

                </div>
            </div>
        </div>
    );
}