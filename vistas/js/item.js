
// Obtener el ID del auto desde la URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

// Consultar el auto mediante su ID
async function cargarAuto() {
    try {
        const respuesta = await fetch(`/api/v1/autos/${id}`);

        if (!respuesta.ok) {
            throw new Error('No se encontró el vehículo');
        }

        const auto = await respuesta.json();

        document.getElementById('detalle-auto').innerHTML = `
            <h2>${auto.marca} ${auto.modelo}</h2>
            <p><strong>Año:</strong> ${auto.año}</p>
            <p><strong>Precio:</strong> $${Number(auto.precio).toLocaleString('es-AR')}</p>
            <p><strong>Stock:</strong> ${auto.stock} unidades</p>
        `;

    } catch (error) {
        console.error('Error al obtener el auto:', error);

        document.getElementById('detalle-auto').textContent =
            'No se pudo cargar la información del vehículo.';
    }
}

// Verificar si se recibió un ID
if (id) {
    cargarAuto();
} else {
    document.getElementById('detalle-auto').textContent =
        'No se indicó un ID de vehículo.';
}
