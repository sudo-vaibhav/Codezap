import firebase from 'firebase';
import 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDOYLD2f3rqjIUtVjIU7o2pjeahvMY-Flc',
  authDomain: 'codezap-84242.firebaseapp.com',
  databaseURL: 'https://codezap-84242.firebaseio.com',
  projectId: 'codezap-84242',
  storageBucket: 'codezap-84242.appspot.com',
  messagingSenderId: '975541410224',
  appId: '1:975541410224:web:84f559a01eb822f8395e75',
  measurementId: 'G-NBVVHYC6XY',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyDOYLD2f3rqjIUtVjIU7o2pjeahvMY-Flc',
//   authDomain: 'codezap-84242.firebaseapp.com',
//   databaseURL: 'https://codezap-84242.firebaseio.com',
//   projectId: 'codezap-84242',
//   storageBucket: 'codezap-84242.appspot.com',
//   messagingSenderId: '975541410224',
//   appId: '1:975541410224:web:d8204f7364195af3395e75',
//   measurementId: 'G-Z22ETL6CJY',
// };
// if (!firebase.apps.length) {
//   let app;
//   app = firebase.initializeApp(firebaseConfig);
// }

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.apps[0];
export const auth = app.auth();
// const app = firebase.initializeApp(firebaseConfig);

// export const signUpWithEmail = async (email, password) => {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password);
//     return res;
//   } catch (error) {
//     return {
//       error,
//     };
//   }
// };
export const signOut = async () => {
  await auth.signOut();
};
export const signInWithEmail = async (email, password) => {
  auth.signInWithEmailAndPassword(email, password);
};
// export const firestore = firebase.firestore();
