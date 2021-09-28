var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var db = new sqlite3.Database('./db/productos.db');

db.run('CREATE TABLE IF NOT EXISTS productos(id TEXT, name TEXT, description TEXT, code INTEGER, picture TEXT, price INTEGER, stock INTEGER)');

app.get('/', function(req,res){
    res.send("<h3> Hi there, You are going to perform CRUD operations.............[CREATE] Please enter 'http://localhost:8080/add/(id number)/(name)' to add new employee to the database.........................[READ] 'http://localhost:3000/view/(id number)' to view an employee.........................[UPDATE] 'http://localhost:3000/update/(id number)/(new name)' to update an employee.....................[DELETE] 'http://localhost:3000/del/(id number)' to delete an employee...............................Before closing this window, kindly enter 'http://localhost:3000/close' to close the database connection <h3>");
  });

  app.post('/add', function(req,res){
    db.serialize(()=>{
      db.run('INSERT INTO productos(id,name,description,code,picture,price,stock) VALUES(?,?,?,?,?,?,?)', [req.query.id, req.query.name,req.query.description,req.query.code,req.query.picture,req.query.price,req.query.stock], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New employee has been added");
        res.send("New employee has been added into the database with ID = "+req.query.id+ " and Name = "+req.query.name);
      });
  });
  });  


  
app.get("/ver", (req, res) => {
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
server.listen(8080, function () {
    console.log("Server active http://localhost:8080");
});