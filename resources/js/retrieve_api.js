const apiUrl = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=2';
const dataContainer = document.getElementById('data-container');
const loadingContainer = document.getElementById('loading-container');

async function displayData() {
  try {
    // Show loading state
    loadingContainer.textContent = 'Loading...';
    loadingContainer.style.color = 'white';

    const response = await fetch(apiUrl);
    const responseData = await response.json();

    // Access the 'results' property containing the array of launches
    const launches = responseData.results || [];

    // Display the first 5 items
launches.slice(0, 5).forEach(item => {
  // Create a div for each data item
  const dataItem = document.createElement('div');
  dataItem.classList.add('data-item');

  // Set background image
  dataItem.style.backgroundImage = `url(${item.image})`;

  // Create a div for the "RECENT LAUNCH" text
  const recentLaunchText = document.createElement('h1');
  recentLaunchText.textContent = 'RECENT LAUNCH';
  recentLaunchText.classList.add('recent-launch-text');
  dataItem.appendChild(recentLaunchText);

  // Extracting specific child values
  const name = item.name;
  const launchId = item.id; // Assuming ID is at the top level

  // Create elements for each extracted value
  const nameElement = document.createElement('h2');
  nameElement.textContent = `${name}`;

  // Create a right arrow button dynamically
  const arrowButton = document.createElement('button');
  arrowButton.innerHTML = 'SEE MORE &rarr;';
  arrowButton.addEventListener('click', function () {
    // Replace 'https://example.com' with the actual website URL
    window.location.href = `https://example.com?id=${launchId}`;
  });

  // Create a container for the arrow button
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  buttonContainer.appendChild(arrowButton);

  // Display the data items
  dataItem.appendChild(nameElement);
  dataItem.appendChild(buttonContainer);

  // Append the data item to the container
  dataContainer.appendChild(dataItem);
});

    // Hide loading state on successful data retrieval
    loadingContainer.textContent = '';
  } catch (error) {
    console.error('Error fetching data:', error);

    // Display an error message in case of an error
    loadingContainer.textContent = 'Error fetching data';
  }
}

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
