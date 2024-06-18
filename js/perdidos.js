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
                        <a href="#open-modal" class="open-modal" data-id="${id}"><img src="${pet.img}" alt="Imagen de ${pet.nombre}"></a>
                        <div class="text-card-container perdidos">
                            <h3>${pet.nombre}</h3>
                            <div class="parrafos-fecha-perdidos">
                                <p>Se perdió el</p>
                                <p>${pet.fecha}</p>
                            </div>
                        </div>
                    </li>`;
                container.insertAdjacentHTML('beforeend', petItem);
            }

            //event listener al modal
            const modalLinks = document.querySelectorAll('.open-modal');
            modalLinks.forEach(link => {
                link.addEventListener('click', function (event) {
                    const petId = this.getAttribute('data-id');
                    openModal(data[petId]);
                });
            });
        })
        .catch(error => console.error('Error al cargar la lista de mascotas perdidas:', error));
}

function openModal(petData) {
    document.getElementById('modal-nombre').innerText = petData.nombre;
    document.getElementById('modal-descripcion').innerText = petData.descripcion;
    document.getElementById('modal-fecha-barrio').innerText = `🗓️ Fue visto por última vez el ${petData.fecha} en ${petData.barrio}`;
    document.getElementById('modal-contacto').innerText = `📲 Si lo viste, avisá al ${petData.contacto} (${petData['nombre-dueno']})`;
}