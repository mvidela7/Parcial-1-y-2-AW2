import modelo from '../modelos/modelo-usuarios.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import pool from '../configuracion/conexion.mjs';
import dotenv from 'dotenv';

dotenv.config();

//Controlador para iniciar sesión
async function iniciarSesion(req, res) {
    try {
        const { usuario, pass } = req.body;

        if (!usuario || !pass) {
            return res.status(400).json({
                mensaje: 'Usuario y contraseña son requeridos'
            });
        }

        const usuarioEncontrado = await modelo.obtenerUsuario(usuario);

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const verificado = await bcrypt.compare(
            pass,
            usuarioEncontrado.password_hash
        );

        if (!verificado) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        //Generamos un identificador único para la sesión
        const sesionId = nanoid(21);

        //Guardamos el identificador en PostgreSQL
        await pool.query(
            'UPDATE usuarios SET session_id = $1 WHERE username = $2',
            [sesionId, usuario]
        );

        //Generamos el token JWT
        const token = jwt.sign(
            {
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.username,
                sessionId: sesionId
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        //Guardamos el token en una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.redirect('/items.html');

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });
    }
}

//Exportamos el controlador
export default {
    iniciarSesion
};