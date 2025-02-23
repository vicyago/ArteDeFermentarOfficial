document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.index-product-slider');
    const prevButton = document.querySelector('.index-prev-button');
    const nextButton = document.querySelector('.index-next-button');
    const cards = document.querySelectorAll('.index-product-card');
    
    if (!slider || !prevButton || !nextButton || cards.length === 0) return;
    
    let currentPosition = 0;
    let cardWidth = cards[0].offsetWidth + 20; // Including gap
    let cardsPerView = Math.floor(slider.parentElement.offsetWidth / cardWidth);
    
    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentPosition}px)`;
    }
    
    function updateMeasurements() {
        cardWidth = cards[0].offsetWidth + 20;
        cardsPerView = Math.floor(slider.parentElement.offsetWidth / cardWidth);
    }
    
    nextButton.addEventListener('click', () => {
        const maxPosition = -(cards.length - cardsPerView) * cardWidth;
        if (currentPosition > maxPosition) {
            currentPosition -= cardWidth;
            updateSliderPosition();
        }
    });
    
    prevButton.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += cardWidth;
            updateSliderPosition();
        }
    });
    
    window.addEventListener('resize', () => {
        updateMeasurements();
        currentPosition = 0;
        updateSliderPosition();
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                nextButton.click();
            } else {
                prevButton.click();
            }
        }
    }, { passive: true });
});