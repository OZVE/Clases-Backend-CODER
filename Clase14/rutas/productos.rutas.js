const express = require('express')
const router = express.Router()
const Producto = require('../classes/producto.class')
const Carrito = require('../classes/carrito.class')
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));  


let productos = {
    items: []
}

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};

productos.items.push(new Producto ("coffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4))

router.get("/", (req, res) => {
    try{
        if(productos.items.length > 0){
            res.status(200).json(productos)
        }else{
            res.status(404).json({"error": "There's not any product available."})
        }
    }catch(err) {
        res.status(404).json({err})
    }

})
router.get('/vista', (req, res) => {

    res.render("index", productos);
})

router.get("/:id", (req, res) => {
    try{
        if (req.params.id <= (productos.items.length)) {
            res.status(200).json(productos[req.params.id-1])
        } else {
            res.status(404).json({"error": "Producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})

router.post("/guardar", (req, res) => {
   
    try{
        productos.items.push(new Producto (req.query.date, req.query.name, req.query.description, req.query.code, req.query.picture, parseInt(req.query.price),  req.query.stock))
        res.status(200).json(productos[productos.length-1])
    }catch(err){
        res.status(404).json(err)
    }
})


router.put("/update/:id", (req, res) => {

    try {
        let id = parseInt(req.params.id)
        productos.items[id-1] = {
            "id": parseInt(id),
            "date": req.query.name,
            "name": req.query.name,
            "description": req.query.description,
            "code": req.query.code,
            "picture": req.query.picture,
            "price": parseInt(req.query.price),
            "stock": req.query.stock,
        }
        res.json(productos[id-1])
    } catch(err){
        throw new Error(err)
    }
})

router.delete("/delete/:id", (req, res) => {

    try {

        let id = parseInt(req.params.id)

            if(id-1 < productos.items.length){
                res.status(200).json("elemente deleted")
                removeItemFromArr(productos, productos[id-1])
            } else {
                res.status(200).json({"msg":"No hay productos"})
            }
    
    }catch(err) {
        throw new Error(err)
    }
   
})


router.post("/guardarform", (req, res) => {
    
    let nuevoProducto = req.body;
   try {
       productos.items.push(new Producto(
           nuevoProducto.name,
           nuevoProducto.description,
           nuevoProducto.code,
           nuevoProducto.picture,
           nuevoProducto.price,
           nuevoProducto.stock
           ));
        res.redirect('/api/productos/vista')
   } catch(err) {
    throw new Error(err)
   }

});
module.exports =[router, productos];