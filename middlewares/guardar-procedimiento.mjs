import { writeFile } from 'fs/promises';

async function guardarProcedimiento(req, res, next) {
    try {
        const resultado = req.resultadoProcedimiento;

        //El middleware guarda el resultado en un archivo JSON del servidor
        await writeFile(
            './logs/procedimientos.json',
            // Convertimos el resultado a JSON y lo formateamos con 2 espacios.
            JSON.stringify(resultado, null, 2)
        );

        return res.status(200).json(resultado);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'No se pudo guardar el resultado del procedimiento'
        });
    }
}

export default guardarProcedimiento;