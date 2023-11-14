document.addEventListener("DOMContentLoaded", function () {
    const auth = firebase.auth();

    function signUp(event) {
        event.preventDefault();
        
        const email = document.getElementById('su-email').value;
        const password = document.getElementById('su-password').value;
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                console.log("User signed up:", user);
                // Redirect or perform actions after sign-up
            })
            .catch((error) => {
                // Handle sign-up errors
                const errorMessage = error.message;
                console.error("Sign-up error:", errorMessage);
            });
    }

    function signIn(event) {
        event.preventDefault();
        
        const email = document.getElementById('si-email').value;
        const password = document.getElementById('si-password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log("User signed in:", user);
                // Redirect or perform actions after sign-in
            })
            .catch((error) => {
                // Handle sign-in errors
                const errorMessage = error.message;
                console.error("Sign-in error:", errorMessage);
            });
    }

    const signUpForm = document.querySelector('.signin-form');
    signUpForm.addEventListener('submit', signUp);

    const signInForm = document.querySelector('.signin-form');
    signInForm.addEventListener('submit', signIn);

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;
            console.log('User is signed in');
            // Redirect or perform actions for a signed-in user
        } else {
            // User is signed out
            console.log('No user signed in');
            // Redirect or perform actions for a signed-out user
        }
    });
});