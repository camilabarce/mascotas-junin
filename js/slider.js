document.addEventListener('DOMContentLoaded', (event) => {
	const slides = document.querySelectorAll('.slider li');
	const dots = document.querySelectorAll('.menu-slider li a');
	let currentSlide = 0;
	let slideInterval;

	function showSlide(index) {
		slides.forEach(slide => slide.classList.remove('active'));
		dots.forEach(dot => dot.classList.remove('active'));

		currentSlide = index;

		slides[currentSlide].classList.add('active');
		dots[currentSlide].classList.add('active');
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length;

		showSlide(currentSlide);
	}

	function startSlideShow() {
		slideInterval = setInterval(nextSlide, 3500);
	}

	function resetSlideShow() {
		clearInterval(slideInterval);
		startSlideShow();
	}

	showSlide(currentSlide);
	startSlideShow();

	dots.forEach((dot, index) => {
		dot.addEventListener('click', (event) => {
			event.preventDefault();
			showSlide(index);
			resetSlideShow();
		});
	});
});