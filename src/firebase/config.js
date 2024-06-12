import firebase from "firebase/compat/app";
import "firebase/compat/auth";
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
const auth = firebase.auth();

export { auth };
export default firebase;
