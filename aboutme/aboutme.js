const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider');
let currentIndex = 0;

const getSlideWidth = () => document.querySelector('.slide').clientWidth; // Get dynamic width

const showSlide = (index) => {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    }

    slider.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
};

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

document.querySelector('.next').addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

// Ensure correct positioning on window resize
window.addEventListener('resize', () => showSlide(currentIndex));

showSlide(currentIndex);


// Infinite Testimonials Scroller

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion or has a higher screen width than 770px, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.innerWidth > 770) {
    addAnimation();
}


function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
        
    });
}