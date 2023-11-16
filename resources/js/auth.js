document.addEventListener("DOMContentLoaded", function () {
    const auth = firebase.auth();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in
            var userProfileUrl = user.photoURL;

            if (userProfileUrl) {
                // If available, update the profile image source
                console.log('Profile available');
                document.getElementById('profileImage').src = userProfileUrl;
            } else {
                // If not available, set a default image source
                console.log('Profile image not available. Using default.');
                document.getElementById('profileImage').src = 'https://firebasestorage.googleapis.com/v0/b/sfs-bp-store.appspot.com/o/static%2Ficons%2Fprofile_dark.png?alt=media&token=4096c866-7db6-46c0-ac5d-b47705e22d59';
            }
        } else {
            // No user is signed in
            console.log("No user signed in");
        }
    });
});