document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slideshow').forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slides');
        const dots = slideshow.querySelectorAll('.dot');
        const prevBtn = slideshow.querySelector('.arrow.left');
        const nextBtn = slideshow.querySelector('.arrow.right');

        let currentSlide = 0;
        let startX = 0;
        let endX = 0;

        function updateSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active-slide', i === index);
                dots[i].classList.toggle('active-dot', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide(currentSlide);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlide(currentSlide);
            });
        });

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        slides.forEach(slide => {
            slide.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            slide.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
        });

        function handleSwipe() {
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        }

        // Initialize first slide as active
        updateSlide(currentSlide);
    });
});
