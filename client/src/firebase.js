// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-real-estate-app.firebaseapp.com",
	projectId: "mern-real-estate-app",
	storageBucket: "mern-real-estate-app.appspot.com",
	messagingSenderId: "323134343033",
	appId: "1:323134343033:web:792dd221bc29e6ec8e51a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
