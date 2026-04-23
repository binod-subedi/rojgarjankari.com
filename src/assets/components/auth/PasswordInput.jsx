import { forwardRef } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";

export const PasswordInput = forwardRef(
    ({ label, name, value, onChange, error, ...props }, ref) => {
        const { show, toggle } = usePasswordToggle();

        return (
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>

                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                    />

                    <input
                        ref={ref}
                        type={show ? "text" : "password"}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder="********"
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg ${error ? "border-red-500" : "border-gray-300"
                            } focus:border-gray-900 outline-none`}
                        {...props}
                    />

                    <button
                        type="button"
                        onClick={toggle}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {error && <p className="text-xs text-red-500">{error.message}</p>}
            </div>
        );
    }
);