const botonPerros = document.getElementById("perros");
const botonGatos = document.getElementById("gatos");
const containerGatos = document.getElementById("gatosContainer");
const containerPerros = document.getElementById("perrosContainer");

function filtroPerrosOGatos(e, containerAOcultar, containerAMostrar) {
	e.preventDefault();

	if (!containerAMostrar.classList.contains("hide")) {
		return; // si el contenedor a mostrar ya está visible, no hacer nada
	}

	containerAOcultar.classList.add("fade-out");

	containerAOcultar.addEventListener('transitionend', function handleTransitionEnd() {
		containerAOcultar.classList.add("hide");
		containerAOcultar.classList.remove("fade-out");
		containerAOcultar.removeEventListener('transitionend', handleTransitionEnd);
	});

	containerAMostrar.classList.remove("hide");
	containerAMostrar.classList.add("fade-in");
}

botonPerros.addEventListener("click", (event) =>
	filtroPerrosOGatos(event, containerGatos, containerPerros));
botonGatos.addEventListener("click", (event) =>
	filtroPerrosOGatos(event, containerPerros, containerGatos));
