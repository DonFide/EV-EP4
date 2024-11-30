
document.addEventListener("DOMContentLoaded", function() {
    const deleteButtons = document.querySelectorAll('.delete-row');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showAlert("Registro eliminado exitosamente.")
        });
    });

    // Función para mostrar la alerta
    function showAlert(message) {
        const alertContainer = document.getElementById('alert-container');
        const alertMessageElement = document.getElementById('alert-mensaje');
        
        if (alertContainer && alertMessageElement) {
            alertMessageElement.textContent = message;
            alertContainer.style.display = 'block';
            setTimeout(() => {
                alertContainer.style.display = 'none';
            }, 1000);
        }
    }
});
