export const JobDetail = ({ job }) => {
    if (!job) {
        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-gray-400">
                Select a job to view details
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-8">

            {/* HEADER */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
                <p className="text-sm text-gray-500">
                    {job.company.name} • {job.company.location}
                </p>

                <button className="mt-4 px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-black">
                    Apply Now
                </button>
            </div>

            {/* META */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Meta label="Salary" value={job.salary} />
                <Meta label="Type" value={job.employmentType} />
                <Meta label="Experience" value={job.experienceLevel} />
                <Meta label="Work Hours" value={job.details.workTime.time} />
            </div>

            {/* DESCRIPTION */}
            <Section title="Description">
                {job.jobDescription}
            </Section>

            {/* RESPONSIBILITIES */}
            <Section title="Responsibilities">
                <ul className="space-y-2 text-sm">
                    {job.details.rolesAndResponsibilities.map((r, i) => (
                        <li key={i}>• {r}</li>
                    ))}
                </ul>
            </Section>

            {/* SKILLS */}
            <Section title="Skills">
                <p className="text-sm text-gray-600">
                    {job.details.requirements.technicalSkills.join(", ")}
                </p>
            </Section>
        </div>
    );
};

const Meta = ({ label, value }) => (
    <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
    </div>
);

const Section = ({ title, children }) => (
    <div className="space-y-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="text-sm text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);