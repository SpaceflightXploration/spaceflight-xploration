const dataContainer = document.getElementById('data-container');
const loadingContainer = document.getElementById('loading-container');

async function displayData() {
    try {
        // Show loading state
        loadingContainer.textContent = 'Loading...';
        loadingContainer.style.color = 'white';

        // Fetch upcoming launches from Firebase
        const upcomingLaunchesRef = firebase.database().ref('/launch_manifest/upcoming');
        const snapshot = await upcomingLaunchesRef.once('value');
        const upcomingLaunches = snapshot.val() || [];

        console.log('Upcoming Launches:', upcomingLaunches); // Log upcoming launches data

        // Display the upcoming launches
        Object.entries(upcomingLaunches).forEach(([postKey, launch]) => {
            displayLaunch(launch, postKey);
        });

        // Hide loading state on successful data retrieval
        loadingContainer.textContent = '';
    } catch (error) {
        console.error('Error fetching data:', error);

        // Display an error message in case of an error
        loadingContainer.textContent = 'Error fetching data';
    }
}

function displayLaunch(launch, postKey) {
    // Create a div for each data item
    const dataItem = document.createElement('div');
    dataItem.classList.add('data-item');

    // Create elements for launch information
    const missionNameElement = document.createElement('h2');
    missionNameElement.textContent = launch.mission;

    // Create an image element
    const imageElement = document.createElement('img');
    imageElement.src = launch.imageUrl; // Assuming 'imageUrl' is the key for the image URL in your database
    imageElement.alt = launch.image; // Use mission name as alt text

    console.log('Image URL:', launch.imageUrl); // Log image URL

    // Create a right arrow button dynamically
    const arrowButton = document.createElement('button');
    arrowButton.innerHTML = 'SEE MORE &rarr;';
    arrowButton.addEventListener('click', function () {
        // Replace 'https://example.com' with the actual website URL
        window.location.href = `data/upload/article.html?id=${postKey}&mission=${launch.mission}`;
    });

    // Create a container for the arrow button
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(arrowButton);

    // Display the launch information
    dataItem.appendChild(imageElement);
    dataItem.appendChild(missionNameElement);
    dataItem.appendChild(buttonContainer);

    // Append the data item to the container
    dataContainer.appendChild(dataItem);
}

// Trigger displayData function when the page loads
window.onload = displayData;

// Add scroll behavior (if needed)
let lastScrollTop = 0;
const header = document.querySelector('header');
const triggerPosition = window.innerHeight * 1.25; // 125vh

document.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop && currentScroll > triggerPosition) {
        // Scroll down and position is past the trigger position
        header.classList.add('header-hide');
    } else {
        // Scroll up or position is within the trigger position
        header.classList.remove('header-hide');
    }

    lastScrollTop = currentScroll;
});

// Trigger displayData function when the page loads
window.onload = displayData;
