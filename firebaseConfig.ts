// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCCAbBSDk1pYRfb-Jn5WngbdfSVGgNtKA",
  authDomain: "rentalibre-fbbda.firebaseapp.com",
  projectId: "rentalibre-fbbda",
  storageBucket: "rentalibre-fbbda.appspot.com",
  messagingSenderId: "691354582124",
  appId: "1:691354582124:web:5bd609a4e3f3dba95cac49",
  measurementId: "G-JKCNLCQTGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage()