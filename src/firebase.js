import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCKAH7MAk8ZL86c1ilSUQOMMDCQK4DeOzU',
  authDomain: 'sli-diceroller-ef530.firebaseapp.com',
  databaseURL: 'https://sli-diceroller-ef530.firebaseio.com',
  projectId: 'sli-diceroller-ef530',
  storageBucket: 'sli-diceroller-ef530.appspot.com',
  messagingSenderId: '606933124052',
  appId: '1:606933124052:web:957ab0fbc2cb252fb88c41',
  measurementId: 'G-BXMXH7CTWR',
});

export default firebase;
