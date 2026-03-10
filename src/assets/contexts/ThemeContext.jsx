import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])



    const value = {
        theme, setTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}