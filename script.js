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

let currentIndex = 0;
const totalItems = 4;
const visibleItems = 3;
let carouselInterval;

const carouselItems = document.querySelectorAll('.explore-carousel-item');
const knowMoreDivs = document.querySelectorAll('.know-more');

function moveCarousel() {
    currentIndex = (currentIndex + 1) % totalItems;

    carouselItems.forEach((item, index) => {
        let offset = (index - currentIndex + totalItems) % totalItems;

        if (offset < visibleItems) {
            item.style.display = 'flex';
            item.style.opacity = '1';
            
            if (offset === 0) {
                item.style.transform = 'translate(-50%, -50%) translateX(-220px) scale(0.8)';
                item.style.zIndex = 1;
            } else if (offset === 1) {
                item.style.transform = 'translate(-50%, -50%) translateX(0) scale(1.2)';
                item.style.zIndex = 2;
            } else if (offset === 2) {
                item.style.transform = 'translate(-50%, -50%) translateX(220px) scale(0.8)';
                item.style.zIndex = 1;
            }
        } else {
            setTimeout(() => {
                item.style.display = 'none';
            }, 500); // Match this to the CSS transition duration
            item.style.opacity = '0';
        }
    });
}

function startCarousel() {
    carouselInterval = setInterval(moveCarousel, 3500);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

function resumeCarousel() {
    startCarousel();
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
    // Set initial positions
    carouselItems.forEach((item, index) => {
        if (index < visibleItems) {
            item.style.display = 'flex';
            item.style.opacity = '1';
            if (index === 0) {
                item.style.transform = 'translate(-50%, -50%) translateX(-220px) scale(0.8)';
            } else if (index === 1) {
                item.style.transform = 'translate(-50%, -50%) translateX(0) scale(1.2)';
            } else if (index === 2) {
                item.style.transform = 'translate(-50%, -50%) translateX(220px) scale(0.8)';
            }
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });

    startCarousel();
});

