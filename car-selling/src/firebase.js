import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKZXycWiCL3lveCVMcjcL1KWbLIJggzBA",
  authDomain: "react-50919.firebaseapp.com",
  databaseURL: "https://react-50919-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-50919",
  storageBucket: "react-50919.appspot.com",
  messagingSenderId: "118926940338",
  appId: "1:118926940338:web:a4ffda2fb078c7e75d11ab",
  measurementId: "G-P9H0VPKFD7"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const auth = getAuth(app);