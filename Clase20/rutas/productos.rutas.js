const express = require('express');
const router = express.Router()
const {Memoria, Mongo} = require("../classes/mongo")
const mariaDB = require("../classes/mariadb")
const FileSys = require("../classes/fs")

//---------------------------Escoja la opción -----------------------------------

// "Escoja la base de datos: 0. Memoria / 1. FS / 2. MariaDB Local / 3. MariaDB Remoto / 4. SQLite3 /5. MongoDB Local / 6. MongoDB Atlas / 7. Firebase")

const opcion = 1
let admin = true;

//--------------------------------------------------------------------------------
let seleccion = 1

switch(opcion) {
    case 0:
        seleccion = new Memoria()
        break;
    case 1:
        seleccion = new FileSys()
        break;
    case 2:
        seleccion = new mariaDB()
        seleccion.connectDB()
        break;
    case 5:
        seleccion = new Mongo()
        seleccion.connectDB()
        break;    
    case 6:
        seleccion = new Mongo()
        seleccion.connectDBAtlas()
        break;
}


router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));  


router.get("/", (req, res) => {
    seleccion.show(req, res)
   
})
router.get('/vista', (req, res) => {
    
    res.render("index", productos);
})

router.get("/:id", (req, res) => {

   seleccion.showId(req, res)
   
})


router.post("/", (req, res) => {
    seleccion.create(admin, req, res)
})

router.put("/:id", (req, res) => {
    seleccion.update(admin, req, res)
})

router.delete("/:id", async (req, res) => {
    seleccion.delete(admin, req, res)
})

    module.exports =[router];