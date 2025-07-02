import React from 'react'

const CategoriaGrid = ({ categorias, onVer, onEditar, onEliminar }) => {
  const manejarAccion = (categoria, accion) => {
    switch (accion) {
      case 'ver':
        onVer(categoria)
        break
      case 'editar':
        onEditar(categoria)
        break
      case 'eliminar':
        onEliminar(categoria)
        break
      default:
        break
    }
  }

  return (
    <div className="grid-container">
      <div className="grid-header">
        <span>Total: {categorias.length} categorías</span>
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
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No se encontraron categorías
                </td>
              </tr>
            ) : (
              categorias.map(categoria => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td className="nombre-categoria">{categoria.nombre}</td>
                  <td className="descripcion-categoria">
                    {categoria.descripcion || '-'}
                  </td>
                  <td className="acciones">
                    <div className="menu-acciones">
                      <button className="btn-menu">⋮</button>
                      <div className="menu-dropdown">
                        <button 
                          onClick={() => manejarAccion(categoria, 'ver')}
                          className="menu-item"
                        >
                          👁️ Ver
                        </button>
                        <button 
                          onClick={() => manejarAccion(categoria, 'editar')}
                          className="menu-item"
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => manejarAccion(categoria, 'eliminar')}
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

export default CategoriaGrid
