import React from 'react'

const MarcaGrid = ({ marcas, onVer, onEditar, onEliminar }) => {
  const manejarAccion = (marca, accion) => {
    switch (accion) {
      case 'ver':
        onVer(marca)
        break
      case 'editar':
        onEditar(marca)
        break
      case 'eliminar':
        onEliminar(marca)
        break
      default:
        break
    }
  }

  return (
    <div className="grid-container">
      <div className="grid-header">
        <span>Total: {marcas.length} marcas</span>
      </div>
      
      <div className="grid-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No se encontraron marcas
                </td>
              </tr>
            ) : (
              marcas.map(marca => (
                <tr key={marca.id}>
                  <td>{marca.id}</td>
                  <td className="nombre-marca">{marca.nombre}</td>
                  <td className="descripcion-marca">
                    {marca.descripcion || '-'}
                  </td>
                  <td className="acciones">
                    <div className="menu-acciones">
                      <button className="btn-menu">⋮</button>
                      <div className="menu-dropdown">
                        <button 
                          onClick={() => manejarAccion(marca, 'ver')}
                          className="menu-item"
                        >
                          👁️ Ver
                        </button>
                        <button 
                          onClick={() => manejarAccion(marca, 'editar')}
                          className="menu-item"
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => manejarAccion(marca, 'eliminar')}
                          className="menu-item eliminar"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MarcaGrid
