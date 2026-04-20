export const JobCard = ({ job, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-5 rounded-xl border transition-all cursor-pointer group ${isSelected
                ? "border-emerald-500 bg-emerald-50/30 shadow-sm"
                : "border-gray-100 bg-white hover:border-emerald-300 hover:shadow-md"
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {job.jobTitle}
                </h3>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                    {job.company.location}
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{job.company.name}</p>
            <div className="flex items-center">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                    {job.employmentType}
                </span>
            </div>
        </div>
    );
};