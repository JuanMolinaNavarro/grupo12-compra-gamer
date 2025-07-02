const { connection } = require("../config/database")

// Obtener todos los pagos con información completa
const getAllPagos = (req, res) => {
  const query = `
    SELECT 
      pa.id_pago,
      pa.monto,
      pa.fecha_pago,
      pe.id_pedido,
      pe.fecha as fecha_pedido,
      pe.total as total_pedido,
      pe.estado,
      u.id_usuario,
      u.nombre as usuario_nombre,
      u.apellido as usuario_apellido,
      u.email as usuario_email,
      mp.nombre as metodo_pago,
      d.direccion,
      d.ciudad,
      d.provincia
    FROM Pagos pa
    JOIN Pedidos pe ON pa.id_pedido = pe.id_pedido
    JOIN Usuarios u ON pe.id_usuario = u.id_usuario
    JOIN MetodosPago mp ON pa.id_metodo = mp.id_metodo
    LEFT JOIN Direcciones d ON pe.id_direccion = d.id_direccion
    ORDER BY pa.fecha_pago DESC
  `
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener pagos" })
    }
    res.json(results)
  })
}

// Obtener productos de un pedido específico
const getProductosPedido = (req, res) => {
  const { id_pedido } = req.params
  
  const query = `
    SELECT 
      dp.id_detalle,
      dp.cantidad,
      dp.precio_unitario,
      p.id_producto,
      p.nombre as producto_nombre,
      p.descripcion,
      p.imagen_url,
      c.nombre as categoria_nombre,
      m.nombre as marca_nombre,
      (dp.cantidad * dp.precio_unitario) as subtotal
    FROM DetallePedido dp
    JOIN Productos p ON dp.id_producto = p.id_producto
    LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria
    LEFT JOIN Marcas m ON p.id_marca = m.id_marca
    WHERE dp.id_pedido = ?
  `
  
  connection.query(query, [id_pedido], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener productos del pedido" })
    }
    res.json(results)
  })
}

// Obtener métodos de pago disponibles
const getMetodosPago = (req, res) => {
  const query = "SELECT * FROM MetodosPago ORDER BY nombre"
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener métodos de pago" })
    }
    res.json(results)
  })
}

// Obtener estadísticas de pagos
const getEstadisticasPagos = (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_pagos,
      SUM(monto) as total_monto,
      AVG(monto) as promedio_monto,
      MAX(monto) as pago_maximo,
      MIN(monto) as pago_minimo,
      mp.nombre as metodo_pago,
      COUNT(pa.id_pago) as cantidad_por_metodo,
      SUM(pa.monto) as total_por_metodo
    FROM Pagos pa
    JOIN MetodosPago mp ON pa.id_metodo = mp.id_metodo
    GROUP BY mp.id_metodo, mp.nombre
    ORDER BY total_por_metodo DESC
  `
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener estadísticas" })
    }
    res.json(results)
  })
}

module.exports = {
  getAllPagos,
  getProductosPedido,
  getMetodosPago,
  getEstadisticasPagos
}
