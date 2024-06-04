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