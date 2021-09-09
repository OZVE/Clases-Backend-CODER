const express = require('express');
const router = express.Router()
const Carrito = require('../classes/carrito.class');
const productos = require('../rutas/productos.rutas');
const productoss = productos[1];
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


let carritos = [new Carrito()]

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};



// carritos.push(new Carrito (carritos.length, new Producto("caffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4)))


router.get("/", (req, res) => {
    try{
      res.status(200).json(carritos)
        
    }catch(err) {
        res.status(404).json({err})
    }

})

router.get("/:id", (req, res) => {
    try{
        if (req.params.id <= (carritos.productos.length)) {
            res.status(200).json(carritos.productos[req.params.id])
        } else {
            res.status(404).json({"error": "Producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})
 
        router.post("/:id_producto", (req, res) => {
        let id_producto = parseInt(req.params.id_producto)
        if (productoss.filter(element => element.id == id_producto).length > 0) {
          let prodSelect = productoss[id_producto]
          let prodUser = JSON.parse( JSON.stringify( prodSelect ) );
                console.log((carritos[0].productos.items.filter(element => element.id === id_producto).length > 0))
            if (carritos[0].productos.items.filter(element => element.id === id_producto).length > 0) {
               carritos[0].productos.items.filter(element => element.id === id_producto).map(obj => obj.qty = obj.qty + 1)
            }else{
               carritos[0].productos.items.push(prodUser)
            }
         res.status(200).json(carritos)
        } else {
           let msg = "El producto no existe en la DB"
        console.log(msg)
        res.status(200).json(msg)
        }
           
        })
        
    


router.delete("/:id_producto", (req, res) => {

    try {
        let id_producto = parseInt(req.params.id_producto)

        if(id_producto-1 < carritos[0].productos.items.length){

                    let elemento = carritos[0].productos.items.filter(element => element.id === id_producto)
                    let indice = carritos[0].productos.items.indexOf(elemento[0])
            
                    removeItemFromArr(carritos[0].productos.items, carritos[0].productos.items[indice])

                    res.status(200).json(carritos[0])
                    console.log(carritos[0])

                } else {
                    res.status(200).json({"msg":"No existen productos en el carrito"})
                }
        
        }catch(err) {
            throw new Error(err)
        }

})

module.exports = [router, carritos];