const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidosUsuario, obtenerDetallePedido } = require('../controllers/pedidos');

// Crear un nuevo pedido
router.post('/crear', crearPedido);

// Obtener pedidos de un usuario
router.get('/usuario/:id_usuario', obtenerPedidosUsuario);

// Obtener detalles de un pedido específico
router.get('/detalle/:id_pedido', obtenerDetallePedido);

module.exports = router;
