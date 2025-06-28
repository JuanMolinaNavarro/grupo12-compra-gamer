import React from 'react'

const MarcaDetalle = ({ marca, onVolver, onEditar }) => {
  if (!marca) {
    return (
      <div className="detalle-container">
        <div className="error-mensaje">No se encontró la marca</div>
      </div>
    )
  }

  return (
    <div className="detalle-container">
      <div className="detalle-header">
        <h2>Detalle de Marca</h2>
        <div className="detalle-acciones">
          <button 
            className="btn btn-secondary"
            onClick={onVolver}
          >
            Volver
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => onEditar(marca)}
          >
            Editar
          </button>
        </div>
      </div>

      <div className="detalle-content">
        <div className="detalle-seccion">
          <h3>Información General</h3>
          <div className="detalle-grid">
            <div className="detalle-campo">
              <label>ID:</label>
              <span>{marca.id}</span>
            </div>
            <div className="detalle-campo">
              <label>Nombre:</label>
              <span className="valor-destacado">{marca.nombre}</span>
            </div>
            <div className="detalle-campo campo-completo">
              <label>Descripción:</label>
              <span className="descripcion-texto">
                {marca.descripcion || 'Sin descripción'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarcaDetalle
