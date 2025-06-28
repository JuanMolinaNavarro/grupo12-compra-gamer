import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductoGrid from './ProductoGrid'
import ProductoForm from './ProductoForm'
import ProductoDetalle from './ProductoDetalle'
import ProductoFiltros from './ProductoFiltros'
import '../../styles/Admin.css'

const AdminProductos = () => {
  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [categorias, setCategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [vista, setVista] = useState('grid') // 'grid', 'form', 'detalle'
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [accion, setAccion] = useState('') // 'crear', 'editar', 'ver'
  const [filtros, setFiltros] = useState({
    id: '',
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    marca: ''
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const [productosRes, categoriasRes, marcasRes] = await Promise.all([
        axios.get('http://localhost:8000/productos'),
        axios.get('http://localhost:8000/categorias'),
        axios.get('http://localhost:8000/marcas')
      ])
      
      setProductos(productosRes.data)
      setCategorias(categoriasRes.data)
      setMarcas(marcasRes.data)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    }
  }

  const aplicarFiltros = () => {
    let productosFiltrados = [...productos]

    // Filtro por ID
    if (filtros.id) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.id_producto.toString().includes(filtros.id)
      )
    }

    // Filtro por nombre
    if (filtros.nombre) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      )
    }

    // Filtro por precio
    if (filtros.precio) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.precio.toString().includes(filtros.precio)
      )
    }

    // Filtro por stock
    if (filtros.stock) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.stock.toString().includes(filtros.stock)
      )
    }

    // Filtro por categoría
    if (filtros.categoria) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.id_categoria.toString().includes(filtros.categoria)
      )
    }

    // Filtro por marca
    if (filtros.marca) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.id_marca.toString().includes(filtros.marca)
      )
    }

    setProductosFiltrados(productosFiltrados)
  }

  useEffect(() => {
    aplicarFiltros()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos, filtros])

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  const limpiarFiltros = () => {
    setFiltros({
      id: '',
      nombre: '',
      precio: '',
      stock: '',
      categoria: '',
      marca: ''
    })
  }

  const hayFiltrosActivos = () => {
    return Object.values(filtros).some(filtro => filtro !== '')
  }

  const handleCrearProducto = () => {
    setAccion('crear')
    setProductoSeleccionado(null)
    setVista('form')
  }

  const handleEditarProducto = (producto) => {
    setAccion('editar')
    setProductoSeleccionado(producto)
    setVista('form')
  }

  const handleVerProducto = (producto) => {
    setAccion('ver')
    setProductoSeleccionado(producto)
    setVista('detalle')
  }

  const handleEliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await axios.delete(`http://localhost:8000/productos/eliminar/${id}`)
        alert('Producto eliminado correctamente')
        cargarDatos()
      } catch (error) {
        console.error('Error al eliminar producto:', error)
        alert('Error al eliminar el producto')
      }
    }
  }

  const handleVolverGrid = () => {
    setVista('grid')
    setProductoSeleccionado(null)
    setAccion('')
    cargarDatos()
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🛍️ Administración de Productos</h1>
        <div className="admin-actions">
          <Link to="/admin/pagos" className="btn-navegacion">
            💳 Ver Pagos
          </Link>
          {vista === 'grid' && hayFiltrosActivos() && (
            <button className="btn-limpiar-filtros" onClick={limpiarFiltros}>
              🧹 Limpiar Filtros
            </button>
          )}
          {vista === 'grid' && (
            <button className="btn-crear" onClick={handleCrearProducto}>
              + Agregar Producto
            </button>
          )}
          {vista !== 'grid' && (
            <button className="btn-volver" onClick={handleVolverGrid}>
              ← Volver al Grid
            </button>
          )}
        </div>
      </div>

      {vista === 'grid' && (
        <>
          <ProductoFiltros
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            categorias={categorias}
            marcas={marcas}
          />
          
          <div className="resultados-info">
            Mostrando {productosFiltrados.length} de {productos.length} productos
            {hayFiltrosActivos() && ' (filtrado)'}
          </div>
          
          <ProductoGrid
            productos={productosFiltrados}
            categorias={categorias}
            marcas={marcas}
            onEditar={handleEditarProducto}
            onVer={handleVerProducto}
            onEliminar={handleEliminarProducto}
          />
        </>
      )}

      {vista === 'form' && (
        <ProductoForm
          producto={productoSeleccionado}
          categorias={categorias}
          marcas={marcas}
          accion={accion}
          onVolver={handleVolverGrid}
        />
      )}

      {vista === 'detalle' && (
        <ProductoDetalle
          producto={productoSeleccionado}
          categorias={categorias}
          marcas={marcas}
          onVolver={handleVolverGrid}
        />
      )}
    </div>
  )
}

export default AdminProductos
