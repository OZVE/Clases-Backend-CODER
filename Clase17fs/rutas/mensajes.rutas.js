const express = require('express');
const router = express.Router()
const Mensaje = require('../classes/mensaje.class');
const productos = require('./productos.rutas');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const fs = require ('fs')

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};


router.get("/listar", (req, res) => {
    
    try{
        if(fs.existsSync('mensajes.txt')){
            fs.readFile('mensajes.txt', 'utf-8',(error,data)=>{
                if(!error){
                    console.log(data)
                    res.json(data)
                }else{
                    console.log(`Error: ${error}`)
                }
            })
        }else{
           fs.writeFile('mensajes.txt','mensajes',(error, data)=>{
               if (!error){
                   console.log('lol');
                   res.json('sin mensajes')
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
        const mensaje = new Mensaje(
            req.query.name, 
            req.query.mensaje)
         fs.appendFile('mensajes.txt',  JSON.stringify(mensaje),(error) =>{
                if(!error){
                    fs.readFile('mensajes.txt', 'utf-8',(error, data)=>{
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

        
    


router.delete("/borrar", (req, res) => {

    try {
        fs.unlink('mensajes.txt',(error)=>{
            if(error) throw error;
            console.log('eliminado')
            res.json('eliminado')
        })
        
        }catch(err) {
            throw new Error(err)
        }

})

module.exports = [router];