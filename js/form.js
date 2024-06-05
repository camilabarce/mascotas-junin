document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-perdidos');
    const inputs = document.querySelectorAll('.input');
    const fileInput = document.querySelector('.file-input');
    const label = document.querySelector('.file-label');
    const preview = document.getElementById('preview');

    // Validate form inputs on change and input events
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
    });

    fileInput.addEventListener('change', function () {
        validateFileInput();

        const file = fileInput.files[0];
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

    form.addEventListener('submit', function (event) {
        let valid = true;
        inputs.forEach(input => {
            if (!validateInput({ target: input })) {
                valid = false;
            }
        });

        if (!validateFileInput()) {
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    function validateInput(event) {
        const input = event.target;
        if (input.checkValidity()) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            return true;
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            return false;
        }
    }

    function validateFileInput() {
        if (fileInput.files.length > 0) {
            fileInput.classList.add('valid');
            fileInput.classList.remove('invalid');
            return true;
        } else {
            fileInput.classList.add('invalid');
            fileInput.classList.remove('valid');
            return false;
        }
    }
});
