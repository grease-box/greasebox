// Offcanvas menu
$('#offcanvasMenu').on('show.bs.collapse', function () {
    $('#offcanvasMenuContent').addClass('show');
}).on('hide.bs.collapse', function () {
    $('#offcanvasMenuContent').removeClass('show');
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Carousel variables
let currentIndex = 0;
const totalItems = 4;
const visibleItems = 3;
let carouselInterval;
let touchStartX = 0;
let touchEndX = 0;

const carouselItems = document.querySelectorAll('.explore-carousel-item');
const knowMoreDivs = document.querySelectorAll('.know-more');

function getResponsiveValues() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        return { translateOffset: 130, scaleCenter: 1, scaleSides: 0.8 };
    } else if (screenWidth < 1024) {
        return { translateOffset: 150, scaleCenter: 1.1, scaleSides: 0.85 };
    } else {
        return { translateOffset: 220, scaleCenter: 1.2, scaleSides: 0.8 };
    }
}

function moveCarousel(direction = 1) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateCarousel();
}

function updateCarousel() {
    const { translateOffset, scaleCenter, scaleSides } = getResponsiveValues();

    carouselItems.forEach((item, index) => {
        const position = (index - currentIndex + carouselItems.length) % carouselItems.length;
        if (position < visibleItems) {
            item.style.display = 'flex';
            item.style.opacity = '1';
            if (position === 0) {
                item.style.transform = `translate(-50%, -50%) translateX(-${translateOffset}px) scale(${scaleSides})`;
            } else if (position === 1) {
                item.style.transform = `translate(-50%, -50%) translateX(0) scale(${scaleCenter})`;
            } else if (position === 2) {
                item.style.transform = `translate(-50%, -50%) translateX(${translateOffset}px) scale(${scaleSides})`;
            }
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

function startCarousel() {
    carouselInterval = setInterval(() => moveCarousel(1), 3500);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

function resumeCarousel() {
    startCarousel();
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (touchStartX - touchEndX > 75) {
        moveCarousel(1); // Swipe left
    } else if (touchEndX - touchStartX > 75) {
        moveCarousel(-1); // Swipe right
    }
    touchStartX = 0;
    touchEndX = 0;
}

function toggleAccordion(index) {
    const selectedDiv = knowMoreDivs[index];

    if (selectedDiv.style.display === 'block') {
        selectedDiv.style.display = 'none';
        resumeCarousel();
    } else {
        knowMoreDivs.forEach((div) => div.style.display = 'none');
        selectedDiv.style.display = 'block';
        stopCarousel();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.explore-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', handleTouchStart, false);
        carouselContainer.addEventListener('touchmove', handleTouchMove, false);
        carouselContainer.addEventListener('touchend', handleTouchEnd, false);
    }
    

    updateCarousel();
    startCarousel();
});

// Add event listener for window resize
window.addEventListener('resize', updateCarousel);