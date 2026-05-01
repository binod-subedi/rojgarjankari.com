import { createContext, useState, useEffect, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../configs/firebase'
import { fetchUserDocument } from '../services/userService';
import Spinner from '../components/Spinner';
import { useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true);

    const refreshUserData = useCallback(async (user = currentUser) => {
        if (!user) return null;
        const data = await fetchUserDocument(user.uid);
        setUserData(data);
        return data;
    }, [currentUser]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);

                try {
                    const userRef = doc(firestore, 'users', user.uid);
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document.")
                        setUserData(null);
                    }
                } catch (err) {
                    console.error("Error fetching user", err)
                    setUserData(null);
                }
            } else {
                setCurrentUser(null)
                setUserData(null);
            }

            setLoading(false)
        });
        return unsubscribe;
    }, [refreshUserData]);

    const value = {
        currentUser,
        userData,
        loading,
        isLoggedIn: !!currentUser,
        refreshUserData
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Spinner /> : children}
        </AuthContext.Provider>
    )
}