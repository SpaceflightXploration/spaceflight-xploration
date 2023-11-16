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

                const { bp_name, type, image_url } = childSnapshot.val();
                const postKey = childSnapshot.key;

                // Create data item
                const dataItem = document.createElement("li");
                dataItem.className = "data-item";
                dataItem.innerHTML = `
                    <img src="${image_url}" alt="Image">
                    <h3>${bp_name}</h3>
                    <p>Type: ${type}</p>
                    <button class="details-button" data-id="${postKey}">See Details</button>
                `;

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