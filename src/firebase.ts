import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: 'AIzaSyB6uHnhocwg15ubmiBGnrr0Vz3NIb28how',
  authDomain: 'word-soup-71429.firebaseapp.com',
  databaseURL: 'https://word-soup-71429-default-rtdb.firebaseio.com',
  projectId: 'word-soup-71429',
  storageBucket: 'word-soup-71429.appspot.com',
  messagingSenderId: '126585871128',
  appId: '1:126585871128:web:9f9112f344899381cbdc6d',
});

export const auth = getAuth(app);
export const db = getFirestore(app);
