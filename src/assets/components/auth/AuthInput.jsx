import React from "react";

export const AuthInput = React.forwardRef(
    ({ label, icon: Icon, size = "md", ...props }, ref) => {
        const paddingY = size === "sm" ? "py-2.5" : "py-3";
        const paddingLeft = Icon ? "pl-10" : "pl-4";

        return (
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>

                <div className="relative">
                    {Icon && (
                        <Icon
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                        />
                    )}

                    <input
                        ref={ref}
                        {...props}
                        className={`w-full ${paddingLeft} pr-4 ${paddingY} border border-gray-300 rounded-lg focus:border-gray-900 outline-none transition`}
                    />
                </div>
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";