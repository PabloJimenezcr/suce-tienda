document.addEventListener('DOMContentLoaded', function () {

    const modal = document.getElementById('productoModal');

    if (!modal) {
        return;
    }

    const form = document.getElementById('productoForm');
    const header = document.getElementById('productoModalHeader');
    const titulo = document.getElementById('productoModalTitulo');
    const id = document.getElementById('productoId');
    const categoria = document.getElementById('productoCategoria');
    const descripcion = document.getElementById('productoDescripcion');
    const detalle = document.getElementById('productoDetalle');
    const precio = document.getElementById('productoPrecio');
    const existencias = document.getElementById('productoExistencias');
    const activo = document.getElementById('productoActivo');
    const rutaImagen = document.getElementById('productoRutaImagen');
    const imagenFile = document.getElementById('productoImagenFile');
    const preview = document.getElementById('productoPreview');

    if (
        !form || !header || !titulo || !id || !categoria ||
        !descripcion || !detalle || !precio || !existencias ||
        !activo || !rutaImagen || !imagenFile || !preview
    ) {
        console.error(
            'No se encontraron todos los elementos del formulario de productos.'
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

    imagenFile.addEventListener('change', function () {
        if (typeof mostrarImagen === 'function') {
            mostrarImagen(this, 'productoPreview');
        }
    });

    modal.addEventListener('show.bs.modal', function (event) {

        const button = event.relatedTarget;

        if (!button) {
            return;
        }

        const modo = button.getAttribute('data-modo');

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
            categoria.value = button.getAttribute('data-categoria') || '';
            descripcion.value = button.getAttribute('data-descripcion') || '';
            detalle.value = button.getAttribute('data-detalle') || '';
            precio.value = button.getAttribute('data-precio') || '';
            existencias.value = button.getAttribute('data-existencias') || '';

            activo.checked =
                button.getAttribute('data-activo') === 'true';

            rutaImagen.value =
                button.getAttribute('data-imagen') || '';

            mostrarPreviewActual(rutaImagen.value);

            header.classList.add('bg-warning', 'text-white');

        } else {

            activo.checked = true;

            if (categoria.options.length > 0) {
                categoria.selectedIndex = 0;
            }

            header.classList.add('bg-info', 'text-white');
        }
    });
});