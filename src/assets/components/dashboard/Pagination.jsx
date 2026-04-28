import { ChevronRight, ChevronLeft } from 'lucide-react'

export const Pagination = ({ currentPage, totalPages, changePage }) => {
    if (totalPages <= 1) return null;

    const handlePrev = () => changePage(Math.max(1, currentPage - 1));
    const handleNext = () => changePage(Math.min(totalPages, currentPage + 1));

    return (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            {/* Previous Button */}
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`w-8 h-8 text-sm rounded-lg ${isActive
                                ? "bg-gray-900 text-white"
                                : "hover:bg-gray-100 text-gray-600"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
};