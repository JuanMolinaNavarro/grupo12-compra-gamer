const { connection } = require('../config/database');

// Crear un nuevo pedido
const crearPedido = async (req, res) => {
  const { id_usuario, total, direccion, items } = req.body;

  if (!id_usuario || !total || !direccion || !items || items.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Faltan datos requeridos' 
    });
  }

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error al iniciar transacción' 
      });
    }

    // Primero insertar la dirección
    const direccionQuery = `
      INSERT INTO Direcciones (id_usuario, direccion, ciudad, provincia, codigo_postal, pais) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    connection.query(direccionQuery, [
      id_usuario,
      direccion.direccion,
      direccion.ciudad,
      direccion.provincia,
      direccion.codigo_postal,
      direccion.pais
    ], (err, direccionResult) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ 
            success: false, 
            message: 'Error al guardar dirección' 
          });
        });
      }

      const id_direccion = direccionResult.insertId;

      // Insertar el pedido
      const pedidoQuery = `
        INSERT INTO Pedidos (id_usuario, total, estado, id_direccion) 
        VALUES (?, ?, 'pendiente', ?)
      `;
      
      connection.query(pedidoQuery, [id_usuario, total, id_direccion], (err, pedidoResult) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ 
              success: false, 
              message: 'Error al crear pedido' 
            });
          });
        }

        const id_pedido = pedidoResult.insertId;

        // Insertar los detalles del pedido
        const detallePromises = items.map(item => {
          return new Promise((resolve, reject) => {
            const detalleQuery = `
              INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, precio_unitario) 
              VALUES (?, ?, ?, ?)
            `;
            
            connection.query(detalleQuery, [
              id_pedido,
              item.id_producto,
              item.cantidad,
              item.precio_unitario
            ], (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        });

        Promise.all(detallePromises)
          .then(() => {
            // Crear registro de pago (simulado)
            const pagoQuery = `
              INSERT INTO Pagos (id_pedido, id_metodo, monto) 
              VALUES (?, 1, ?)
            `;
            
            connection.query(pagoQuery, [id_pedido, total], (err, pagoResult) => {
              if (err) {
                return connection.rollback(() => {
                  res.status(500).json({ 
                    success: false, 
                    message: 'Error al procesar pago' 
                  });
                });
              }

              // Actualizar estado del pedido a pagado
              const updateQuery = `UPDATE Pedidos SET estado = 'pagado' WHERE id_pedido = ?`;
              
              connection.query(updateQuery, [id_pedido], (err) => {
                if (err) {
                  return connection.rollback(() => {
                    res.status(500).json({ 
                      success: false, 
                      message: 'Error al actualizar estado' 
                    });
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json({ 
                        success: false, 
                        message: 'Error al confirmar transacción' 
                      });
                    });
                  }

                  res.json({
                    success: true,
                    message: 'Pedido creado exitosamente',
                    pedido_id: id_pedido
                  });
                });
              });
            });
          })
          .catch(() => {
            connection.rollback(() => {
              res.status(500).json({ 
                success: false, 
                message: 'Error al guardar detalles del pedido' 
              });
            });
          });
      });
    });
  });
};

// Obtener pedidos de un usuario
const obtenerPedidosUsuario = (req, res) => {
  const { id_usuario } = req.params;

  const query = `
    SELECT p.*, d.direccion, d.ciudad, d.provincia 
    FROM Pedidos p 
    JOIN Direcciones d ON p.id_direccion = d.id_direccion 
    WHERE p.id_usuario = ? 
    ORDER BY p.fecha DESC
  `;

  connection.query(query, [id_usuario], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error al obtener pedidos' 
      });
    }

    res.json({
      success: true,
      pedidos: results
    });
  });
};

// Obtener detalles de un pedido específico
const obtenerDetallePedido = (req, res) => {
  const { id_pedido } = req.params;

  const query = `
    SELECT dp.*, pr.nombre, pr.imagen_url 
    FROM DetallePedido dp 
    JOIN Productos pr ON dp.id_producto = pr.id_producto 
    WHERE dp.id_pedido = ?
  `;

  connection.query(query, [id_pedido], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error al obtener detalles del pedido' 
      });
    }

    res.json({
      success: true,
      detalles: results
    });
  });
};

module.exports = {
  crearPedido,
  obtenerPedidosUsuario,
  obtenerDetallePedido
};
