export const AuthHeader = ({ title, subtitle }) => (
    <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
        </h2>
        <p className="text-gray-500 text-sm">
            {subtitle}
        </p>
    </header>
);