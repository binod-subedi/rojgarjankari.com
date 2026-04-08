export const JobDetail = ({ job }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {job.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-1">
                {job.company}
            </p>

            <p className="text-gray-500 dark:text-gray-400 mb-4">
                {job.location}
            </p>

            <p className="text-gray-700 dark:text-gray-200">
                {job.description}
            </p>
        </div>
    );
};