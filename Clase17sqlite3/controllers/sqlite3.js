const sqlite = {
    client: 'sqlite3',
    connection:{
      filename: '../DB/productos.db'
    },
    useNullAsDefault: true,
  };

module.exports = sqlite