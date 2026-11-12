import jwt from 'jsonwebtoken';
import pool from '../configuracion/conexion.mjs';
import dotenv from 'dotenv';

dotenv.config();

//Middleware para verificar el token y la sesión
async function verificarToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const datosUsuario = jwt.verify(token, process.env.JWT_SECRET);

        //Comprobamos que la sesión siga activa en PostgreSQL
        const resultado = await pool.query(
            'SELECT session_id FROM usuarios WHERE id = $1 AND session_id = $2',
            [datosUsuario.id, datosUsuario.sessionId]
        );

        if (resultado.rowCount === 0) {
            return res.redirect('/login');
        }

        req.usuario = datosUsuario;

        next();

    } catch (error) {
        return res.redirect('/login');
    }
}

//Exportamos el middleware
export default verificarToken;