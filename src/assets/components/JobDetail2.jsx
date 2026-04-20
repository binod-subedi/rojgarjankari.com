import { Briefcase } from 'lucide-react';

export const JobDetail2 = ({ job }) => {
    if (!job) return (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <Briefcase size={32} />
            </div>
            <p className="text-lg">Select a job to view full details</p>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header Info */}
            <div className="border border-gray-100 rounded-2xl p-8 mb-6 bg-white shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
                        <p className="text-gray-500 text-lg">
                            {job.company.name} • <span className="text-gray-400">{job.company.location}</span>
                        </p>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-100">
                        Apply Now
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Location</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">{job.company.location}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Salary</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">{job.salary}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Working Days</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">{job.details.workTime?.days || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Hours</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">{job.details.workTime?.time || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-6">
                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        Job Description
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{job.jobDescription}</p>
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Roles & Responsibilities
                    </h2>
                    <ul className="space-y-4">
                        {job.details.rolesAndResponsibilities?.map((role, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                {role}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                    <div className="flex flex-wrap gap-2">
                        {job.details.requirements?.technicalSkills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};