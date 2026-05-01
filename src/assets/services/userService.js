import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../configs/firebase.jsx";

export const fetchUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error("Error fetching user document:", err);
  }
  return null;
};
