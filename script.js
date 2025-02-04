document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slides');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');

    let currentSlide = 0;

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

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

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
});
