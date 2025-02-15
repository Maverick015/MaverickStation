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

const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

themeToggle.addEventListener('click', () => {
    // Toggle the dark mode class on the body
    document.body.classList.toggle('dark-mode');
    document.querySelector(".mainHeader")?.classList.toggle('dark-mode');
    document.querySelector(".portfolioTitle")?.classList.toggle('dark-mode');
    document.querySelector(".sidebar")?.classList.toggle('dark-mode');
    document.querySelector(".sidebar-container p")?.classList.toggle('dark-mode');

    // Loop through all elements with .cardWhite and toggle the class
    document.querySelectorAll(".bar-item").forEach(baritem => {
        baritem.classList.toggle('dark-mode');
    });

    // Loop through all elements with .cardWhite and toggle the class
    document.querySelectorAll(".filterButton").forEach(filterbtn => {
        filterbtn.classList.toggle('dark-mode');
    });

    // Loop through all elements with .cardWhite and toggle the class
    document.querySelectorAll(".cardWhite").forEach(card => {
        card.classList.toggle('dark-mode');
    });

    // Loop through all elements with .cardWhite and toggle the class
    document.querySelectorAll(".cardWhite h3").forEach(cardTitle => {
        cardTitle.classList.toggle('dark-mode');
    });

    // Loop through all elements with .cardWhite and toggle the class
    document.querySelectorAll(".cardWhite p").forEach(cardText => {
        cardText.classList.toggle('dark-mode');
    });

    // Loop through all elements with .cardWhite and toggle the class
    document.querySelectorAll(".discover").forEach(cardBtn => {
        cardBtn.classList.toggle('dark-mode');
    });

    // Check if dark mode is active
    const isDark = document.body.classList.contains('dark-mode');

    // Transition between the icons by adjusting opacity
    if (isDark) {
        sunIcon.style.opacity = 0;
        moonIcon.style.opacity = 1;
    } else {
        sunIcon.style.opacity = 1;
        moonIcon.style.opacity = 0;
    }
});

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

