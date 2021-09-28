const sqlite3 = require('sqlite3').verbose()


// let db = new sqlite3.Database('./db/messages.db', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connectado a DB SQLITE');
// });

// db.serialize(() => {
//   db.each(`
//   DROP TABLE IF EXISTS  "mensajes";
  
//   CREATE TABLE "mensajes"
//   (
//       [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       [name] NVARCHAR(160)  NOT NULL,
//       [mensaje] NVARCHAR(160) NOT NULL,
//       FOREIGN KEY ([Id]) REFERENCES "ID" ([Id])
//                   ON DELETE NO ACTION ON UPDATE NO ACTION
//   );`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
   
//   });
// });
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }

// });

// let db = new sqlite3.Database('./db/productos.db', (err) => {
//   if (err) {
//     return console.error(err.producto);
//   }
//   console.log('Connectado a DB SQLITE');
// });
// dbp.serialize(() => {
//  dbp.run('CREATE TABLE IF NOT EXISTS productos(name TEXT, description TEXT, code INTEGER, picture TEXT, price INTEGER, stock INTEGER )');
// });
// dbp.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }

// });




  
// module.exports = {db}