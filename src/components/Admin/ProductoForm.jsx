import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProductoForm = ({ producto, categorias, marcas, accion, onVolver }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    id_categoria: '',
    id_marca: '',
    imagen_url: ''
  })

  useEffect(() => {
    if (producto && accion === 'editar') {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        id_categoria: producto.id_categoria || '',
        id_marca: producto.id_marca || '',
        imagen_url: producto.imagen_url || ''
      })
    }
  }, [producto, accion])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (accion === 'crear') {
        await axios.post('http://localhost:8000/productos/crear', formData)
        alert('Producto creado correctamente')
      } else if (accion === 'editar') {
        await axios.put(`http://localhost:8000/productos/editar/${producto.id_producto}`, formData)
        alert('Producto actualizado correctamente')
      }
      onVolver()
    } catch (error) {
      console.error('Error al guardar producto:', error)
      alert('Error al guardar el producto')
    }
  }

  return (
    <div className="form-container">
      <h2>{accion === 'crear' ? 'Crear Nuevo Producto' : 'Editar Producto'}</h2>
      
      <form onSubmit={handleSubmit} className="producto-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Categoría:</label>
            <select
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Marca:</label>
            <select
              name="id_marca"
              value={formData.id_marca}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar marca</option>
              {marcas.map(marca => (
                <option key={marca.id_marca} value={marca.id_marca}>
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>URL de la imagen:</label>
          <input
            type="url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            required
          />
        </div>

        {formData.imagen_url && (
          <div className="preview-imagen">
            <label>Vista previa:</label>
            <img src={formData.imagen_url} alt="Preview" className="imagen-preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onVolver} className="btn-cancelar">
            Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            {accion === 'crear' ? 'Crear Producto' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductoForm
