import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase'

const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

const signInWithGoogle = async () => {
    const provider = GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    return result;
}

const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
}

const signOutUser = () => {
    signOut(auth).then(() => {
        console.log("Sign Out Successful!")
    }).catch((err) => {
        console.error(err)
    })
}

export { createUser, signInUser, signInWithGoogle, passwordReset, signOutUser };