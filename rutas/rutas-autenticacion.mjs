import express from 'express';
import controlador from '../controladores/controlador-autenticacion.mjs';
import controladorSesion from '../controladores/controlador-sesion.mjs';
import verificarToken from '../middlewares/verificar-token.mjs';

//Router para las rutas de autenticación
const rutasAutenticacion = express.Router();

//Ruta para iniciar sesión
rutasAutenticacion.post('/autenticacion', controlador.iniciarSesion);

//Ruta para cerrar sesión
rutasAutenticacion.get('/cerrar-sesion', verificarToken, controladorSesion.cerrarSesion);

export default rutasAutenticacion;