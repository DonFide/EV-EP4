
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (event) {
       
        let isValid = true;
        let errorMessage = '';

        const inputs = form.querySelectorAll('input, textarea');

        // Función para validar solo letras
        function soloLetras(text) {
            const letras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            return letras.test(text);
        }

        // Función para validar longitud de un número
        function lengthNumber(number, min, max) {
            return number.length >= min && number.length <= max;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Validación de campos
        inputs.forEach(input => {
            const value = input.value.trim();
            const label = input.name || input.id;

            // Verifica si es requerido y está vacío
            if (input.required && !value) {
                isValid = false;
                errorMessage += `El campo "${label}" no puede estar vacío. <br>`;
            }

            // Validación para el campo "name" (solo letras)
            if (input.name === 'nombre' && value) {
                if (!soloLetras(value)) {
                    isValid = false;
                    errorMessage += `El campo "Nombre" debe contener solo letras. <br>`;
                }
            }

            // Validación para el campo "dni" (longitud 8)
            if (input.name === 'dni' && value) {
                if (!lengthNumber(value, 8, 8)) {
                    isValid = false;
                    errorMessage += `El campo "DNI" debe tener una longitud de 8 caracteres. <br>`;
                }
            }

            // Validación para el campo "phone-number" (longitud 9)
            if (input.name === 'telefono' && value) {
                if (!lengthNumber(value, 9, 9)) {
                    isValid = false;
                    errorMessage += `El campo "Teléfono" debe tener una longitud de 9 caracteres. <br>`;
                }
            }
        });

        const alertContainer = document.getElementById('alert-container');
        const alertMessageElement = document.getElementById('alert-mensaje');

        if (alertContainer && alertMessageElement) {
            if (!isValid) {
                event.preventDefault();
                // alertMessageElement.innerHTML = errorMessage;
                // alertContainer.style.display = 'block';
            } else {
                // alertMessageElement.innerHTML = `Nuevo registro creado exitosamente.`;
                // alertContainer.style.display = 'block';

                // setTimeout(() => {
                //     alertContainer.style.display = 'none';
                // }, 5000);
            }
        }
    });
});

// Escuchar el botón de cerrar alerta
const cerrarAlert = document.getElementById('cerrar-alert');
if (cerrarAlert) {
    cerrarAlert.addEventListener('click', function () {
        document.getElementById('alert-container').style.display = 'none';
    });
}
