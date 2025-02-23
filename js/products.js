document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".product-slider");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const cards = document.querySelectorAll(".product-card");

    if (!slider || !prevButton || !nextButton || cards.length === 0) return;

    let currentPosition = 0;
    let cardWidth = cards[0].offsetWidth + 20; // Including gap
    let cardsPerView = Math.floor(slider.offsetWidth / cardWidth);

    // Update measurements on window resize
    function updateMeasurements() {
        cardWidth = cards[0].offsetWidth + 20; // Including gap
        cardsPerView = Math.floor(slider.offsetWidth / cardWidth);
        // Reset position when resizing
        currentPosition = 0;
        updateSliderPosition();
    }

    window.addEventListener("resize", updateMeasurements);

    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentPosition}px)`;
    }

    function moveNext() {
        const maxPosition = -(cards.length - cardsPerView) * cardWidth;
        if (currentPosition > maxPosition) {
            currentPosition -= cardWidth;
            if (currentPosition < maxPosition) {
                currentPosition = maxPosition;
            }
            updateSliderPosition();
        }
    }

    function movePrev() {
        if (currentPosition < 0) {
            currentPosition += cardWidth;
            if (currentPosition > 0) {
                currentPosition = 0;
            }
            updateSliderPosition();
        }
    }

    // Button controls
    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", movePrev);

    // Touch controls
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.touches[0].clientX;
        },
        { passive: true }
    );

    slider.addEventListener("touchmove", (e) => {
        e.preventDefault(); // Prevent page scrolling while sliding
    });

    slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) {
            // Minimum swipe distance
            if (difference > 0) {
                moveNext();
            } else {
                movePrev();
            }
        }
    });

    // Initial setup
    updateMeasurements();
});
