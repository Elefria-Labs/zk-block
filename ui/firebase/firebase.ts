import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};
// @ts-ignore
if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}
// @ts-ignore
const analytics = firebase.analytics;
// @ts-ignore
firebase.firestore();
export { firebase as firebaseInstance, analytics };
