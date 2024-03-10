// article.js

// Function to set the title based on the mission name from URL parameter
function setTitleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const missionName = urlParams.get('mission');
    if (missionName) {
        document.title = `sFlight X - ${missionName}`;
    }
}

// Set the title based on the mission name from URL parameter
setTitleFromUrl();

// Get the postKey from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const postKey = urlParams.get('id');

// Define the path to the Markdown file in Firebase Storage
const markdownFilePath = `static/articles/${postKey}.md`;

// Function to fetch and display Markdown content
function fetchAndDisplayMarkdown() {
    // Get a reference to the Markdown file in Firebase Storage
    const storageRef = firebase.storage().ref().child(markdownFilePath);

    // Get the download URL for the Markdown file
    storageRef.getDownloadURL().then(downloadURL => {
        // Fetch the Markdown content from the URL
        fetch(downloadURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Markdown content');
                }
                return response.text();
            })
            .then(markdownContent => {
                // Display the Markdown content in the HTML
                const markdownContainer = document.getElementById('markdownContainer');
                markdownContainer.innerHTML = markdownContent;
            })
            .catch(error => {
                console.error('Error fetching Markdown content:', error);
            });
    }).catch(error => {
        console.error('Error getting download URL:', error);
    });
}

// Call the function to fetch and display Markdown content
fetchAndDisplayMarkdown();