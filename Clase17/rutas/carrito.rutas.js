const express = require('express');
const router = express.Router()
const Carrito = require('../classes/carrito.class');
const {knex} = require('../controllers/serverdb')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {   
    
})

router.get("/:id", (req, res) => {
    
})
 
router.post("/:id_producto", (req, res) => {
    let id = req.params.id_producto

    knex("relprod").insert({idcarrito: 1, idproducto: id, qty: 1}).then( data => console.log("producto creado"))
//  knex('carrito').innerJoin("relprod", "carrito.id", "idproducto")

//  .where({'id': id}).then(data => res.status(200).json(data))
})
    
    


router.delete("/:id_producto", (req, res) => {

   
})

module.exports = [router];