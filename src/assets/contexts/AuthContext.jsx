import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useEffect, useContext } from 'react'
import Spinner from '../components/Spinner';
import { auth } from '../configs/firebase'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    const initializeUser = async (user) => {
        if (user) {
            setCurrentUser({ ...user });
            setIsLoggedIn(true);
        } else {
            setCurrentUser(null)
            setIsLoggedIn(false);
        }
        setLoading(false)
    }

    const value = {
        currentUser,
        isLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Spinner /> : children}
        </AuthContext.Provider>
    )
}