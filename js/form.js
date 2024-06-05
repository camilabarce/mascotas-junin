document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.file-input');
    const label = document.querySelector('.file-label');
    const preview = document.getElementById('preview');

    input.addEventListener('change', function () {
        const file = input.files[0];
        if (file) {
            const fileName = file.name;
            label.textContent = fileName;

            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            label.textContent = '📷 Foto de la mascota';
            preview.style.display = 'none';
            preview.src = '';
        }
    });
});
