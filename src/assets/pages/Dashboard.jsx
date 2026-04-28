import { useState, useEffect } from "react";
import { Navbar } from "../components";
import { JobDetail } from "../components/JobDetail";
import { SearchBar, JobList, Pagination } from "../components/dashboard";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import jobsData from "../../Data/Data.json";
import { useSearch, usePagination } from "../hooks";

export const Dashboard = () => {
    const { userData } = useAuth();
    if (!userData) return <div>Loading...</div>;
    if (userData.role === "employer") return <Navigate to="/employerDashboard" />;

    const { searchTitle, setSearchTitle, searchLocation, setSearchLocation, filteredJobs } =
        useSearch(jobsData);
    const { currentPage, changePage, totalPages, currentItems } = usePagination(filteredJobs);

    const [selectedJob, setSelectedJob] = useState(currentItems[0] || null);
    const [isLoading, setIsLoading] = useState(false);

    // Set first job whenever currentItems changes (pagination or search)
    useEffect(() => {
        setSelectedJob(currentItems[0] || null);
    }, [currentItems]);

    // Show skeleton on search changes
    useEffect(() => {
        setIsLoading(true);
        const t = setTimeout(() => setIsLoading(false), 250);
        return () => clearTimeout(t);
    }, [searchTitle, searchLocation]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />
            <SearchBar
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
            />

            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 h-fit">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold">Recommended Jobs</h2>
                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                {filteredJobs.length}
                            </span>
                        </div>

                        <JobList
                            jobs={currentItems}
                            isLoading={isLoading}
                            selectedJob={selectedJob}
                            setSelectedJob={setSelectedJob}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            changePage={changePage}
                        />
                    </div>

                    <div className="lg:col-span-8">
                        <JobDetail job={selectedJob} />
                    </div>
                </div>
            </div>
        </div>
    );
};