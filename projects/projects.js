document.addEventListener("DOMContentLoaded", () => {
    filterSelection("ALL"); // Show all cards initially

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
        card.classList.toggle("show", category === "ALL" || card.id === category);
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
    sidebar.classList.remove('animate-left-reverse');  // Remove closing animation
    sidebar.classList.add('animate-left');  // Add opening animation

    // Reset animation to allow it to play again
    sidebar.offsetHeight;  // Trigger reflow to reset the animation

    // Add the opening animation again
    sidebar.classList.add('animate-left');
}

// Function to close the sidebar with animation
function ms_close() {
    var sidebar = document.getElementById("mySidebar");
    var overlay = document.getElementById("myOverlay");

    // Remove the open animation and add the closing animation
    sidebar.classList.remove('animate-left');  // Remove open animation
    sidebar.classList.add('animate-left-reverse');  // Add close animation

    // Wait for the animation to end before hiding the sidebar
    sidebar.addEventListener('animationend', function () {
        // Hide the sidebar and overlay only after the animation completes
        sidebar.style.display = "none";
        overlay.style.display = "none";
    }, { once: true }); // Ensure the event listener is triggered only once
}