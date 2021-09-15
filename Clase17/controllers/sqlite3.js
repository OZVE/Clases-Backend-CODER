
export const sqlite = {
    client: 'sqlite3',
    connection: () => ({
      filename: '../DB/mydb.sqlite'
    }),
  };

export default sqlite