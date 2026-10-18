function initializeSlideNavigation(previousSlide, nextSlide) {
    const controls = document.getElementById('slide-navigation');
    const previous = document.getElementById('slide-previous');
    const next = document.getElementById('slide-next');
    const slides = document.querySelectorAll('.slide, .slide-container');

    function syncButtons() {
        previous.disabled = slides[0].classList.contains('active');
        next.disabled = slides[slides.length - 1].classList.contains('active');
    }

    previous.addEventListener('click', () => {
        previousSlide();
        syncButtons();
    });
    next.addEventListener('click', () => {
        nextSlide();
        syncButtons();
    });

    // Let native button activation handle Space/Enter, not the deck's keyboard shortcuts.
    controls.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.stopPropagation();
        }
    });

    // Keyboard navigation and other existing controllers also change the active class.
    const observer = new MutationObserver(syncButtons);
    slides.forEach((slide) => observer.observe(slide, {
        attributes: true,
        attributeFilter: ['class']
    }));
    syncButtons();
}
