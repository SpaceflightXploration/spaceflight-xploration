// Wrap your code within the 'DOMContentLoaded' event listener to ensure it executes after the page content is loaded
document.addEventListener("DOMContentLoaded", function() {
    const auth = firebase.auth();
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
        if (event.data) {
            var currentUserUID = event.data;
            // Do something with the received UID from the app
            console.log("Received UID from the app: " + currentUserUID);
            // You can now use currentUserUID in your website logic
            // Fetch user-specific data
    //const currentUserUID = 'zmI32D9nKiYVByjLkq3ULsh9s6p2';
    // Assuming this UID is hardcoded for testing
    const userRef = firebase.database().ref('userdata/' + currentUserUID);

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;
            console.log('User is signed in');
            // Redirect or perform actions for a signed-in user
        } else {
            // User is signed out
            console.log('No user signed in');
            window.location.href = '../sign/sign_in.html';
            // Redirect or perform actions for a signed-out user
        }
    });

    userRef.once('value')
        .then((snapshot) => {
            const userData = snapshot.val();
            console.log('Snapshot:', snapshot.val());

            if (userData !== null) {
                // Data exists; populate input fields
                document.querySelector('input[placeholder="Username"]').value = userData.username || '';
                document.querySelector('input[placeholder="Bio"]').value = userData.bio || '';
                document.querySelector('input[placeholder="Email"]').value = userData.email || '';
                document.querySelector('input[placeholder="Phone Number"]').value = userData.phoneNumber || '';
                document.querySelector('#pfp').src = userData.profile_url || '';
            } else {
                console.error('User data does not exist or is null.');
                // Handle the case where the data is not available
            }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
        
        }
    }

    // Add an event listener to the 'Save Changes' button
    const saveChangesButton = document.querySelector('.save-changes-btn');
    saveChangesButton.addEventListener('click', saveChanges);

    
    function saveChanges(event) {
        event.preventDefault();

        const ref = firebase.database().ref('userdata/' + currentUserUID);

        const updatedUsername = document.querySelector('input[placeholder="Username"]').value;
        const updatedBio = document.querySelector('input[placeholder="Bio"]').value;
        const updatedEmail = document.querySelector('input[placeholder="Email"]').value;
        const updatedPhoneNumber = document.querySelector('input[placeholder="Phone Number"]').value;

        if (updatedUsername) {
            // Update the user data
            ref.update({
                username: updatedUsername,
                bio: updatedBio,
                email: updatedEmail, // Fixed property name
                phoneNumber: updatedPhoneNumber
            }).then(() => {
                console.log('User data updated successfully!');
                // Handle success - display a message, navigate to another page, etc.
            }).catch((error) => {
                console.error('Error updating user data:', error);
                // Handle the error
            });
        } else {
            // Prompt the user to enter a valid username
            if (!updatedUsername) {
                alert("Please provide a valid username.");
            }
        }
    }
});
