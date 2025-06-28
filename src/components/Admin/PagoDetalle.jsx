import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PagoDetalle = ({ pago, onVolver }) => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (pago) {
      cargarProductos()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pago])

  const cargarProductos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8000/pagos/pedido/${pago.id_pedido}/productos`)
      setProductos(response.data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEstadoClass = (estado) => {
    switch (estado.toLowerCase()) {
      case 'pagado': return 'estado-pagado'
      case 'pendiente': return 'estado-pendiente'
      case 'enviado': return 'estado-enviado'
      case 'cancelado': return 'estado-cancelado'
      default: return ''
    }
  }

  if (!pago) return null

  return (
    <div className="detalle-container pago-detalle">
      <h2>💳 Detalle del Pago #{pago.id_pago}</h2>
      
      <div className="detalle-sections">
        
        {/* Información del Pago */}
        <section className="seccion-pago">
          <h3>💰 Información del Pago</h3>
          <div className="info-grid">
            <div className="info-group">
              <label>ID del Pago:</label>
              <span className="pago-id-badge">#{pago.id_pago}</span>
            </div>
            <div className="info-group">
              <label>Monto:</label>
              <span className="monto-destacado">${pago.monto.toLocaleString()}</span>
            </div>
            <div className="info-group">
              <label>Método de Pago:</label>
              <span>{pago.metodo_pago}</span>
            </div>
            <div className="info-group">
              <label>Fecha del Pago:</label>
              <span>{formatearFecha(pago.fecha_pago)}</span>
            </div>
          </div>
        </section>

        {/* Información del Pedido */}
        <section className="seccion-pedido">
          <h3>📦 Información del Pedido</h3>
          <div className="info-grid">
            <div className="info-group">
              <label>ID del Pedido:</label>
              <span className="pedido-id-badge">#{pago.id_pedido}</span>
            </div>
            <div className="info-group">
              <label>Estado:</label>
              <span className={`estado-badge ${getEstadoClass(pago.estado)}`}>
                {pago.estado}
              </span>
            </div>
            <div className="info-group">
              <label>Total del Pedido:</label>
              <span className="total-destacado">${pago.total_pedido.toLocaleString()}</span>
            </div>
            <div className="info-group">
              <label>Fecha del Pedido:</label>
              <span>{formatearFecha(pago.fecha_pedido)}</span>
            </div>
          </div>
        </section>

        {/* Información del Usuario */}
        <section className="seccion-usuario">
          <h3>👤 Información del Cliente</h3>
          <div className="info-grid">
            <div className="info-group">
              <label>Nombre:</label>
              <span>{pago.usuario_nombre} {pago.usuario_apellido}</span>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <span className="email-destacado">{pago.usuario_email}</span>
            </div>
            <div className="info-group">
              <label>Dirección:</label>
              <span>{pago.direccion || 'No especificada'}</span>
            </div>
            <div className="info-group">
              <label>Ciudad:</label>
              <span>{pago.ciudad || 'No especificada'}, {pago.provincia || ''}</span>
            </div>
          </div>
        </section>

        {/* Productos del Pedido */}
        <section className="seccion-productos">
          <h3>🛍️ Productos del Pedido</h3>
          {loading ? (
            <div className="loading-productos">Cargando productos...</div>
          ) : (
            <div className="productos-grid">
              {productos.map((producto) => (
                <div key={producto.id_detalle} className="producto-card">
                  <div className="producto-imagen">
                    <img src={producto.imagen_url} alt={producto.producto_nombre} />
                  </div>
                  <div className="producto-info">
                    <h4>{producto.producto_nombre}</h4>
                    <p className="producto-categoria">{producto.categoria_nombre} - {producto.marca_nombre}</p>
                    <div className="producto-detalles">
                      <div className="cantidad">
                        <label>Cantidad:</label>
                        <span>{producto.cantidad} unidades</span>
                      </div>
                      <div className="precio-unitario">
                        <label>Precio unitario:</label>
                        <span>${producto.precio_unitario.toLocaleString()}</span>
                      </div>
                      <div className="subtotal">
                        <label>Subtotal:</label>
                        <span className="subtotal-destacado">${producto.subtotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {productos.length > 0 && (
            <div className="resumen-productos">
              <div className="total-productos">
                <strong>Total de productos: {productos.reduce((sum, p) => sum + p.cantidad, 0)} unidades</strong>
              </div>
              <div className="total-general">
                <strong>Total del pedido: ${productos.reduce((sum, p) => sum + p.subtotal, 0).toLocaleString()}</strong>
              </div>
            </div>
          )}
        </section>

      </div>

      <div className="detalle-actions">
        <button onClick={onVolver} className="btn-volver">
          ← Volver al Grid de Pagos
        </button>
      </div>
    </div>
  )
}

export default PagoDetalle
