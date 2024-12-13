const express = require('express');
const ProductController = require('../Controllers/ProductController');

const router = express.Router();

router.get('/', ProductController.MostrarProductos);
router.get('/:id', ProductController.MostrarProductoPorId);
router.post('/', ProductController.CrearProducto);
router.put('/:id', ProductController.ModificarProducto);
router.delete('/:id', ProductController.EliminarProducto);

module.exports = router;