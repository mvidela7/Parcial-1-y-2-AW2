import pool from '../configuracion/conexion.mjs';

//Buscar un usuario por su nombre
async function obtenerUsuario(usuario) {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE username = $1',
        [usuario]
    );

    return resultado.rows[0];
}

//Exportamos las funciones
export default {
    obtenerUsuario
};