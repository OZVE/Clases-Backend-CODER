const express = require('express')
const router = express.Router()
const Producto = require('../classes/producto.class')
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));  
let admin = true;
const fs = require ('fs')

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};

// productos.push(new Producto (productos.length,"coffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4))
// productos.push(new Producto (productos.length,"caffee", "best coffee worlds","3421asd1", "https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_portafilter-with-tamper-128.png",1000,4))

router.get("/listar", (req, res) => {
    
         try{
             if(fs.existsSync('productos.txt')){
                 fs.readFile('productos.txt', 'utf-8',(error,data)=>{
                     if(!error){
                         console.log(data)
                         res.json(data)
                     }else{
                         console.log(`Error: ${error}`)
                     }
                 })
             }else{
                fs.writeFile('productos.txt','productos',(error, data)=>{
                    if (!error){
                        console.log('lol');
                        res.json('sin productos')
                    }else{
                        console.console.log(`Error: ${error}`);
                    }
                })    
             }

    }  catch(err) {
        res.status(404).json({err})
    }
   
})


router.post("/agregar", (req, res) => {
   
    try{
        const producto = new Producto(
            req.query.name, 
            req.query.description,
            req.query.code,
            req.query.picture,
            req.query.price,
            req.query.stock)
         fs.appendFile('productos.txt',  JSON.stringify(producto),(error) =>{
                if(!error){
                    fs.readFile('productos.txt', 'utf-8',(error, data)=>{
                        if (!error){
                            console.log(data);
                            res.json(data)
                        }else{
                            console.console.log(`Error: ${error}`);
                        }
                    })  
                }
            })
       
    }catch(err){
        res.status(404).json(err)
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

router.delete("/borrar", (req, res) => {
    if(admin){
    try {
        fs.unlink('productos.txt',(error)=>{
            if(error) throw error;
            console.log('eliminado')
            res.json('eliminado')
        })
    }catch(err) {
        throw new Error(err)
    }
}else{
    res.status(200).json("Error no tienes permisos para eliminar productos")
}
})



    module.exports =[router];