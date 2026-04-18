import { useState } from "react";

// ─── Error Message Component ───────────────────────────────────────────────────
const ErrorMessage = ({ title = "Something went wrong", message, onDismiss }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-red-800 shadow-sm"
        >
            {/* Icon */}
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                <svg className="h-3.5 w-3.5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>

            {/* Content */}
            <div className="flex-1 text-sm">
                <p className="font-semibold">{title}</p>
                {message && <p className="mt-0.5 text-red-700">{message}</p>}
            </div>

            {/* Dismiss */}
            <button
                onClick={handleDismiss}
                className="ml-auto -mr-1 rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                aria-label="Dismiss error"
            >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    );
}

// ─── Success Message Component ─────────────────────────────────────────────────
const SuccessMessage = ({ title = "Done!", message, onDismiss }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-emerald-800 shadow-sm"
        >
            {/* Icon */}
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>

            {/* Content */}
            <div className="flex-1 text-sm">
                <p className="font-semibold">{title}</p>
                {message && <p className="mt-0.5 text-emerald-700">{message}</p>}
            </div>

            {/* Dismiss */}
            <button
                onClick={handleDismiss}
                className="ml-auto -mr-1 rounded-lg p-1 text-emerald-400 transition hover:bg-emerald-100 hover:text-emerald-600"
                aria-label="Dismiss success"
            >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    );
}

// ─── Alert Message Component ───────────────────────────────────────────────────
const AlertMessage = ({ title = "Heads up", message, onDismiss }) => {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-amber-800 shadow-sm"
        >
            {/* Icon */}
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <svg className="h-3.5 w-3.5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>

            {/* Content */}
            <div className="flex-1 text-sm">
                <p className="font-semibold">{title}</p>
                {message && <p className="mt-0.5 text-amber-700">{message}</p>}
            </div>

            {/* Dismiss */}
            <button
                onClick={handleDismiss}
                className="ml-auto -mr-1 rounded-lg p-1 text-amber-400 transition hover:bg-amber-100 hover:text-amber-600"
                aria-label="Dismiss alert"
            >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    );
}

export { ErrorMessage, SuccessMessage, AlertMessage }