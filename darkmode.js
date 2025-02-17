const themeToggles = document.querySelectorAll('.theme-toggle'); // Supports multiple buttons
const themeImages = document.querySelectorAll('.theme-image');

// Attach event listeners to all theme toggles
themeToggles.forEach(toggle => {
    toggle.addEventListener('click', async () => {
        if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            toggleDarkMode(); // Fall back to normal toggle
            return;
        }

        await document.startViewTransition(() => {
            toggleDarkMode();
        }).ready;

        applyTransitionEffect(toggle); // Pass the clicked toggle button
    });
});

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    updateThemeElements();
    updateThemeImages();
    updateIconOpacity();
};

// Toggle dark mode for all relevant elements
const updateThemeElements = () => {
    const darkModeElements = [
        ".mainHeader", ".portfolioTitle", ".sidebar", ".sidebar-container p",
        ".bar-item", ".filterButton", ".cardWhite", ".cardWhite h3", ".cardWhite p", ".discover"
    ];
    darkModeElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.classList.toggle('dark-mode'));
    });
};

// Update images based on dark mode status
const updateThemeImages = () => {
    const isDark = document.body.classList.contains('dark-mode');
    themeImages.forEach(image => {
        image.src = isDark ? image.getAttribute('data-dark') : image.getAttribute('data-light');
    });
};

// Update icon opacity based on dark mode state
const updateIconOpacity = () => {
    const isDark = document.body.classList.contains('dark-mode');

    document.querySelectorAll('.sun-icon').forEach(icon => {
        icon.style.opacity = isDark ? 0 : 1;
    });

    document.querySelectorAll('.moon-icon').forEach(icon => {
        icon.style.opacity = isDark ? 1 : 0;
    });
};

// Apply transition effect to the page elements
const applyTransitionEffect = (clickedToggle) => {
    const { top, left, width, height } = clickedToggle.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
        {
            clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`
            ]
        },
        {
            duration: 1000,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
        }
    );
};

// Ensure icons update correctly on page load
document.addEventListener('DOMContentLoaded', () => {
    updateIconOpacity();
});
