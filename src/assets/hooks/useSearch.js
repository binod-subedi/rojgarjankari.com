import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = (jobsData) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const debouncedTitle = useDebounce(searchTitle);
  const debouncedLocation = useDebounce(searchLocation);

  const filteredJobs = useMemo(() => {
    return jobsData.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(debouncedTitle.toLowerCase()) &&
        job.company.location.toLowerCase().includes(debouncedLocation.toLowerCase())
    );
  }, [debouncedTitle, debouncedLocation]);

  return {
    searchTitle,
    setSearchTitle,
    searchLocation,
    setSearchLocation,
    filteredJobs,
  };
};
