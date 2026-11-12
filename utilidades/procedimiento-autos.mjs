//Importamos la conexión a PostgreSQL
import pool from '../configuracion/conexion.mjs';

async function calcularValorStock() {
    const resultado = await pool.query('SELECT precio, stock FROM autos');

    const autos = resultado.rows;

    //Variable para almacenar el valor total del stock
    let valorTotalStock = 0;

    //Recorremos los autos y calculamos el valor total del stock
    autos.forEach((auto) => {
        //Multiplicamos el precio por la cantidad en stock
        valorTotalStock += Number(auto.precio) * auto.stock;
    });

    return {
        //Devolvemos la cantidad de autos procesados y el valor total
        autosProcesados: autos.length,
        valorTotalStock: valorTotalStock
    };
}

//Exportamos la función para utilizarla desde otros módulos
export default {
    calcularValorStock
};