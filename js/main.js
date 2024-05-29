document.querySelector(".boton-menu").addEventListener("click", animarBoton);

let span1 = document.querySelector(".span1-menu");
let span2 = document.querySelector(".span2-menu");
let span3 = document.querySelector(".span3-menu");

let menu = document.querySelector(".nav");

function animarBoton() {
	span1.classList.toggle("active_span1-menu");
	span2.classList.toggle("active_span2-menu");
	span3.classList.toggle("active_span3-menu");
	menu.classList.toggle("contenedor-menu");
}

document.addEventListener("click", function (event) {
	let clickEnMenu = menu.contains(event.target);
	let clickEnBoton = document.querySelector(".boton-menu").contains(event.target);

	if (!clickEnMenu && !clickEnBoton && menu.classList.contains("contenedor-menu")) {
		animarBoton();
	}
});

document.addEventListener('DOMContentLoaded', (event) => {
	const slides = document.querySelectorAll('.slider li');
	const dots = document.querySelectorAll('.menu-slider li a');
	let currentSlide = 0;
	let slideInterval;

	function showSlide(index) {
		// Remove active class from all slides and dots
		slides.forEach(slide => slide.classList.remove('active'));
		dots.forEach(dot => dot.classList.remove('active'));

		// Set the current slide index
		currentSlide = index;

		// Add active class to the current slide and dot
		slides[currentSlide].classList.add('active');
		dots[currentSlide].classList.add('active');
	}

	function nextSlide() {
		// Increment the current slide index
		currentSlide = (currentSlide + 1) % slides.length;

		// Show the next slide
		showSlide(currentSlide);
	}

	function startSlideShow() {
		// Change slide every 5 seconds
		slideInterval = setInterval(nextSlide, 3500);
	}

	function resetSlideShow() {
		// Clear the existing interval and start a new one
		clearInterval(slideInterval);
		startSlideShow();
	}

	// Initial setup: show the first slide
	showSlide(currentSlide);
	startSlideShow();

	// Add event listeners to the dots
	dots.forEach((dot, index) => {
		dot.addEventListener('click', (event) => {
			event.preventDefault();
			showSlide(index);
			resetSlideShow();
		});
	});
});
