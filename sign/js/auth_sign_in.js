document.addEventListener('DOMContentLoaded', function () {
    const auth = firebase.auth();
    
    function signIn(event) {
        event.preventDefault();
        
        const email = document.getElementById('si-email').value;
        const password = document.getElementById('si-password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log("User signed in:", user);
                window.history.back();
                // Redirect or perform actions after sign-in
            })
            .catch((error) => {
                // Handle sign-in errors
                const errorMessage = error.message;
                console.error("Sign-in error:", errorMessage);
            });
    }

    const signInForm = document.querySelector('.signin-form');
    signInForm.addEventListener('submit', signIn);
});