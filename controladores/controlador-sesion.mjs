import pool from '../configuracion/conexion.mjs';

//Controlador para cerrar la sesión
async function cerrarSesion(req, res) {
    try {
        //Invalidamos la sesión guardada en PostgreSQL
        await pool.query(
            'UPDATE usuarios SET session_id = NULL WHERE id = $1',
            [req.usuario.id]
        );

        //Eliminamos la cookie del navegador
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        });

        return res.redirect('/login');

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudo cerrar la sesión'
        });
    }
}

//Exportamos el controlador
export default {
    cerrarSesion
};