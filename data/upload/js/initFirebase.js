document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
    apiKey: "AIzaSyAWnK5lzEFWY4qf74hGssiv_4_UC4IMocM",
    authDomain: "sfs-bp-store.firebaseapp.com",
    databaseURL: "https://sfs-bp-store-default-rtdb.firebaseio.com",
    projectId: "sfs-bp-store",
    storageBucket: "sfs-bp-store.appspot.com",
    messagingSenderId: "1026737660232",
    appId: "1:1026737660232:web:d42611bdc38a4f24fa937d",
    measurementId: "G-RHFS6CDYPP"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
    // Initialize Firebase
    console.log("Initializing Firebase...");
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth(app);
} else {
    // Use the existing Firebase app
    console.log("Firebase already initialized.");
    firebase.app();
}
});
