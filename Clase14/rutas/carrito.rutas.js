const express = require('express');
const router = express.Router()
const Carrito = require('../classes/carrito.class');
const Producto = require('../classes/producto.class');
const productos = require('../rutas/productos.rutas');
const productoss = productos[1];
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


let carritos = []
var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};


carritos.push(new Carrito (carritos.length,{}))
// carritos.push(new Carrito (carritos.length, new Producto("caffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4)))


router.get("/listar", (req, res) => {
    try{
        if(carritos.length > 0){
            res.status(200).json(carritos)
        }else{
            res.status(404).json({"error": "There's not any product available."})
        }
    }catch(err) {
        res.status(404).json({err})
    }

})

router.get("/listar/:id", (req, res) => {
    try{
        if (req.params.id <= (carritos.length)) {
            res.status(200).json(carritos[req.params.id-1])
        } else {
            res.status(404).json({"error": "Producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})
    router.get("/agregar/:id_producto", (req, res) => {
    try{
        let id_producto = parseInt(req.params.id_producto)
        let productoselect = productoss[id_producto]
        productoselect.id = carritos[0].productos.length
        carritos[0].productos.push(productoselect)
        console.log(productoselect)
        res.status(200).json(carritos[0])
    }catch(err){
        res.status(404).json(err)
    }
    })


router.delete("/borrar/:id", (req, res) => {

    try {

        let id = parseInt(req.params.id)

            if(id-1 < carritos.length){
                res.status(200).json("elemente deleted")
                removeItemFromArr(carritos, carritos[id-1])
            } else {
                res.status(200).json({"msg":"No hay carritos"})
            }

    }catch(err) {
        throw new Error(err)
    }

})

module.exports = [router, carritos];