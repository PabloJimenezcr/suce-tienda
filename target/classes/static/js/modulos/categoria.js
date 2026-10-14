
// Carga los datos de la categoría en el modal Agregar o Editar
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('categoriaModal');

    if (!modal) {
        return;
    }

    const form = document.getElementById('categoriaForm');
    const header = document.getElementById('categoriaModalHeader');
    const titulo = document.getElementById('categoriaModalTitulo');
    const id = document.getElementById('categoriaId');
    const descripcion = document.getElementById('categoriaDescripcion');
    const activo = document.getElementById('categoriaActivo');
    const rutaImagen = document.getElementById('categoriaRutaImagen');
    const imagenFile = document.getElementById('categoriaImagenFile');
    const preview = document.getElementById('categoriaPreview');

    // Comprobar que los elementos requeridos existan
    if (
        !form ||
        !header ||
        !titulo ||
        !id ||
        !descripcion ||
        !activo ||
        !rutaImagen ||
        !imagenFile ||
        !preview
    ) {
        console.error(
            'No se encontraron todos los elementos del formulario de categorías.'
        );
        return;
    }

    function limpiarPreview() {
        preview.removeAttribute('src');
        preview.classList.add('d-none');
    }

    function mostrarPreviewActual(ruta) {
        if (ruta) {
            preview.src = ruta;
            preview.classList.remove('d-none');
        } else {
            limpiarPreview();
        }
    }

    // Previsualizar la nueva imagen seleccionada
    imagenFile.addEventListener('change', function () {
        if (typeof mostrarImagen === 'function') {
            mostrarImagen(this, 'categoriaPreview');
        }
    });

    // Cargar los datos del registro al abrir el modal
    modal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;

        if (!button) {
            return;
        }

        const modo = button.getAttribute('data-modo');

        // Limpiar cualquier información de una apertura anterior
        form.reset();

        id.value = '';
        rutaImagen.value = '';
        imagenFile.value = '';

        limpiarPreview();

        titulo.textContent = button.getAttribute('data-titulo') || '';

        header.classList.remove(
            'bg-info',
            'bg-warning',
            'text-white'
        );

        if (modo === 'editar') {
            id.value = button.getAttribute('data-id') || '';

            descripcion.value =
                button.getAttribute('data-descripcion') || '';

            activo.checked =
                button.getAttribute('data-activo') === 'true';

            rutaImagen.value =
                button.getAttribute('data-imagen') || '';

            mostrarPreviewActual(rutaImagen.value);

            header.classList.add('bg-warning', 'text-white');
        } else {
            // Una categoría nueva inicia activa
            activo.checked = true;

            header.classList.add('bg-info', 'text-white');
        }
    });

    // Limpiar el formulario al cerrar el modal
    modal.addEventListener('hidden.bs.modal', function () {
        form.reset();

        id.value = '';
        rutaImagen.value = '';
        imagenFile.value = '';

        limpiarPreview();
    });
});
