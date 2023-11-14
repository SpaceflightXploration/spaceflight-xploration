document.addEventListener("DOMContentLoaded", function () {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
        if (user) {
        const storageRef = firebase.storage().ref();
             imageRef = storageRef.child('userdata/profile/' + user.uid +'.jpeg'); // Define the path to upload
            // User is signed in
            console.log('Awaiting Profile Picture Update...');
            // Redirect or perform actions for a signed-in user
        } else {
            // User is signed out
            console.log('System Error: No User Signed In (but can change profile');
                window.location.href = '../../sign/sign_in.html';
            // Redirect or perform actions for a signed-out user
        }
    });
    
    const changeProfileButton = document.querySelector('#change-profile-btn');

    changeProfileButton.addEventListener('click', selectImage);
});

function selectImage() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none'; // Hide the input element
        fileInput.addEventListener('change', handleFileSelection);
        document.body.appendChild(fileInput); // Append the input element to the body
        fileInput.click();
    }

    function handleFileSelection(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const minSize = Math.min(img.width, img.height);
                canvas.width = minSize;
                canvas.height = minSize;

                ctx.drawImage(img, 0, 0, minSize, minSize, 0, 0, minSize, minSize);

                const croppedDataURL = canvas.toDataURL('image/jpeg');
                // Use croppedDataURL to update Firebase storage or perform other actions
                const pfp = document.getElementById('pfp');
                pfp.src = croppedDataURL;
                uploadToFirebaseStorage(croppedDataURL); // Display the cropped image on the page
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }



function uploadToFirebaseStorage(croppedDataURL) {
    // Convert the base64 string to a Blob
    const byteCharacters = atob(croppedDataURL.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });

    // Upload the Blob to Firebase Storage
    imageRef.put(imageBlob).then((snapshot) => {
        console.log('Uploaded the image!', snapshot);
        alert('Image Uploaded.');

        // Get the download URL of the uploaded image
        snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Additional handling or updating user profile with the uploaded image link
            console.log('Download URL:', downloadURL);

            // Update the user profile with the image URL
            const user = firebase.auth().currentUser;
            if (user) {
                const userId = user.uid;
                const userDataRef = firebase.database().ref('userdata/' + userId);
                userDataRef.update({ profile_url: downloadURL }).then(() => {
                    console.log('Profile URL saved in the database');
                    alert('URL saved. Please wait for a few moments before it changes in every applications.');
                }).catch((error) => {
                    console.error('Error saving profile URL:', error);
                    alert('Error saving in the database.');
                });
            }
        }).catch((error) => {
            console.error('Error getting download URL:', error);
            alert('ERROR getting Profile URL. Please resubmit your profile.');
        });
    }).catch((error) => {
        console.error('Error uploading the image:', error);
        alert('Error uploading the image.');
    });
}
