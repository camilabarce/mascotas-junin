document.addEventListener('DOMContentLoaded', function () {
	const botonPerros = document.getElementById("perros");
	const botonGatos = document.getElementById("gatos");
	const containerGatos = document.getElementById("gatosContainer");
	const containerPerros = document.getElementById("perrosContainer");

	botonPerros.addEventListener("click", (event) =>
		filtroPerrosOGatos(event, containerGatos, containerPerros, 'perros'));
	botonGatos.addEventListener("click", (event) =>
		filtroPerrosOGatos(event, containerPerros, containerGatos, 'gatos'));

	// Cargar la lista de gatos por defecto
	loadAnimalList('./data/gatos.json', 'gatos');
});

function filtroPerrosOGatos(event, containerAOcultar, containerAMostrar, animalType) {
	event.preventDefault();

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

	// Cargar la lista de perros o gatos al mostrar el contenedor correspondiente
	loadAnimalList(`./data/${animalType}.json`, animalType);
}

function loadAnimalList(dataFile, animalType) {
	fetch(dataFile)
		.then(response => response.json())
		.then(data => {
			const container = document.querySelector(`#${animalType}Container .cards-list`);
			container.innerHTML = '';

			for (const id in data) {
				const animal = data[id];
				const animalItem = `
                    <li class="cards-item">
                        <a href="ficha.html?animal=${animalType}&id=${id}&page=detail"><img src="${animal.imagen}" alt="Imagen de ${animal.nombre}"></a>
                        <div class="text-card-container">
                            <h3>${animal.nombre}</h3>
                            <p>${animal.sexo}, ${animal.edad}</p>
                        </div>
                    </li>`;
				container.insertAdjacentHTML('beforeend', animalItem);
			}
		})
		.catch(error => console.error(`Error al cargar la lista de ${animalType}:`, error));
}

function loadAnimalDetail(dataFile, animalId, animalType) {
	fetch(dataFile)
		.then(response => response.json())
		.then(data => {
			const animalData = data[animalId];
			if (!animalData) {
				console.error(`${animalType} no encontrado`);
				return;
			}

			document.querySelector('.ficha-container img').src = animalData.imagen;
			document.querySelector('.ficha-container h2').innerText = animalData.nombre;
			document.querySelector('.ficha-container .texto h3').innerText = animalData.edad;
			document.querySelector('.gris-container.sexo p').innerText = animalData.sexo;
			document.querySelector('.gris-container.tamaño p').innerText = animalData.tamaño;
			document.querySelector('.gris-container.peso p').innerText = animalData.peso;
			document.querySelector('.gris-container.esterilizacion p').innerHTML = animalData.esterilizacion ? "<i class='bx bxs-check-circle'></i>" : "<i class='bx bxs-x-circle'></i>";
			document.querySelector('.gris-container.vacunacion p').innerText = animalData.vacunacion;
			document.querySelector('.parrafo-ficha').innerText = animalData.descripcion;
			document.querySelector('.nombre').innerText = animalData.contacto.nombre;
			document.querySelector('.info-persona img').src = animalData.contacto.imagen;
			document.querySelector('.info-persona h3').innerText = animalData.contacto.nombre;
			document.querySelector('.info-persona a').href = "https://wa.me/" + animalData.contacto.whatsapp + "?text=%C2%A1Hola%21%20Quiero%20adoptar";
		})
		.catch(error => console.error(`Error al cargar la ficha del ${animalType}:`, error));
}
