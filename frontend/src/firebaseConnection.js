import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAwLGmc6Em_kHfvDEsQaFZ_QGoz-3SyPrw",
  authDomain: "tatsu-52f4f.firebaseapp.com",
  projectId: "tatsu-52f4f",
  storageBucket: "tatsu-52f4f.appspot.com",
  messagingSenderId: "415610515464",
  appId: "1:415610515464:web:1e11c987faef435168a1bd",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export { auth, signInWithEmailAndPassword, db };