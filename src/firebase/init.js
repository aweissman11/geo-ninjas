import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCpX6ipn_RCatVgozBmtBXsb7dYII0RGcc',
  authDomain: 'geo-ninjas-24c7e.firebaseapp.com',
  databaseURL: 'https://geo-ninjas-24c7e.firebaseio.com',
  projectId: 'geo-ninjas-24c7e',
  storageBucket: 'geo-ninjas-24c7e.appspot.com',
  messagingSenderId: '1020672959810',
  appId: '1:1020672959810:web:7601183d9895f8cfd714db',
  measurementId: 'G-E7XHV2CKRT',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();
