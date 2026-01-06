// Firebase Configuration
// IMPORTANT: This file must be loaded AFTER the Firebase SDK scripts.

const firebaseConfig = {
    apiKey: "AIzaSyAz4rxDI-oh60KX3KmXH__Ej42VekJpEXk",
    authDomain: "mawj-portfolio.firebaseapp.com",
    projectId: "mawj-portfolio",
    storageBucket: "mawj-portfolio.firebasestorage.app",
    messagingSenderId: "787575053940",
    appId: "1:787575053940:web:2b740d14716193f33cbb21"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase Initialized");

    // Initialize Firestore
    const db = firebase.firestore();

    // Expose db globally for other scripts
    window.db = db;
} else {
    console.error("Firebase SDK not loaded! Make sure to include the script tags in HTML.");
}
