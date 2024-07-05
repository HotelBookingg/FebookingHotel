import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0Mvqq2NmLAebi20uzqx9lImDQMrhnv7Y",
  authDomain: "bookhotel-60f63.firebaseapp.com",
  projectId: "bookhotel-60f63",
  storageBucket: "bookhotel-60f63.appspot.com",
  messagingSenderId: "234881841783",
  appId: "1:234881841783:web:aa53fb5317ac4a019be472",
  measurementId: "G-G3WCL7H0P3",
};

const app = firebase.initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = firebase.auth();

const storage = getStorage(app);
const firestoreDb = getFirestore(app);

export const imageDb = storage;
export { auth, analytics, firestoreDb };
export default firebase;
