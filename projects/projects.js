// Function to fetch the latest commits from the GitHub API
document.addEventListener("DOMContentLoaded", function() {
    const repoOwner = "Maverick015";
    const repoName = "MaverickStation";
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(commits => {
            const commitList = document.getElementById("commitHistory");
            
            // Loop through the first 10 commits and display them
            commits.slice(0, 10).forEach(commit => {
                const listItem = document.createElement("li");
                listItem.classList.add("commit-item");

                // Split commit message into title and description
                const messageParts = commit.commit.message.split("\n");
                const title = messageParts[0];  
                const description = messageParts.slice(1).join(" ");

                listItem.innerHTML = `
                <a href="${commit.html_url}" target="_blank" class="commit-link">
                <div class="commit-container">
                    <h4 class="commit-title"><img class="theme-image" data-light="../images/github.png" data-dark="../images/dm-github.png" src="../images/github.png" alt="Github Logo">${title}</h4>
                    <p class="commit-desc">${description}</p>
                </div>
                </a>
            `;
                commitList.appendChild(listItem);
            });

            // Update the themeImages NodeList to include newly added images
            themeImages = document.querySelectorAll('.theme-image');

            // Update theme images after commits are loaded
            updateThemeImages();
        })
        .catch(error => console.error("Error fetching commits:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    filterSelection("ALL"); // Show all cards by default

    document.querySelectorAll(".filterButton").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".filterButton.active")?.classList.remove("active");
            this.classList.add("active");
            filterSelection(this.textContent.trim());
        });
    });
});

function filterSelection(category) {
    document.querySelectorAll(".cardFilter").forEach(card => {
        // Split card.id into an array of IDs)
        const cardIds = card.id.split(" ");

        // Toggle the 'show' class based on whether the category matches any card's IDs
        const isMatchingCategory = category === "ALL" || cardIds.includes(category);

        // Apply the 'show' class based on the matching condition
        card.classList.toggle("show", isMatchingCategory);
    });
}


// Function to open the sidebar with animation
function ms_open() {
    var sidebar = document.getElementById("mySidebar");
    var overlay = document.getElementById("myOverlay");

    // Show the sidebar and overlay
    sidebar.style.display = "block";
    overlay.style.display = "block";

    // Remove the reverse animation if it's there, then trigger the open animation
    sidebar.classList.remove('animate-left-reverse');
    sidebar.classList.add('animate-left');

    // Reset animation to allow it to play again
    sidebar.offsetHeight; 

    // Add the opening animation again
    sidebar.classList.add('animate-left');
}

// Function to close the sidebar with animation
function ms_close() {
    var sidebar = document.getElementById("mySidebar");
    var overlay = document.getElementById("myOverlay");

    // Remove the open animation and add the closing animation
    sidebar.classList.remove('animate-left');
    sidebar.classList.add('animate-left-reverse');

    // Wait for the animation to end before hiding the sidebar
    sidebar.addEventListener('animationend', function () {
        // Hide the sidebar and overlay only after the animation completes
        sidebar.style.display = "none";
        overlay.style.display = "none";
    }, { once: true }); // Ensure the event listener is triggered only once
}