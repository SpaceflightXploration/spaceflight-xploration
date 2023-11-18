document.addEventListener('DOMContentLoaded', function () {
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
    
    const signUpForm = document.querySelector('.signup-form');
    signUpForm.addEventListener('submit', signUp);
    
});