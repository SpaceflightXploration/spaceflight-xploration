const apiUrl = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5';
const dataContainer = document.getElementById('data-container');
const loadingContainer = document.getElementById('loading-container');

async function displayData() {
  try {
    // Show loading state
    loadingContainer.textContent = 'Loading...';

    const response = await fetch(apiUrl);
    const responseData = await response.json();

    // Access the 'results' property containing the array of launches
    const launches = responseData.results || [];

    // Display the first 5 items
    launches.slice(0, 5).forEach(item => {
      // Create a div for each data item
      const dataItem = document.createElement('div');
      dataItem.classList.add('data-item');

      // Extracting specific child values
      const name = item.name;
      const image = item.image;
      const net = item.net;
      const padName = item.pad.name; // Nested value under pad
      const locationName = item.pad.location.name; // Nested value under location
      const launchId = item.id; // Assuming ID is at the top level

      // Create elements for each extracted value
      const nameElement = document.createElement('h2');
      nameElement.textContent = `${name}`;

      const imageElement = document.createElement('img');
      imageElement.src = image;
      imageElement.alt = name; // Add alt text for accessibility

      imageElement.onerror = function () {
        // Image failed to load, switch to the fallback image
        imageElement.src = 'https://firebasestorage.googleapis.com/v0/b/sfs-bp-store.appspot.com/o/static%2Flogo%2Fsfex_rocket_app.png?alt=media&token=3bba21da-9a41-45ac-82ca-0318190e8f42';
      };

      const netElement = document.createElement('p');
      netElement.textContent = `${net}`;

      const padNameElement = document.createElement('p');
      padNameElement.textContent = `${padName}, ${locationName}`;

      // Create a right arrow button dynamically
      const arrowButton = document.createElement('button');
      arrowButton.innerHTML = '&rarr; More Details';
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
      dataItem.appendChild(imageElement);
      dataItem.appendChild(netElement);
      dataItem.appendChild(padNameElement);
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

// Call the function to initially display data
displayData();