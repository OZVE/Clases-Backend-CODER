const express = require('express')
const router = express.Router()
const Producto = require('../classes/producto.class')
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));  
let admin = true;
let productos = [{}]
var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};

productos.push(new Producto (productos.length,"coffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4))
productos.push(new Producto (productos.length,"caffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4))

router.get("/listar", (req, res) => {
         try{
        if(productos.length > 0){
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
        if (req.params.id <= (productos.length)) {
            res.status(200).json(productos[req.params.id])
        } else {
            res.status(404).json({"error": "Producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})

router.post("/agregar", (req, res) => {
    if(admin){
    try{
        productos.push(new Producto (
            productos.length,
            req.query.name, 
            req.query.description,
            req.query.code,
            req.query.picture,
            parseInt(req.query.price), 
            req.query.stock))
        res.status(200).json(productos[productos.length-1])
    }catch(err){
        res.status(404).json(err)
    }
}else{
        res.status(200).json("Error no tienes permisos para agregar productos")
    }
})


router.put("/actualizar/:id", (req, res) => {
    if(admin){
    try {
        let id = parseInt(req.params.id)
        productos[id] = {
            "id": parseInt(id),
            "date": new Date(),
            "name": req.query.name,
            "description": req.query.description,
            "code": req.query.code,
            "picture": req.query.picture,
            "price": parseInt(req.query.price),
            "stock": req.query.stock,
        }
        res.json(productos[id])
    } catch(err){
        throw new Error(err)
    }
}else{
    res.status(200).json("Error no tienes permisos para actualizar productos")
}
})

router.delete("/borrar/:id", (req, res) => {
    if(admin){
    try {
        
        let id = parseInt(req.params.id)
        
        if(id-1 < productos.length){
            res.status(200).json("elemente deleted")
            removeItemFromArr(productos, productos[id])
        } else {
            res.status(200).json({"msg":"No hay productos"})
        }
        
    }catch(err) {
        throw new Error(err)
    }
}else{
    res.status(200).json("Error no tienes permisos para eliminar productos")
}
})


router.post("/guardarform", (req, res) => {
    
    let nuevoProducto = req.body;
    try {
        productos.push(new Producto(
            nuevoProducto.id = productos.length,
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