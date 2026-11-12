import express from 'express';
import rutasAutos from './rutas/rutas-autos.mjs';
import rutasAutenticacion from './rutas/rutas-autenticacion.mjs';
import verificarToken from './middlewares/verificar-token.mjs';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PUERTO = 3000;

//Obtenemos la ruta de la carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuramos los middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conectamos las rutas de autenticación
app.use(rutasAutenticacion);

//Ruta inicial para acceder al login
app.get('/', (req, res) => {
    res.redirect('/login');
});

//Permitimos el acceso al login sin autenticación
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'login.html'));
});

app.use('/css', express.static(path.join(__dirname, 'vistas', 'css')));

//Protegemos las rutas de autos y procedimientos
app.use('/api/v1', verificarToken);
app.use('/procedimiento', verificarToken);

//Conectamos las rutas de los autos
app.use(rutasAutos);

//Protegemos las páginas del sistema
app.use('/css', verificarToken, express.static(path.join(__dirname, 'vistas', 'css')));
app.use('/js', verificarToken, express.static(path.join(__dirname, 'vistas', 'js')));
app.use(verificarToken, express.static(path.join(__dirname, 'vistas')));

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});