export const JobCard = ({ job, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                   hover:shadow-md hover:border-red-500 cursor-pointer transition 
                   bg-gray-50 dark:bg-gray-700"
        >
            {/* Title and Location */}
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                    {job.jobTitle}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.company.location}
                </span>
            </div>

            {/* Company Name */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {job.company.name}
            </p>

            {/* Employment Type */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.employmentType}
            </p>
        </div>
    );
};