const express = require("express")
const { getAllPagos, getProductosPedido, getMetodosPago, getEstadisticasPagos } = require("../controllers/pagos")

const router = express.Router()

// Obtener todos los pagos con información completa
router.get("/pagos", getAllPagos)

// Obtener productos de un pedido específico
router.get("/pagos/pedido/:id_pedido/productos", getProductosPedido)

// Obtener métodos de pago
router.get("/metodos-pago", getMetodosPago)

// Obtener estadísticas de pagos
router.get("/pagos/estadisticas", getEstadisticasPagos)

module.exports = router
