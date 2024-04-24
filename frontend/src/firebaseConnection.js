import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Optional for analytics
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwLGmc6Em_kHfvDEsQaFZ_QGoz-3SyPrw",
  authDomain: "tatsu-52f4f.firebaseapp.com",
  projectId: "tatsu-52f4f",
  storageBucket: "tatsu-52f4f.appspot.com",
  messagingSenderId: "415610515464",
  appId: "1:415610515464:web:1e11c987faef435168a1bd",
  // measurementId: "G-2XR0M1C10G" // Optional for analytics
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication (if required)
const auth = getAuth(firebaseApp);

// Optional: Initialize Firebase Analytics (if desired)
// const analytics = getAnalytics(firebaseApp);  // Uncomment if needed

export { auth };  // Only export auth if using for authentication
