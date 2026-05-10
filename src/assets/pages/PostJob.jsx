import { useState } from 'react';
import { Footer, Navbar } from '../components';
import { jobPostFunc } from '../configs/firestore';

export const PostJob = () => {
    const initialData = {
        jobTitle: '',
        companyName: '',
        companyLocation: '',
        salary: '',
        employmentType: '',
        jobDescription: '',
        jobDetails: {
            rolesAndResponsibilities: [],
            requirements: {
                technicalSkills: [],
                softSkills: [],
                experience: '',
                education: ''
            },
            workTime: { days: '', time: '' }
        }
    };

    const [jobData, setJobData] = useState(initialData);

    const [tempItems, setTempItems] = useState({
        role: '',
        tech: '',
        soft: '',
        bonus: ''
    });

    const empTypes = ["Full-Time", "Part-Time", "Casual", "Contract"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (parent, subField, value) => {
        setJobData(prev => ({
            ...prev,
            jobDetails: {
                ...prev.jobDetails,
                [parent]: {
                    ...prev.jobDetails[parent],
                    [subField]: value
                }
            }
        }));
    };

    const addItemToArray = (targetArrayName, tempKey, isInsideRequirements = false) => {
        const valueToAdd = tempItems[tempKey];
        if (!valueToAdd) return;

        setJobData(prev => {
            if (isInsideRequirements) {
                return {
                    ...prev,
                    jobDetails: {
                        ...prev.jobDetails,
                        requirements: {
                            ...prev.jobDetails.requirements,
                            [targetArrayName]: [...prev.jobDetails.requirements[targetArrayName], valueToAdd]
                        }
                    }
                };
            }
            return {
                ...prev,
                jobDetails: {
                    ...prev.jobDetails,
                    [targetArrayName]: [...prev.jobDetails[targetArrayName], valueToAdd]
                }
            };
        });
        setTempItems(prev => ({ ...prev, [tempKey]: '' }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        jobPostFunc(jobData);
        alert("Job successfully posted to Firestore!");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="max-w-4xl mx-auto p-8 bg-white shadow-xl mt-10 rounded-xl mb-10">
                <form onSubmit={onSubmit} className="space-y-8">
                    <header className="border-b pb-4">
                        <h2 className="text-3xl font-bold text-gray-900">Create Job Listing</h2>
                        <p className="text-gray-500">Provide the details for your new position.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Job Title" name="jobTitle" placeholder="e.g. Senior React Developer" onChange={handleInputChange} />
                        <InputField label="Company Name" name="companyName" placeholder="e.g. TechCorp Inc." onChange={handleInputChange} />
                        <InputField label="Location" name="companyLocation" placeholder="e.g. Remote / New York" onChange={handleInputChange} />
                        <InputField label="Salary" name="salary" placeholder="e.g. $100k - $120k" onChange={handleInputChange} />

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                            <select
                                name="employmentType"
                                onChange={handleInputChange}
                                className="border p-2.5 rounded-lg bg-white"
                            >
                                <option value="">Select Type</option>
                                {empTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <TextAreaField
                            label="Job Description"
                            name="jobDescription"
                            placeholder="Describe the overall role, the team, and what a typical day looks like..."
                            onChange={handleInputChange}
                        />
                    </div>

                    <hr />

                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-indigo-600">Detailed Requirements</h3>

                        <ArrayInput
                            label="Roles & Responsibilities"
                            placeholder="Add a responsibility..."
                            value={tempItems.role}
                            onChange={(val) => setTempItems({ ...tempItems, role: val })}
                            onAdd={() => addItemToArray('rolesAndResponsibilities', 'role')}
                            list={jobData.jobDetails.rolesAndResponsibilities}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                            <ArrayInput
                                label="Technical Skills"
                                placeholder="e.g. JavaScript, AWS"
                                value={tempItems.tech}
                                onChange={(val) => setTempItems({ ...tempItems, tech: val })}
                                onAdd={() => addItemToArray('technicalSkills', 'tech', true)}
                                list={jobData.jobDetails.requirements.technicalSkills}
                            />
                            <ArrayInput
                                label="Soft Skills"
                                placeholder="e.g. Leadership"
                                value={tempItems.soft}
                                onChange={(val) => setTempItems({ ...tempItems, soft: val })}
                                onAdd={() => addItemToArray('softSkills', 'soft', true)}
                                list={jobData.jobDetails.requirements.softSkills}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Education Required"
                                placeholder="e.g. Bachelor's in CS"
                                onChange={(e) => handleNestedChange('requirements', 'education', e.target.value)}
                            />
                            <InputField
                                label="Experience Level"
                                placeholder="e.g. 5+ Years"
                                onChange={(e) => handleNestedChange('requirements', 'experience', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg flex gap-4">
                        <div className="flex-1">
                            <InputField label="Working Days" placeholder="Mon - Fri" onChange={(e) => handleNestedChange('workTime', 'days', e.target.value)} />
                        </div>
                        <div className="flex-1">
                            <InputField label="Working Hours" placeholder="9 AM - 5 PM" onChange={(e) => handleNestedChange('workTime', 'time', e.target.value)} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg transition-all">
                        PUBLISH JOB LISTING
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
};


const InputField = ({ label, name, onChange, placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <input
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
        />
    </div>
);

const ArrayInput = ({ label, placeholder, value, onChange, onAdd, list }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex gap-2">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="border p-2.5 grow rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
                type="button"
                onClick={onAdd}
                className="bg-gray-800 text-white px-5 rounded-lg hover:bg-black transition-colors"
            >
                Add
            </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
            {list.map((item, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm border border-indigo-200">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

const TextAreaField = ({ label, name, onChange, placeholder }) => (
    <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <textarea
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-y"
        />
    </div>
);