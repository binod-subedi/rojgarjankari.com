import { Search, MapPin } from "lucide-react";

export const SearchBar = ({ searchTitle, setSearchTitle, searchLocation, setSearchLocation }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-2 flex flex-col md:flex-row items-stretch gap-2 shadow-sm">
                {/* Title */}
                <div className="flex-1 flex items-center px-4">
                    <Search className="text-gray-400 mr-3" size={18} />
                    <input
                        placeholder="Search job title..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        className="w-full py-3 bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                </div>

                <div className="hidden md:block w-px bg-gray-200" />

                {/* Location */}
                <div className="flex-1 flex items-center px-4">
                    <MapPin className="text-gray-400 mr-3" size={18} />
                    <input
                        placeholder="Location..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full py-3 bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                </div>

                <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition">
                    Search
                </button>
            </div>
        </div>
    );
};