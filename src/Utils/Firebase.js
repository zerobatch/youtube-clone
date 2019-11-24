import * as firebase from "firebase";

const {
  REACT_APP_API_KEY: apiKey,
  REACT_APP_AUTH_DOMAIN: authDomain,
  REACT_APP_DATABASE_URL: databaseURL,
  REACT_APP_PROJECT_ID: projectId,
  REACT_APP_STORAGE_BUCKET: storageBucket,
  REACT_APP_MESSAGING_SENDER_ID: messagingSenderId,
  REACT_APP_ID: appId,
  REACT_APP_MEASUREMENT_ID: measurementId
} = process.env;

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

firebase.initializeApp(config);
firebase.analytics();

export default {
  auth: firebase.auth(),
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  firestore: firebase.firestore()
};
