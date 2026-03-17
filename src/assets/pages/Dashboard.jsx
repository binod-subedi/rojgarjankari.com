import { useState } from 'react';
import { signOutUser } from '../configs/auth'
import JobsData from '../../dummyData.json'
export const Dashboard = () => {

    const [selectedJob, setSelectedJob] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchForm, setSearchForm] = useState({
        job: '',
        location: ''
    });

    const handleSignOut = () => {
        signOutUser();
    }

    const jobs = JobsData;
    // Handle search input changes
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchForm);
    };

    return (
        <div className="min-h-screen bg-gray-50 transition-colors duration-300">
            {/* Navigation Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745" />
                                </svg>
                            </div>
                            <span className="ml-3 text-2xl font-bold text-gray-900">
                                RojgarJankari
                            </span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a className="text-gray-900 font-semibold border-b-2 border-red-600 pb-1">
                                Jobs
                            </a>
                            <a className="text-gray-600 hover:text-red-600 transition">
                                Applied Jobs
                            </a>
                            <a className="text-gray-600 hover:text-red-600 transition">
                                Companies
                            </a>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4">
                            <button className="hidden md:block px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-sm">
                                Sign In
                            </button>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                ☰
                            </button>
                        </div>
                    </div>

                    {/* Mobile */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            <div className="flex flex-col space-y-3">
                                <a className="px-4 py-2 bg-gray-100 rounded-lg font-semibold">
                                    Jobs
                                </a>
                                <a className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                                    Applied Jobs
                                </a>
                                <a className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                                    Companies
                                </a>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">

                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Location..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />

                        <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-sm">
                            Search
                        </button>
                    </form>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Job List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Recommended Jobs
                        </h2>

                        <div className="space-y-4">
                            {jobs.map(job => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`p-5 rounded-xl cursor-pointer border transition
                                ${selectedJob?.id === job.id
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200 bg-white hover:border-red-300'}
                            `}
                                >
                                    <h3 className="font-semibold text-gray-900">
                                        {job.title}
                                    </h3>

                                    <p className="text-sm text-gray-600">
                                        {job.location}
                                    </p>

                                    <p className="text-sm font-medium text-gray-700 mt-1">
                                        {job.salary}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-3">
                        {selectedJob ? (
                            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">

                                <div className="flex justify-between items-start mb-6 border-b pb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {selectedJob.title}
                                        </h2>
                                        <p className="text-gray-600">
                                            {selectedJob.location}
                                        </p>
                                    </div>

                                    <button className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">
                                        Apply
                                    </button>
                                </div>

                                <p className="text-gray-700 mb-6">
                                    {selectedJob.description}
                                </p>

                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Responsibilities
                                </h3>
                                <ul className="list-disc ml-5 text-gray-600 mb-6">
                                    {selectedJob.responsibilities.map((r, i) => (
                                        <li key={i}>{r}</li>
                                    ))}
                                </ul>

                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Requirements
                                </h3>
                                <ul className="list-disc ml-5 text-gray-600">
                                    {selectedJob.requirements.map((r, i) => (
                                        <li key={i}>{r}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500 border">
                                Select a job to view details
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Sign Out */}
            <div className="flex justify-center py-6">
                <button
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-sm"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
        </div>

    );
}