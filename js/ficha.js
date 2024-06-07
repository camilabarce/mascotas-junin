document.addEventListener('DOMContentLoaded', function () {
    const params = getQueryParams();
    const animalType = params.animal;
    const animalId = params.id;

    if (animalType && animalId) {
        loadAnimalDetail(`./data/${animalType}.json`, animalId, animalType);
    } else {
        console.error('Parámetros de URL faltantes');
    }

    const shareBtn = document.getElementById('shareBtn');

    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(function () {
                Toastify({
                    text: "Link copiado al portapapeles",
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #f8f8f8, #88B04B)",
                        color: "#1e1e1e",
                        borderRadius: ".5rem"
                    },
                }).showToast();
            }, function (err) {
                console.error('Error al copiar el enlace: ', err);
            });
        });
    }
});

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1);
    const queryArray = queryString.split('&');

    queryArray.forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });

    return params;
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
            document.querySelector('.info-persona h3').innerText = animalData.contacto.nombre + " " + animalData.contacto.apellido;
            document.querySelector('.info-persona a').href = "https://wa.me/" + animalData.contacto.whatsapp + "?text=%C2%A1Hola%21%20Quiero%20adoptar";
        })
        .catch(error => console.error(`Error al cargar la ficha del ${animalType}:`, error));
}
