import React, { useState, useEffect, useMemo } from 'react';
import {
    MapPin,
    Trash2,
    FileText,
    User,
    ExternalLink,
    Plus
} from 'lucide-react';
import { Navbar } from "../components";
import { useDebounce } from "../hooks/useDebounce";

export const EmployerDashboard = () => {

    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Senior Frontend Developer",
            location: "Sydney, NSW",
            salary: "$140k - $160k",
            applications: 24,
        },
        {
            id: 2,
            title: "UX/UI Designer",
            location: "Remote",
            salary: "$110k - $130k",
            applications: 18,
        },
        {
            id: 3,
            title: "Product Manager",
            location: "Melbourne, VIC",
            salary: "Competitive",
            applications: 42,
        }
    ]);

    const [applicants] = useState([
        {
            id: "APP-001",
            name: "Binod Subedi",
            note: "3 years React + Tailwind experience",
            appliedOn: "17/07/2025",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binod"
        },
        {
            id: "APP-002",
            name: "Sarah Jenkins",
            note: "Accessible UI enthusiast",
            appliedOn: "18/07/2025",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        }
    ]);

    const [selectedJobId, setSelectedJobId] = useState(1);
    const [searchLocation, setSearchLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const debouncedLocation = useDebounce(searchLocation);

    const selectedJob = jobs.find(j => j.id === selectedJobId);

    // ✅ Debounced filtering
    const filteredJobs = useMemo(() => {
        return jobs.filter(job =>
            job.location.toLowerCase().includes(debouncedLocation.toLowerCase())
        );
    }, [debouncedLocation, jobs]);

    // ✅ Skeleton loading effect
    useEffect(() => {
        setIsLoading(true);
        const t = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(t);
    }, [searchLocation]);

    const handleDeleteJob = (id) => {
        setJobs(prev => prev.filter(j => j.id !== id));
        if (selectedJobId === id) setSelectedJobId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: JOB LIST */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">
                                Posted Jobs
                            </h2>

                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm hover:bg-black transition">
                                <Plus size={16} />
                                Post
                            </button>
                        </div>

                        {/* Search */}
                        <div className="bg-white border border-gray-200 rounded-xl px-4 flex items-center">
                            <MapPin size={18} className="text-gray-400 mr-2" />
                            <input
                                placeholder="Filter by location..."
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="w-full py-3 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Jobs List */}
                        <div className="space-y-3">

                            {/* Skeleton */}
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-20 bg-gray-100 animate-pulse rounded-xl"
                                    />
                                ))
                            ) : filteredJobs.length > 0 ? (

                                filteredJobs.map(job => (
                                    <div
                                        key={job.id}
                                        onClick={() => setSelectedJobId(job.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all group
                                        ${selectedJobId === job.id
                                                ? "border-emerald-500 shadow-sm"
                                                : "border-gray-200 hover:border-emerald-300 hover:shadow-sm"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition">
                                                    {job.title}
                                                </h3>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    {job.location}
                                                </p>

                                                <span className="text-xs mt-2 inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                    {job.applications} applicants
                                                </span>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteJob(job.id);
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                <div className="text-sm text-gray-400 text-center py-6">
                                    No jobs found
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: APPLICANTS */}
                    <div className="lg:col-span-8 space-y-6">

                        {selectedJob ? (
                            <>
                                {/* Job Header */}
                                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                {selectedJob.title}
                                            </h1>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {selectedJob.location} • {selectedJob.salary}
                                            </p>
                                        </div>

                                        <button className="text-sm flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition">
                                            Edit <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Applicants */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900">
                                        Applicants ({applicants.length})
                                    </h3>

                                    {applicants.map(app => (
                                        <div
                                            key={app.id}
                                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
                                        >
                                            <div className="flex gap-4">

                                                {/* Avatar */}
                                                <img
                                                    src={app.photo}
                                                    alt={app.name}
                                                    className="w-12 h-12 rounded-full border"
                                                />

                                                {/* Info */}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">
                                                        {app.name}
                                                    </h4>

                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {app.note}
                                                    </p>

                                                    <div className="text-xs text-gray-400 mt-2">
                                                        Applied on {app.appliedOn}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-2">
                                                    <button className="px-3 py-2 text-xs border rounded-lg hover:bg-gray-50 flex items-center gap-1 transition">
                                                        <FileText size={14} />
                                                        Cover
                                                    </button>
                                                    <button className="px-3 py-2 text-xs border rounded-lg hover:bg-gray-50 flex items-center gap-1 transition">
                                                        <User size={14} />
                                                        Resume
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                Select a job to view applicants
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};