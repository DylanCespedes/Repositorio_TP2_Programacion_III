const express = require('express');
const fs = require('fs');
let MySql = require("mysql2");
const cors = require('cors');
const app = express();


let conection = MySql.createConnection({
    host : "localhost",
    database:"comprapc",
    user : "root",
    password: 'Rojodiablo5555',
    port: 3305 
}
);

conection.connect(function(error){
    if(error){
        throw error;
    }
else{

    console.log("conexion exitosa");

}});


app.use(cors());
app.use(express.urlencoded({ extended: true }));
    app.get('/api/productos', (req, res) => {
        const query = 'SELECT * FROM productos';
        db.query(query, (err, results) => {
          if (err) {
            res.status(500).send('Error al obtener los datos');
            return;
          }
          res.json(results); 
        });
      });
module.exports = conection;

//Guardar consulta a la tabla registros
app.post('/registrar', (req, res) => {
  const { email, mensaje } = req.body;

  // Inserta los datos en la tabla "registros"
  const query = 'INSERT INTO comprapc.registros (email, mensaje) VALUES (?, ?)';
  conection.query(query, [email, mensaje], (err, result) => {
      if (err) {
          console.error('Error al guardar los datos en la base de datos:', err);
          return res.status(500).send('Error al guardar los datos.');
      }
      res.send('Gracias por tu consulta, la hemos registrado en la base de datos.');
  });
});

//Eliminar producto de la BD
app.post('/eliminar', (req, res) =>{
  const { id } = req.body;

  const query = 'DELETE FROM comprapc.productos WHERE IdProducto = (?);';
  conection.query(query, [id], (err, result) =>{
    if(err){
      console.error('Error al eliminar el producto', err);
      return res.status(500).send('Error al eliminar datos.');
    }
    res.send('Hemos eliminado el producto ' + [id]);
  });
});

app.post('/editar', (req, res) =>{
  const { tipo, marca, nombre, precio, descripcion, foto, id_editar } = req.body;
  const query = `UPDATE comprapc.productos
                SET IdTIPO = (?),
                IdMarca = (?),
                Nombre = (?),
                Precio = (?),
                Descripcion = (?),
                Foto = (?)
                WHERE IdProducto = (?)`
  conection.query(query, [tipo, marca, nombre, precio, descripcion, foto, id_editar], (err, result) =>{
    if(err){
      console.error('Error al editar el producto: ', err);
      return res.status(500).send('Error al editar los datos');
    }
    res.send('Hemos editado el producto '+ [id_editar]);
  });
});

  // Servidor escuchando
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
