document.addEventListener('DOMContentLoaded', function () {
    loadLostPetsList('./data/perdidos.json');
});

function loadLostPetsList(dataFile) {
    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('#perdidosList');
            container.innerHTML = '';

            for (const id in data) {
                const pet = data[id];
                const petItem = `
                    <li class="cards-item perdidos">
                        <img src="${pet.img}" alt="Imagen de ${pet.nombre}">
                        <div class="text-card-container">
                            <h3>${pet.nombre}</h3>
                            <p>Perdido el ${pet.fecha}</p>
                        </div>
                    </li>`;
                container.insertAdjacentHTML('beforeend', petItem);
            }
        })
        .catch(error => console.error(`Error al cargar la lista de mascotas perdidas:`, error));
}
