export const JobCard = ({ job, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
        hover:shadow-md hover:border-red-500 cursor-pointer transition 
        bg-gray-50 dark:bg-gray-700"
        >
            <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                {job.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300">
                {job.company}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.location}
            </p>
        </div>
    );
};