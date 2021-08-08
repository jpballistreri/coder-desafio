import express from 'express';
import path from 'path';
import routerProductos from './routes/productos.js';

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

//const publicPath = path.resolve(__dirname, './public');
//app.use(express.static(publicPath));

//Home
app.get('/', (request, response) => {
  response.sendFile('/public/index.html',{ root: '.' });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** DEFINICION ROUTERS ***/

app.use('/api',routerProductos);