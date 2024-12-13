const db = require('../config/database.js');

//Buscar todos los productos.
const MostrarProductosModel = async() =>{
    try{
      let query = 'SELECT * FROM productos'; //Selecciono todas las peliculas
      const [rows] = await db.execute(query); //Guardo en una variable la devolución de la query armada
      return rows; //La devuelvo
    }
    catch(error){
      console.error('Error en MostrarProductosModel:', error.message);
      throw new Error('Error al traer los productos');
    } //Si tiene algun error, larga esta sentencia
};

const MostrarProductoPorIdModel = async(id) =>{
    try {
        let query = `SELECT * FROM productos WHERE IdProducto = ${id}`
        const [result] = await db.execute(query);
        return result;
    } catch (error) {
        console.error('Error en MostrarProductoPorIdModel:', error.message);
        throw new Error('Error al traer el producto por id');
    }
}

const CrearProductoModel = async(producto) =>{
    try {
        const query = 'INSERT INTO productos (IdTIPO, IdMarca, Nombre, Precio, Descripcion, Foto) VALUES (?,?,?,?,?,?);';
        const values = [
            producto.tipo,
            producto.marca,
            producto.nombre,
            producto.precio,
            producto.descripcion || null,
            producto.foto || null
        ]
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error('Error en CrearProductoModel:', error.message);
        throw new Error('Error al crear producto');
    }
}

const EliminarProductoModel = async(id) =>{
    try {
        const query = `DELETE FROM productos WHERE IdProducto = ${id}`
        const [result] = await db.execute(query);
        return result
    } catch (error) {
        console.error('Error en EliminarProductoModel:', error.message);
        throw new Error('Error al eliminar el producto');
    }
}

const ModificarProductoModel = async(id, productoActualizado) =>{
    try {
        const query = `UPDATE comprapc.productos
                SET IdTIPO = (?),
                IdMarca = (?),
                Nombre = (?),
                Precio = (?),
                Descripcion = (?),
                Foto = (?)
                WHERE IdProducto = ${id}`
        const values = [
            productoActualizado.tipo,
            productoActualizado.marca,
            productoActualizado.nombre,
            productoActualizado.precio,
            productoActualizado.descripcion || null,
            productoActualizado.foto || null
        ]
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error('Error en ModificarProductoModel:', error.message);
        throw new Error('Error al modificar el producto');
    }
}

module.exports = {MostrarProductosModel, MostrarProductoPorIdModel, CrearProductoModel, EliminarProductoModel, ModificarProductoModel}