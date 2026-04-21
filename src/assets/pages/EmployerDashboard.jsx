import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Trash2,
    FileText,
    User,
    Search,
    Briefcase,
    Settings,
    LogOut,
    ExternalLink,
    Plus
} from 'lucide-react';

export const EmployerDashboard = () => {
    // Mock Data
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Senior Frontend Developer",
            location: "Sydney, NSW",
            salary: "$140k - $160k",
            applications: 24,
            postedDate: "12/07/2025"
        },
        {
            id: 2,
            title: "UX/UI Designer",
            location: "Remote",
            salary: "$110k - $130k",
            applications: 18,
            postedDate: "15/07/2025"
        },
        {
            id: 3,
            title: "Product Manager",
            location: "Melbourne, VIC",
            salary: "Competitive",
            applications: 42,
            postedDate: "10/07/2025"
        }
    ]);

    const [applicants, setApplicants] = useState([
        {
            id: "APP-001",
            name: "Binod Subedi",
            note: "I have 3 years of international experience in React and Tailwind.",
            appliedOn: "17/07/2025",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binod"
        },
        {
            id: "APP-002",
            name: "Sarah Jenkins",
            note: "Passionate about building accessible web applications.",
            appliedOn: "18/07/2025",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            id: "APP-003",
            name: "Michael Chen",
            note: "Former lead at a fintech startup, looking for new challenges.",
            appliedOn: "19/07/2025",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        },
        {
            id: "APP-004",
            name: "Binod Subedi", // Repeating as per wireframe
            note: "I have 3 years of international experience.",
            appliedOn: "17/07/2025",
            applicantId: "{Index of the Applicant}",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binod2"
        }
    ]);

    const [selectedJobId, setSelectedJobId] = useState(1);
    const [searchLocation, setSearchLocation] = useState("");

    const selectedJob = jobs.find(j => j.id === selectedJobId);

    const handleDeleteJob = (id) => {
        // In a real app, this would be an API call
        setJobs(jobs.filter(j => j.id !== id));
        if (selectedJobId === id) setSelectedJobId(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-700">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                                <Briefcase size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">HireStream</span>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <button className="text-emerald-600 border-b-2 border-emerald-500 px-1 py-4 text-sm font-medium">
                                Vacancies
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 px-1 py-4 text-sm font-medium transition-colors">
                                Company Profile
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 px-1 py-4 text-sm font-medium transition-colors">
                                Analytics
                            </button>
                        </nav>

                        {/* Profile */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold">TechCorp Solutions</span>
                                <span className="text-xs text-gray-400">Employer Account</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                                <User size={20} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Posted Jobs */}
                    <div className="w-full lg:w-2/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Posted Jobs</h2>
                            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm">
                                <Plus size={16} />
                                Post Job
                            </button>
                        </div>

                        {/* Search Filter based on prompt snippet */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex items-center px-4 group focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                            <MapPin className="text-gray-400 mr-3 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Filter by location..."
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="w-full py-4 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-4">
                            {jobs.filter(job => job.location.toLowerCase().includes(searchLocation.toLowerCase())).map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJobId(job.id)}
                                    className={`relative p-5 bg-white rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md ${selectedJobId === job.id ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-transparent'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 leading-tight">
                                                {job.title}, {job.location}
                                            </h3>
                                            <p className="text-emerald-600 font-semibold mt-1">
                                                {job.salary}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm text-gray-400">
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                                                    {job.applications} Applications So Far
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteJob(job.id);
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                                            title="Delete Job"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider (Desktop Only) */}
                    <div className="hidden lg:block w-px bg-gray-200 self-stretch"></div>

                    {/* Right Column: Applicants */}
                    <div className="w-full lg:w-3/5">
                        {selectedJob ? (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-200 pb-6 gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Active Listing</span>
                                        <h2 className="text-3xl font-bold text-gray-900 mt-1">{selectedJob.title}</h2>
                                        <div className="flex items-center text-gray-500 mt-2 gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={16} />
                                                <span className="text-sm font-medium">{selectedJob.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase size={16} />
                                                <span className="text-sm font-medium">{selectedJob.salary}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                                        Edit Details <ExternalLink size={14} />
                                    </button>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Candidates</h3>
                                        <div className="text-sm text-gray-400 font-medium">Showing {applicants.length} results</div>
                                    </div>

                                    {applicants.map((applicant, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Profile Section */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden">
                                                        <img src={applicant.photo} alt={applicant.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Candidate Photo</span>
                                                </div>

                                                {/* Content Section */}
                                                <div className="flex-1 space-y-2">
                                                    <h4 className="text-xl font-bold text-gray-900">{applicant.name}</h4>
                                                    <p className="text-gray-600 leading-relaxed text-sm">
                                                        <span className="font-semibold text-gray-800">Candidate Note:</span> {applicant.note}
                                                    </p>
                                                    <div className="flex flex-wrap gap-4 pt-1">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <span className="font-semibold">Applied On:</span> {applicant.appliedOn}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <span className="font-semibold">Applicant ID:</span> {applicant.id}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Section */}
                                                <div className="flex flex-row md:flex-col gap-3 justify-center">
                                                    <button className="flex items-center justify-center gap-2 w-full px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                                                        <FileText size={16} className="text-emerald-500" />
                                                        Cover Letter
                                                    </button>
                                                    <button className="flex items-center justify-center gap-2 w-full px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                                                        <User size={16} className="text-emerald-500" />
                                                        Resume
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Search size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Select a job listing</h3>
                                <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                                    Click on a posted job from the left sidebar to view candidate applications and details.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer / Status Bar (Mobile) */}
            <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
                <button className="text-emerald-500 flex flex-col items-center gap-1">
                    <Briefcase size={20} />
                    <span className="text-[10px] font-bold">Jobs</span>
                </button>
                <button className="text-gray-400 flex flex-col items-center gap-1">
                    <Settings size={20} />
                    <span className="text-[10px] font-bold">Settings</span>
                </button>
                <button className="text-gray-400 flex flex-col items-center gap-1">
                    <LogOut size={20} />
                    <span className="text-[10px] font-bold">Exit</span>
                </button>
            </footer>
        </div>
    );
};