import pool from '../configuracion/conexion.mjs';

// Obtener todos los autos de la base de datos
async function obtenerAutos() {
    const resultado = await pool.query('SELECT * FROM autos');

    return resultado.rows;
}

// Obtener un auto por su ID
async function obtenerAuto(id) {
    const resultado = await pool.query(
        'SELECT * FROM autos WHERE id = $1',
        [id]
    );

    return resultado.rows[0];
}

// Exportamos las funciones para utilizarlas desde los controladores
export default {
    obtenerAutos,
    obtenerAuto
};