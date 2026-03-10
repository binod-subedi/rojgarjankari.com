import React, { useState, useEffect } from 'react';

export const AlertBox = ({ message, color }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2000); // Hide alert after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [message]); // Trigger every time `message` changes

    if (!visible) return null;

    // Dynamically set the color class based on the `color` prop
    const colorClasses = {
        red: 'bg-red-400',
        green: 'bg-green-400',
    };

    // Fallback to blue if the color is not recognized
    const alertColorClass = colorClasses[color] || colorClasses['blue'];

    return (
        <div className={`fixed top-6 right-6 z-50 p-4 ${alertColorClass} text-white rounded-lg shadow-lg`}>
            <p>{message}</p>
        </div>
    );
};