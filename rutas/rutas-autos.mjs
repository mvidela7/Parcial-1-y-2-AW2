import express from 'express';
import controlador from '../controladores/controlador-autos.mjs';
import guardarProcedimiento from '../middlewares/guardar-procedimiento.mjs';

//Router para separar nuestras rutas del servidor principal
const rutasAutos = express.Router();

rutasAutos.get('/api/v1/autos', controlador.obtenerAutos);

rutasAutos.get('/api/v1/autos/:id', controlador.obtenerAuto);

//Ruta para el procedimiento de valor del stock
rutasAutos.get(
    '/procedimiento/valor-stock',
    controlador.valorStock,
    guardarProcedimiento
);

export default rutasAutos;