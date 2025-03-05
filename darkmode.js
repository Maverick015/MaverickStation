const themeToggles = document.querySelectorAll('.theme-toggle'); // Supports multiple buttons
let themeImages = document.querySelectorAll('.theme-image');

// Attach event listeners to all theme toggles
themeToggles.forEach(toggle => {
    toggle.addEventListener('click', async () => {
        if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            toggleDarkMode(); 
            return;
        }

        await document.startViewTransition(() => {
            toggleDarkMode();
        }).ready;

        applyTransitionEffect(toggle); 
    });
});

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    
    // Store the user's preference in localStorage
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    updateThemeImages();  // Only needed if images change
    updateIconOpacity();  // Only needed if toggling icons
};

const updateThemeElements = () => {
    const isDark = document.body.classList.contains('dark-mode');

    // Update images based on dark mode status
    updateThemeImages();

    // Update sun/moon icon visibility
    updateIconOpacity();

    document.querySelectorAll('.theme-dependent').forEach(el => {
        el.classList.toggle('dark-theme-style', isDark);
    });

    console.log("Theme updated:", isDark ? "Dark Mode" : "Light Mode");
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
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }

    updateThemeElements();
    updateThemeImages();
    updateIconOpacity();
});
