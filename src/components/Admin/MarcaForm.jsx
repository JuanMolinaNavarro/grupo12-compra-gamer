import React, { useState, useEffect } from 'react'

const MarcaForm = ({ marca, accion, onGuardar, onCancelar }) => {
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: ''
  })
  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (marca && accion === 'editar') {
      setDatos({
        nombre: marca.nombre || '',
        descripcion: marca.descripcion || ''
      })
    } else {
      setDatos({
        nombre: '',
        descripcion: ''
      })
    }
  }, [marca, accion])

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido'
    } else if (datos.nombre.length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres'
    } else if (datos.nombre.length > 100) {
      nuevosErrores.nombre = 'El nombre no puede tener más de 100 caracteres'
    }

    if (datos.descripcion && datos.descripcion.length > 500) {
      nuevosErrores.descripcion = 'La descripción no puede tener más de 500 caracteres'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarCambio = (campo, valor) => {
    setDatos(prev => ({
      ...prev,
      [campo]: valor
    }))
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[campo]) {
      setErrores(prev => ({
        ...prev,
        [campo]: ''
      }))
    }
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    
    if (validarFormulario()) {
      onGuardar(datos)
    }
  }

  const titulo = accion === 'crear' ? 'Nueva Marca' : 'Editar Marca'

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{titulo}</h2>
      </div>

      <form onSubmit={manejarSubmit} className="marca-form">
        <div className="form-grid">
          <div className="form-campo">
            <label htmlFor="nombre">
              Nombre <span className="requerido">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={datos.nombre}
              onChange={(e) => manejarCambio('nombre', e.target.value)}
              className={errores.nombre ? 'error' : ''}
              placeholder="Ingrese el nombre de la marca"
            />
            {errores.nombre && (
              <span className="error-mensaje">{errores.nombre}</span>
            )}
          </div>

          <div className="form-campo campo-completo">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={datos.descripcion}
              onChange={(e) => manejarCambio('descripcion', e.target.value)}
              className={errores.descripcion ? 'error' : ''}
              placeholder="Descripción opcional de la marca"
              rows="4"
            />
            {errores.descripcion && (
              <span className="error-mensaje">{errores.descripcion}</span>
            )}
          </div>
        </div>

        <div className="form-acciones">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            {accion === 'crear' ? 'Crear Marca' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MarcaForm
