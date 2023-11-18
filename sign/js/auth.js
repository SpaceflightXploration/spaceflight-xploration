document.addEventListener("DOMContentLoaded", function () {
    const auth = firebase.auth();

    function signOutIfSignedIn() {
        const user = auth.currentUser;

        if (user) {
        console.log('User Signed In');
            auth.signOut().then(() => {
                // Sign-out successful
                console.log("User signed out for verification");
                // Additional actions after sign-out if needed
                
            }).catch((error) => {
                // An error happened
                console.error("Sign-out error:", error);
            });
        } else {
            console.log('No User Signed In');
        }
    }
    
    signOutIfSignedIn();
});
