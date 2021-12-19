const { initializeApp } = require("firebase/app");
const { getFirestore } = require('firebase/firestore');
const config = require("../config.json");

// Initialize Firebase
const firebase = initializeApp(config.firebaseConfig);
const firestore = getFirestore(firebase);

module.exports = { firebase, firestore };