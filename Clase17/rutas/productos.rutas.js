const express = require('express')
const router = express.Router()
const { guardarProducto, knex} = require('../controllers/serverdb')

router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));  
let admin = true;


router.get("/", (req, res) => {

    knex("lista").select("*").then((data) => res.status(200).json(data))
   
    
    //      try{
    //     if(productos.length > 0){
    //         res.status(200).json(productos)
    //     }else{
    //         res.status(404).json({"error": "There's not any product available."})
    //     }
    // }catch(err) {
    //     res.status(404).json({err})
    // }
   
})
router.get('/vista', (req, res) => {
    
    res.render("index", productos);
})

router.get("/:id", (req, res) => {

   let id =  req.params.id 
   knex('lista').select('*').where({'id': id})
   .then((data) =>  res.status(200).json(data[0]))
   
    // try{
    //     if (req.params.id <= (productos.length)) {
    //         res.status(200).json(productos[req.params.id])
    //     } else {
    //         res.status(404).json({"error": "Producto no encontrado"})
    //     }
    // }catch(err) {
    //     res.status(404).json({err})
    // }
})

router.post("/", (req, res) => {
    if(admin){
    try{

        guardarProducto(
            req.query.name, 
            req.query.description,
            parseInt(req.query.code),
            req.query.picture,
            parseInt(req.query.price), 
            parseInt(req.query.stock))

        res.status(200).json("item creado")


    }catch(err){
        res.status(404).json(err)
    }
}else{
        res.status(200).json("Error no tienes permisos para agregar productos")
    }
})


router.put("/:id", (req, res) => {
    if(admin){
          try{
              let id = parseInt(req.params.id)
           knex('lista').where({id: id}).update(req.query)
           .then((data) =>  res.status(200).json(data[0]))
        }catch(err)
        {
           console.error(err)
        }
    }

else{
    res.status(200).json("Error no tienes permisos para actualizar productos")
}

console.log(req.query)
res.json("updated")

})

router.delete("/:id", (req, res) => {
    if(admin){
        try{
            let id = parseInt(req.params.id)
                    
               knex("lista").select("*").where({"id":id}).then(data => {
                   if(data.length > 0){
                       knex('lista')
                       .where({ id: id})
                       .del().then(() =>  res.status(200).json("Producto eliminado con éxito"))
                   } else {
                       res.status(200).json({msg: "El producto con el id " + id + " no existe"})
                   }
               })
          
        }catch(err){
            console.error(err)
            res.status(400).json("Ha ocurrido un error")
        }

}else{
    res.status(200).json("Error no tienes permisos para eliminar productos")
}
})

    module.exports =[router];