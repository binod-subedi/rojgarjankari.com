import { firestore } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

export const saveUserToFireStore = async (uid, fullName, email, phone) => {
    try {
        const userRef = doc(firestore, 'users', uid);
        await setDoc(userRef, {
            fullName: fullName,
            role: "user",
            email: email,
            phone: phone,
            createdAt: new Date()
        });
        console.log("User data saved successfully");
    } catch (error) {
        console.error("Error saving user", error);
    }
}

export const saveEmployerToFireStore = async (uid, fullName, email, companyName) => {
    try {
        const empRef = doc(firestore, 'users', uid);
        await setDoc(empRef, {
            fullName: fullName,
            role: "employer",
            email: email,
            companyName: companyName,
            createdAt: new Date()
        })
    } catch (error) {
        console.error(err)
    }
}