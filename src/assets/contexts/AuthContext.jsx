import { createContext, useState, useEffect, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../configs/firebase'
import Spinner from '../components/Spinner';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true);

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
    }, []);

    const value = {
        currentUser,
        userData,
        loading,
        isLoggedIn: !!currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Spinner /> : children}
        </AuthContext.Provider>
    )
}