const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));  
let admin = true;


let db = new sqlite3.Database('./db/productos.db', (err) => {
    if (err) {
      return console.error(err.producto);
    }
    console.log('Connectado a DB SQLITE');
  });
  db.serialize(() => {
   db.run(`CREATE TABLE  IF NOT EXISTS "productos" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"code"	INTEGER NOT NULL,
	"picture"	TEXT,
	"price"	INTEGER,
	"stock"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)`);
  });
  
  

router.get("/", (req, res) => {
    try{
        db.serialize(()=>{
          db.run(`SELECT * FROM productos;`)
          res.json(db)
          console.log(db)
        })
       
    }catch(err) {
        console.error(err)
    }
   
})

router.get("/:id", (req, res) => { 
    db.serialize(()=>{
        db.each('SELECT id ID, name NAME FROM productos WHERE id =?', [req.params.id], function(err,row){     
          if(err){
            res.send("Error encountered while displaying");
            return console.error(err.message);
          }
          res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
          console.log("Entry displayed successfully");
        });
      });
})

router.post("/", (req, res) => {
    if(admin){
        try{
            db.serialize(()=>{
                db.run(`INSERT INTO "main"."productos"("id","name","description","code","picture","price","stock") VALUES ('${req.params.name}','${req.params.description}',${req.params.code},'${req.params.code}','${req.params.picture}',${req.params.price},${req.params.stock});`)
            })
            res.send('listo')

    }catch(err){
        res.status(404).json(err)
    }
}else{
        res.json("Error no tienes permisos para agregar productos")
    }
})


router.put("/:id", (req, res) => {
    if(admin){
          try{
              let id = parseInt(req.params.id)
           knex('lista').where({id: id}).update(req.query).then((data) =>  res.json(data[0]))
        }catch(err)
        {
           console.error(err)
        }
    }else{
    res.json("Error no tienes permisos para actualizar productos")
}

console.log(req.query)
res.json("updated")
})

router.delete("/:id", (req, res) => {
    if(admin){
        try{
            }catch(err){
                console.error(err)
                res.status(400).json("Ha ocurrido un error")
            }
        }else{
             res.json("Error no tienes permisos para eliminar productos")
}
})
db.close((err) => {
    if (err) {
      return console.error(err.message);
   }
  
  });
    module.exports =[router];