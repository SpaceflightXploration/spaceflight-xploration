function submitData() {
    const mission = document.getElementById('missionInput').value;
    const email = document.getElementById('emailInput').value;
    const dimensions = document.getElementById('dimensionInput').value;

    if (mission && email && dimensions) {
        const postKey = generatePostKey();
        const databaseRef = firebase.database().ref(`/request/${postKey}/`);

        databaseRef.set({
            mission: mission,
            email: email,
            postKey: postKey,
            dimension: dimensions
        }).then(() => {
            console.log('Data uploaded successfully!');
            showOverlay();
        }).catch(error => {
            console.error('Error uploading data:', error);
        });
    } else {
        alert('Please fill in all the fields.');
    }
}

function generatePostKey() {
    // Implement your logic to generate a unique key
    // You can use Firebase's push method to automatically generate a unique key
    return firebase.database().ref().push().key;
}

function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }
    
function hideOverlay() {
      document.getElementById('missionInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('dimensionInput').value = '';
    document.getElementById('overlay').style.display = 'none';
}

document.addEventListener('click', function(event) {
    // Check if the clicked element is not within the dialog container
    if (!event.target.closest('.dialog-container')) {
        hideOverlay();
    }
});