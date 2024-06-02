const botonSubir = document.getElementById('btn-up');

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

botonSubir.addEventListener('click', function () {
	subirAlTope();
});

function subirAlTope() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}