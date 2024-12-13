const ProductModel = require('../Models/ProductModel.js');

//función para mostrar todos los productos
const MostrarProductos = async (req, res) =>{
    try {
        const productos = await ProductModel.MostrarProductosModel();
        res.json(productos);
    } catch (error) {
        res.json({message: error.message});
    }
}

//función para mostrar un solo producto por id
const MostrarProductoPorId = async (req, res) =>{
    try {
        const producto = await ProductModel.MostrarProductoPorIdModel(req.params.id);
        res.json(producto);
    } catch (error) {
        res.json({message: error.message});
    }
}

//función para crear un producto
const CrearProducto = async (req, res) =>{
    try {
        const producto = await ProductModel.CrearProductoModel(req.body)
        res.json({message: `Producto ${req.body.nombre} creado correctamente`});
    } catch (error) {
        res.json({message: error.message});
    }
}

//función para modificar un producto por id
const ModificarProducto = async (req, res) =>{
    try {
        const id = req.params.id;
        const productoActualizado = req.body;
        const result = await ProductModel.ModificarProductoModel(id, productoActualizado);

        if (result.affectedRows == 0) {
            return res.status(404).json({message: 'Producto no encontrado' });
        }
        
        res.json({message: `Producto ${req.body.nombre} actualizado correctamente`, result: result});
    } catch (error) {
        res.json({message: error.message});
    }
}

//función para eliminar producto por id
const EliminarProducto = async (req, res) =>{
    try {
        const id = req.params.id;
        const result = await ProductModel.EliminarProductoModel(id);

        if (result.affectedRows == 0) {
            return res.status(404).json({message: 'Producto no encontrado' });
        }

        res.json({message: 'Producto eliminado con éxito' });

    } catch (error) {
        res.json({message: error.message});
    }
}

module.exports = {MostrarProductos, MostrarProductoPorId, CrearProducto, ModificarProducto, EliminarProducto}