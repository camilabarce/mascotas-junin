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
                        <a href="ficha.html?animal=${animalType}&id=${id}" onclick="saveAnimalToLocalStorage('${animalType}', '${id}')"><img src="${animal.imagen}" alt="Imagen de ${animal.nombre}"></a>
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

function saveAnimalToLocalStorage(animalType, animalId) {
    localStorage.setItem('selectedAnimalType', animalType);
    localStorage.setItem('selectedAnimalId', animalId);
}