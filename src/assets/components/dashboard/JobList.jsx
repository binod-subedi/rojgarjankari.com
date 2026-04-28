import { JobCard } from "./JobCard";

export const JobList = ({ jobs, isLoading, selectedJob, setSelectedJob }) => {
    return (
        <div className="space-y-3">
            {isLoading
                ? [...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-12 bg-gray-100 animate-pulse rounded-xl"
                    />
                ))
                : jobs.length
                    ? jobs.map((job) => (
                        <JobCard
                            key={job.jobId}
                            job={job}
                            isSelected={selectedJob?.jobId === job.jobId}
                            onClick={() => setSelectedJob(job)}
                        />
                    ))
                    : <div className="text-center py-10 text-gray-400 text-sm">No jobs found</div>
            }
        </div>
    );
};