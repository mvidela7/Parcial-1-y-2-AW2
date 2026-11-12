import modelo from '../modelos/modelo-autos.mjs';
import procedimiento from '../utilidades/procedimiento-autos.mjs';

//Controlador para manejar las rutas relacionadas con los autos
async function obtenerAutos(req, res) {
    try {
        const autos = await modelo.obtenerAutos();

        return res.status(200).json(autos);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudieron obtener los autos'
        });
    }
}

//Controlador para obtener un auto por su ID
async function obtenerAuto(req, res) {
    try {
        const { id } = req.params;

        const auto = await modelo.obtenerAuto(parseInt(id));

        //Verificamos si el auto fue encontrado
        if (!auto) {
            return res.status(404).json({
                mensaje: 'Auto no encontrado'
            });
        }

        return res.status(200).json(auto);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudo obtener el auto'
        });
    }
}

//Controlador para manejar el procedimiento de valor del stock
async function valorStock(req, res, next) {
    try {
        const resultado = await procedimiento.calcularValorStock();

        req.resultadoProcedimiento = {
            procedimiento: 'Calcular valor del stock',
            resultado: resultado
        };

        next();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudo realizar el procedimiento'
        });
    }
}

//Exportamos los controladores
export default {
    obtenerAutos,
    obtenerAuto,
    valorStock
};