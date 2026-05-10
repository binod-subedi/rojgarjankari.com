export const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Left section - could be links */}
                <div className="flex flex-col space-y-2">
                    <h2 className="font-semibold text-lg">Quick Links</h2>
                    <a href="#" className="hover:text-blue-600 transition">Home</a>
                    <a href="#" className="hover:text-blue-600 transition">About</a>
                    <a href="#" className="hover:text-blue-600 transition">Services</a>
                    <a href="#" className="hover:text-blue-600 transition">Contact</a>
                </div>

                {/* Right section - could be social icons */}
                <div className="flex flex-col space-y-2">
                    <h2 className="font-semibold text-lg">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-600 transition">Twitter</a>
                        <a href="#" className="hover:text-blue-600 transition">Facebook</a>
                        <a href="#" className="hover:text-blue-600 transition">LinkedIn</a>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm">
                &copy; {new Date().getFullYear()} RojgarJankari.com. All rights reserved.
            </div>
        </footer>
    );
};