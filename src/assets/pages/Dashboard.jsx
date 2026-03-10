import { useState, useEffect } from 'react';
import { signOutUser } from '../configs/auth'
export const Dashboard = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchForm, setSearchForm] = useState({
        job: '',
        location: ''
    });


    const handleSignOut = () => {
        signOutUser();
    }

    const jobs = [
        {
            id: 1,
            title: 'Frontend Developer',
            location: 'Lokanthali, Kathmandu',
            salary: 'Rs 50,000 per month',
            applications: 45,
            workingDays: 'Sunday - Friday',
            workingHours: '9:00 am - 5:00 pm',
            description: 'We are seeking a talented Frontend Developer to join our growing team. You will be responsible for building and maintaining user-facing features, ensuring optimal performance and user experience across all devices.',
            responsibilities: [
                'Develop new user-facing features using React.js',
                'Build reusable components and front-end libraries',
                'Translate designs and wireframes into high-quality code'
            ],
            requirements: [
                'Fluent in ReactJs',
                'Redux Toolkit',
                'TypeScript',
                '3 Years of Professional Experience'
            ]
        },
        {
            id: 2,
            title: 'Full Stack Developer',
            location: 'Patan, Lalitpur',
            salary: 'Rs 75,000 per month',
            applications: 32,
            workingDays: 'Monday - Friday',
            workingHours: '10:00 am - 6:00 pm',
            description: 'Join our dynamic team as a Full Stack Developer. You will work on both frontend and backend technologies, building scalable web applications and APIs that serve thousands of users.',
            responsibilities: [
                'Design and develop full-stack web applications',
                'Create and maintain RESTful APIs',
                'Collaborate with cross-functional teams'
            ],
            requirements: [
                'Proficient in React and Node.js',
                'Experience with MongoDB or PostgreSQL',
                'Strong problem-solving skills',
                '4+ Years of Professional Experience'
            ]
        },
        {
            id: 3,
            title: 'UI/UX Designer',
            location: 'Thamel, Kathmandu',
            salary: 'Rs 60,000 per month',
            applications: 28,
            workingDays: 'Sunday - Friday',
            workingHours: '9:30 am - 5:30 pm',
            description: 'We are looking for a creative UI/UX Designer to craft beautiful and intuitive user experiences. You will work closely with developers and product managers to bring ideas to life.',
            responsibilities: [
                'Create user-centered designs and prototypes',
                'Conduct user research and usability testing',
                'Develop design systems and style guides'
            ],
            requirements: [
                'Proficient in Figma and Adobe Creative Suite',
                'Strong portfolio demonstrating UX process',
                'Understanding of responsive design',
                '2+ Years of Design Experience'
            ]
        }
    ];

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
        // Set first job as selected by default
        if (jobs.length > 0) {
            setSelectedJob(jobs[0]);
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchForm);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">

            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {darkMode ? (
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>

            {/* Navigation Header */}
            <nav className="bg-white dark:bg-gray-800 shadow-md border-b-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                RojgarJankari
                            </span>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-900 dark:text-white font-semibold border-b-2 border-indigo-600 pb-1">
                                Jobs
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                                Applied Jobs
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                                Companies
                            </a>
                        </div>

                        {/* Right side buttons */}
                        <div className="flex items-center gap-4">
                            {/* Sign In Button - Desktop */}
                            <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                Sign In
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col space-y-4">
                                <a href="#" className="text-gray-900 dark:text-white font-semibold px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                    Jobs
                                </a>
                                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    Applied Jobs
                                </a>
                                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    Companies
                                </a>
                                <button className="w-full px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Search Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 mb-8 transition-colors duration-300">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="job" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Job
                            </label>
                            <input
                                type="text"
                                id="job"
                                name="job"
                                value={searchForm.job}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Search for jobs..."
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={searchForm.location}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="City or region..."
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Job Listings and Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Left Column - Recommended Jobs */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended Jobs</h2>
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${selectedJob?.id === job.id
                                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-600 shadow-lg'
                                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {job.location}
                                            </p>
                                        </div>
                                        <button className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-300">
                                            Apply
                                        </button>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        {job.salary}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Total Applications So Far: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{job.applications}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Job Details */}
                    <div className="lg:col-span-3">
                        {selectedJob ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-8 transition-colors duration-300">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            Job Details for {selectedJob.title}
                                        </h2>
                                        <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="font-medium">Location:</span> {selectedJob.location}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-medium">Salary:</span> {selectedJob.salary}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium">Working Days:</span> {selectedJob.workingDays}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-medium">Working Hours:</span> {selectedJob.workingHours}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                        Apply
                                    </button>
                                </div>

                                {/* Job Description */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        Job Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {selectedJob.description}
                                    </p>
                                </div>

                                {/* Responsibilities */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        Responsibilities
                                    </h3>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                        {selectedJob.responsibilities.map((resp, index) => (
                                            <li key={index} className="leading-relaxed">{resp}</li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        What we are looking for?
                                    </h3>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                        {selectedJob.requirements.map((req, index) => (
                                            <li key={index} className="leading-relaxed">{req}</li>
                                        ))}
                                    </ol>
                                </div>

                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-8 flex items-center justify-center h-96">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    Select a job to view details
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <button className='w-50 py-3 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer' onClick={handleSignOut}>Sign Out</button>
        </div>

    );
}