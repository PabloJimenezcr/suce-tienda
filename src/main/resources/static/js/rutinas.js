
// Función para hacer un preview de una imagen
function mostrarImagen(input, previewId = 'blah') {
    if (input.files && input.files[0]) {
        const imagen = input.files[0];
        const maximo = 512 * 1024; // Se limita el tamaño a 512 Kb las imágenes.

        if (imagen.size <= maximo) {
            const lector = new FileReader();

            lector.onload = function (e) {
                $('#' + previewId)
                    .attr('src', e.target.result)
                    .height(200)
                    .removeClass('d-none');
            };

            lector.readAsDataURL(imagen);
        } else {
            alert("La imagen seleccionada es muy grande... no debe superar los 512 Kb!");
            input.value = '';

            const preview = document.getElementById(previewId);

            if (preview) {
                preview.removeAttribute('src');
                preview.classList.add('d-none');
            }
        }
    }
}


// Para insertar información en el modal según el registro
document.addEventListener('DOMContentLoaded', function () {
    const confirmModal = document.getElementById('confirmModal');

    if (confirmModal) {
        confirmModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            if (!button) {
                return;
            }

            const idInput = document.getElementById('modalId');
            const descripcion = document.getElementById('modalDescripcion');

            if (idInput) {
                idInput.value = button.getAttribute('data-bs-id') || '';
            }

            if (descripcion) {
                descripcion.textContent =
                    button.getAttribute('data-bs-descripcion') || '';
            }
        });
    }
});


// Toast personalizado: duración predeterminada de 5 segundos
document.addEventListener('DOMContentLoaded', function () {
    const DURACION_PREDETERMINADA = 5000;
    const TIEMPO_SALIDA = 300;

    function cerrarToast(toast) {
        if (!toast || toast.classList.contains('toast-leaving')) {
            return;
        }

        toast.classList.add('toast-leaving');

        window.setTimeout(function () {
            toast.classList.remove('show');

            if (toast.isConnected) {
                toast.remove();
            }
        }, TIEMPO_SALIDA);
    }

    document.querySelectorAll('.custom-toast').forEach(function (toast) {
        const botonCerrar = toast.querySelector('[data-toast-dismiss="true"]');

        if (botonCerrar) {
            botonCerrar.addEventListener('click', function () {
                cerrarToast(toast);
            });
        }

        const debeOcultarse =
            toast.getAttribute('data-toast-autohide') !== 'false';

        if (debeOcultarse) {
            const duracionIndicada = Number(
                toast.getAttribute('data-toast-duration')
            );

            const duracion = Number.isFinite(duracionIndicada)
                && duracionIndicada > 0
                ? duracionIndicada
                : DURACION_PREDETERMINADA;

            toast.style.setProperty('--toast-duration', duracion + 'ms');

            window.setTimeout(function () {
                cerrarToast(toast);
            }, duracion);
        }
    });
});
