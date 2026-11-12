
// Obtener los autos desde la API
async function cargarAutos() {
    try {
        const respuesta = await fetch('/api/v1/autos');

        if (!respuesta.ok) {
            throw new Error('No se pudieron obtener los autos');
        }

        const autos = await respuesta.json();

        const lista = document.getElementById('lista-autos');

        autos.forEach((auto) => {
            const elemento = document.createElement('div');

            elemento.classList.add('tarjeta');

            elemento.innerHTML = `
                <h2>${auto.marca} ${auto.modelo}</h2>
                <p><strong>Año:</strong> ${auto.año}</p>
                <p><strong>Precio:</strong> $${Number(auto.precio).toLocaleString('es-AR')}</p>
                <p><strong>Stock:</strong> ${auto.stock} unidades</p>
                <a href="/item.html?id=${auto.id}" class="boton">
                    Ver detalles
                </a>
            `;

            lista.appendChild(elemento);
        });

    } catch (error) {
        console.error('Error al cargar los autos:', error);

        document.getElementById('lista-autos').innerHTML =
            '<p>No se pudieron cargar los vehículos. Intentá nuevamente.</p>';
    }
}

// Ejecutar la función
cargarAutos();
