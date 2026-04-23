export const JobCard = ({ job, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl border cursor-pointer transition ${isSelected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
        >
            <h3 className="text-sm font-semibold">{job.jobTitle}</h3>

            <p className="text-xs text-gray-500 mt-1">
                {job.company.name}
            </p>

            <p className="text-xs text-gray-400">
                {job.company.location}
            </p>
        </div>
    );
};