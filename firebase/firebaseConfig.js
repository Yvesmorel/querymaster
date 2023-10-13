import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'
import firebase from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.Apikey,
  authDomain: process.env.Authdomain,
  projectId: process.env.ProjectId,
  storageBucket: process.env.StorageBucket,
  messagingSenderId: process.env.MessagingSenderId,
  appId: process.env.AppId,
  measurementId: process.env.MeasurementId,
};

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp (firebaseConfig);
const db = getFirestore (firebase.app);
// const analytics = getAnalytics(app)
const auth = getAuth (app);
export {auth,db,firebase}