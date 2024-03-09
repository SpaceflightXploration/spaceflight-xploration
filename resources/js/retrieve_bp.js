document.addEventListener('DOMContentLoaded', function () {
    const databaseRef = firebase.database().ref("files");
    const dataList = document.getElementById("dataList");
    const buttonContainer = document.getElementById("buttonContainer");

    // Set the maximum number of items to retrieve
    const maxItems = 5;
    let itemsRetrieved = 0;

    // Retrieve data and populate the list
    databaseRef.once("value")
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                // Check if the maximum number of items has been reached
                if (itemsRetrieved >= maxItems) {
                    return; // Exit the loop
                }

                const { bp_name, image_url } = childSnapshot.val();
                const postKey = childSnapshot.key;

                // Create data item
                // Create data item
const dataItem = document.createElement("li");
dataItem.className = "data-item";

// Set background image using inline CSS
dataItem.style.backgroundImage = `url(${image_url})`;
dataItem.style.backgroundSize = "cover"; // Optional: adjust background size
dataItem.style.backgroundPosition = "center"; // Optional: adjust background position

// Append other content to data item
dataItem.innerHTML += `
    <h1>${bp_name}</h1>
    <button class="details-button" data-id="${postKey}">See Details</button>
`;

// Append data item to list
dataList.appendChild(dataItem);
                itemsRetrieved++; // Increment the counter
            });

            // Create button only if there are more items to load
            if (itemsRetrieved < snapshot.numChildren()) {
                const button = document.createElement("button");
                button.textContent = "Load More";
                button.addEventListener("click", function () {
                    // Handle button click, e.g., load more data
                    console.log("Button clicked!");
                });

                // Append button to the button container
                buttonContainer.appendChild(button);
            }

            // Add event listener for details buttons
            document.querySelectorAll('.details-button').forEach(button => {
                button.addEventListener('click', function () {
                    const postId = this.getAttribute('data-id');
                    console.log("See Details clicked for post ID:", postId);
                });
            });
        })
        .catch(error => console.error("Error retrieving data:", error));
});
