import React from 'react'

const MarcaFiltros = ({ filtros, setFiltros, limpiarFiltros }) => {
  const manejarCambio = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  return (
    <div className="filtros-container">
      <h3>Filtros</h3>
      <div className="filtros-grid">
        <div className="filtro-campo">
          <label>ID:</label>
          <input
            type="text"
            value={filtros.id}
            onChange={(e) => manejarCambio('id', e.target.value)}
            placeholder="Filtrar por ID"
          />
        </div>

        <div className="filtro-campo">
          <label>Nombre:</label>
          <input
            type="text"
            value={filtros.nombre}
            onChange={(e) => manejarCambio('nombre', e.target.value)}
            placeholder="Filtrar por nombre"
          />
        </div>

        <div className="filtro-campo">
          <label>Descripción:</label>
          <input
            type="text"
            value={filtros.descripcion}
            onChange={(e) => manejarCambio('descripcion', e.target.value)}
            placeholder="Filtrar por descripción"
          />
        </div>

        <div className="filtro-acciones">
          <button 
            className="btn btn-secondary"
            onClick={limpiarFiltros}
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarcaFiltros
