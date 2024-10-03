$('#offcanvasMenu').on('show.bs.collapse', function () {
    $('#offcanvasMenuContent').addClass('show');
}).on('hide.bs.collapse', function () {
    $('#offcanvasMenuContent').removeClass('show');
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logoImg = document.getElementById('logo-img');
    const logoText = document.getElementById('logo-text');
    
    if (window.scrollY > document.querySelector('.hero-section').offsetHeight - header.offsetHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const knowMoreDivs = document.querySelectorAll('.know-more');
let carouselInterval;
let currentIndex = 0;

// Function to move the carousel (same as before)
function moveCarousel() {
    const carouselItems = document.querySelectorAll('.explore-carousel-item');
    carouselItems.forEach((item, index) => {
        item.style.transition = 'transform 0.3s ease, z-index 0s';
    });

    const prevIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
    const nextIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;

    if (window.innerWidth <= 768) {
        carouselItems[prevIndex].style.transform = 'translateX(-130px) scale(0.6)';
        carouselItems[currentIndex].style.transform = 'translateX(0) scale(1.0)';
        carouselItems[currentIndex].style.zIndex = 1;
        carouselItems[nextIndex].style.transform = 'translateX(130px) scale(0.6)';
    } else {
        carouselItems[prevIndex].style.transform = 'translateX(-160px) scale(0.8)';
        carouselItems[currentIndex].style.transform = 'translateX(0) scale(1.2)';
        carouselItems[currentIndex].style.zIndex = 1;
        carouselItems[nextIndex].style.transform = 'translateX(160px) scale(0.8)';
    }

    currentIndex = nextIndex;
}

// Function to toggle the "know more" div and stop/resume the carousel
function toggleAccordion(index) {
    const selectedDiv = knowMoreDivs[index];

    // If the selected div is currently visible, hide it and resume the carousel
    if (selectedDiv.style.display === 'block') {
        selectedDiv.style.display = 'none';
        resumeCarousel();  // Resume the carousel when the div is hidden
    } else {
        // Hide all know-more divs first
        knowMoreDivs.forEach((div) => {
            div.style.display = 'none';
        });

        // Show the clicked "know more" div and stop the carousel
        selectedDiv.style.display = 'block';
        stopCarousel();  // Stop the carousel when any know-more div is shown
    }
}

// Start the carousel with an interval
function startCarousel() {
    carouselInterval = setInterval(moveCarousel, 3500);
}

// Stop the carousel
function stopCarousel() {
    clearInterval(carouselInterval);
}

// Resume the carousel
function resumeCarousel() {
    startCarousel();
}

// Add event listener to adjust on window resize
window.addEventListener('resize', moveCarousel);

// Initially start the carousel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startCarousel();  // Start the carousel on page load
});


