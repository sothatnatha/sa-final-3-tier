// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZe3al9xRKHZJfJCR4YcGnHvFWls6mTDU",
  authDomain: "auth-39ce7.firebaseapp.com",
  projectId: "auth-39ce7",
  storageBucket: "auth-39ce7.appspot.com",
  messagingSenderId: "10690750422",
  appId: "1:10690750422:web:99fa6aa9eaa6589fad6677",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
