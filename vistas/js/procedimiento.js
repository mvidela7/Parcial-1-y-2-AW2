
// Obtener el botón y el contenedor del resultado
const boton = document.getElementById('btn-ejecutar');
const resultado = document.getElementById('resultado');

// Ejecutar el procedimiento desde la API
async function ejecutarProcedimiento() {
    try {
        boton.disabled = true;
        boton.textContent = 'Ejecutando...';

        const respuesta = await fetch('/procedimiento/valor-stock');
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error('No se pudo ejecutar el procedimiento');
        }

        resultado.innerHTML = `
            <div class="mensaje mensaje-exito">
                <h2>Procedimiento ejecutado correctamente</h2>
                <p>Autos procesados: ${datos.resultado.autosProcesados}</p>
                <p>Valor total del stock: $${Number(datos.resultado.valorTotalStock).toLocaleString('es-AR')}</p>
            </div>
        `;

    } catch (error) {
        resultado.innerHTML = `
            <div class="mensaje mensaje-error">
                No se pudo ejecutar el procedimiento.
            </div>
        `;

        console.error(error);

    } finally {
        boton.disabled = false;
        boton.textContent = 'Ejecutar procedimiento';
    }
}

// Asociar el evento al botón
boton.addEventListener('click', ejecutarProcedimiento);
