import React from 'react'

const PagosGrid = ({ pagos, onVerDetalle }) => {
  
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

  return (
    <div className="grid-container">
      <div className="grid-header pagos-header">
        <div>ID Pago</div>
        <div>Usuario</div>
        <div>Email</div>
        <div>Monto</div>
        <div>Método</div>
        <div>Estado</div>
        <div>Fecha Pago</div>
        <div>ID Pedido</div>
        <div>Acciones</div>
      </div>

      <div className="grid-body">
        {pagos.map((pago) => (
          <div key={pago.id_pago} className="grid-row">
            <div className="pago-id">#{pago.id_pago}</div>
            <div className="usuario-info">
              <strong>{pago.usuario_nombre} {pago.usuario_apellido}</strong>
            </div>
            <div className="email-cell" title={pago.usuario_email}>
              {pago.usuario_email}
            </div>
            <div className="monto-cell">
              <strong>${pago.monto.toLocaleString()}</strong>
            </div>
            <div className="metodo-pago">
              {pago.metodo_pago}
            </div>
            <div className={`estado-cell ${getEstadoClass(pago.estado)}`}>
              {pago.estado}
            </div>
            <div className="fecha-cell">
              {formatearFecha(pago.fecha_pago)}
            </div>
            <div className="pedido-id">
              <span className="pedido-badge">#{pago.id_pedido}</span>
            </div>
            <div className="acciones-cell">
              <button 
                onClick={() => onVerDetalle(pago)}
                className="btn-ver-detalle"
              >
                👁️ Ver Detalle
              </button>
            </div>
          </div>
        ))}
      </div>

      {pagos.length === 0 && (
        <div className="empty-message">
          <h3>No se encontraron pagos</h3>
          <p>No hay pagos que coincidan con los filtros aplicados</p>
        </div>
      )}
    </div>
  )
}

export default PagosGrid
