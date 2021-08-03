import express from 'express';

/*** DATOS A MANIPULAR ***/
let arrayProductos = [{
    id: 1,
    title: "Guitarra Fender Stratocaster",
    price: 1000,
    thumbnail: "fender.jpg"
    },
    {
    id: 2,
    title: "Bateria Tama 3 Cuerpos",
    price: 2000,
    thumbnail: "bateria_tama_3_cuerpos.jpg"
    }
]

const router = express.Router();


router.get('/productos/listar', (req, res) => {   
    if (arrayProductos.length==0){
        return res.status(400).json({
                error: 'No hay productos cargados.',
        })
    }    
    res.json(
      arrayProductos,
    );
});


router.get('/productos/listar/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (arrayProductos.length==0){
        return res.status(400).json({
                error: 'No hay productos cargados.',
        })
    }    
    
    if (arrayProductos[id-1]){
        res.json(
            arrayProductos[id-1],
          );
    }
    else{
        res.json({
            msj:'Producto no encontrado'
          });
        
    }
});


router.post('/productos/guardar', (req, res) => {
    const body = req.body;
    if (!body.title ||
        !body.price ||
        !body.thumbnail||
        typeof body.title != 'string' ||
        typeof body.price != 'number'||
        typeof body.thumbnail != 'string')
        {
        return res.status(400).json({
                error: 'Se deben ingresar Titulo(string), Precio(number) y Thumbnail(string) del producto.',
        })
    }    
    const nuevoProducto = {
        id: arrayProductos[arrayProductos.length - 1].id+1,
        title: body.title,
        price: body.price,
        thumbnail: body.thumbnail
    }
    arrayProductos.push(nuevoProducto)
    
    res.json({
      'nuevo_producto_guardado':nuevoProducto
    });
});


router.delete('/productos/eliminar/:id', (req, res) => {
    const idBuscado = Number(req.params.id);
    const productoEliminado = arrayProductos.filter((aProduct) => aProduct.id == idBuscado);
    
    if (productoEliminado.length>0){
        arrayProductos = arrayProductos.filter((aProduct) => aProduct.id !== idBuscado);
        res.json({'Producto eliminado':productoEliminado})
    }
    else{
        return res.status(404).json({
            error: `El producto con Id ${idBuscado} no existe.`,
        })
    }   
  });


  router.put('/productos/actualizar/:id', (req, res) => {
    console.log(req.params);
    const idBuscado = Number(req.params.id);
    const body = req.body;
  
    const posicion = arrayProductos.map((aProduct) => aProduct.id).indexOf(idBuscado);
    console.log(posicion);
    /** En caso de no encontrar el producto, respondemos con codigo 404 para indicar el error */
    if (posicion == -1) {
      return res.status(404).json({
        msg: `El producto con Id ${idBuscado} no existe.`,
      });
    }
  
    /** Valido que la info que me mandaron este OK, sino respondo con 400 */
    if (
        !body.title ||
        !body.price ||
        !body.thumbnail||
        typeof body.title != 'string' ||
        typeof body.price != 'number'||
        typeof body.thumbnail != 'string'
    ) {
      return res.status(400).json({
        msg: 'Se deben ingresar Titulo(string), Precio(number) y Thumbnail(string) del producto.',
      });
    }
  
    arrayProductos[posicion].title = body.title;
    arrayProductos[posicion].price = body.price;
    arrayProductos[posicion].thumbnail = body.thumbnail;
  
    /**Estado 201: Objeto creado correctamente */
    res.status(201).json({
      producto_actualizado:arrayProductos[posicion],
    });
  });
  

export default router;