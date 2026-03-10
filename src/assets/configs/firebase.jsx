import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDZ8FP5W8huG_0bZ4DC3l0AbFcL-uu9fvg",
    authDomain: "rojgari-firebase.firebaseapp.com",
    projectId: "rojgari-firebase",
    storageBucket: "rojgari-firebase.firebasestorage.app",
    messagingSenderId: "159255070415",
    appId: "1:159255070415:web:addc46f256cfd8da3399ba",
    measurementId: "G-DLXBCQTD12",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);