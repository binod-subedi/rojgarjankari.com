export const JobDetail = ({ job }) => {
    if (!job) return null;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

            {/* Header */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 space-y-6">

                {/* Title + CTA Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                    {/* Title Block */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                            {job.jobTitle}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {job.company?.name} • {job.company?.location}
                        </p>
                    </div>

                    {/* Apply Button */}
                    <div className="shrink-0">
                        <button className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition shadow-sm hover:shadow-md">
                            Apply Now
                        </button>
                    </div>

                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoCard label="Location" value={job.company.location} />
                    <InfoCard label="Salary" value={job.salary} />
                    <InfoCard label="Working Days" value={job.details.workTime.days} />
                    <InfoCard label="Working Hours" value={job.details.workTime.time} />
                </div>

            </div>

            {/* Sections */}
            <div className="space-y-6">

                <Section title="Job Description">
                    <p>{job.jobDescription}</p>
                </Section>

                <Section title="Roles & Responsibilities">
                    <ul className="space-y-2">
                        {job.details.rolesAndResponsibilities.map((role, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="mt-[6px] w-1.5 h-1.5 bg-red-500 rounded-full" />
                                <span>{role}</span>
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section title="Requirements">
                    <div className="space-y-2">
                        <p><strong>Technical:</strong> {job.details.requirements.technicalSkills.join(', ')}</p>
                        <p><strong>Soft Skills:</strong> {job.details.requirements.softSkills.join(', ')}</p>
                        <p><strong>Experience:</strong> {job.details.requirements.experience}</p>
                        <p><strong>Education:</strong> {job.details.requirements.education}</p>
                    </div>
                </Section>

                {job.details.bonusPoints?.length > 0 && (
                    <Section title="Bonus Points">
                        <ul className="space-y-2">
                            {job.details.bonusPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="mt-[6px] w-1.5 h-1.5 bg-red-500 rounded-full" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>
                )}

            </div>
        </div>
    );
};

/* Info Card */
const InfoCard = ({ label, value }) => (
    <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            {label}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {value}
        </p>
    </div>
);

/* Section */
const Section = ({ title, children }) => (
    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {title}
        </h2>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);