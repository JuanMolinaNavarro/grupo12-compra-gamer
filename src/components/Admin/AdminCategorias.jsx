import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CategoriaGrid from './CategoriaGrid'
import CategoriaForm from './CategoriaForm'
import CategoriaDetalle from './CategoriaDetalle'
import CategoriaFiltros from './CategoriaFiltros'
import '../../styles/AdminCategorias.css'

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([])
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([])
  const [vista, setVista] = useState('grid') // 'grid', 'form', 'detalle'
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [accion, setAccion] = useState('') // 'crear', 'editar', 'ver'
  const [filtros, setFiltros] = useState({
    id: '',
    nombre: '',
    descripcion: ''
  })

  useEffect(() => {
    cargarCategorias()
  }, [])

  useEffect(() => {
    const aplicarFiltrosLocal = () => {
      let categoriasFiltradas = [...categorias]

      // Filtro por ID
      if (filtros.id) {
        categoriasFiltradas = categoriasFiltradas.filter(categoria =>
          categoria.id.toString().includes(filtros.id)
        )
      }

      // Filtro por nombre
      if (filtros.nombre) {
        categoriasFiltradas = categoriasFiltradas.filter(categoria =>
          categoria.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
        )
      }

      // Filtro por descripción
      if (filtros.descripcion) {
        categoriasFiltradas = categoriasFiltradas.filter(categoria =>
          categoria.descripcion && categoria.descripcion.toLowerCase().includes(filtros.descripcion.toLowerCase())
        )
      }

      setCategoriasFiltradas(categoriasFiltradas)
    }
    
    aplicarFiltrosLocal()
  }, [categorias, filtros])

  const cargarCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categorias')
      setCategorias(response.data)
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    }
  }

  const limpiarFiltros = () => {
    setFiltros({
      id: '',
      nombre: '',
      descripcion: ''
    })
  }

  const manejarCrear = () => {
    setAccion('crear')
    setCategoriaSeleccionada(null)
    setVista('form')
  }

  const manejarEditar = (categoria) => {
    setAccion('editar')
    setCategoriaSeleccionada(categoria)
    setVista('form')
  }

  const manejarVer = (categoria) => {
    setAccion('ver')
    setCategoriaSeleccionada(categoria)
    setVista('detalle')
  }

  const manejarEliminar = async (categoria) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoria.nombre}"?`)) {
      try {
        await axios.delete(`http://localhost:8000/categorias/${categoria.id}`)
        cargarCategorias()
        alert('Categoría eliminada exitosamente')
      } catch (error) {
        console.error('Error al eliminar categoría:', error)
        if (error.response?.data?.error) {
          alert(error.response.data.error)
        } else {
          alert('Error al eliminar la categoría')
        }
      }
    }
  }

  const manejarGuardar = async (datos) => {
    try {
      if (accion === 'crear') {
        await axios.post('http://localhost:8000/categorias', datos)
        alert('Categoría creada exitosamente')
      } else if (accion === 'editar') {
        await axios.put(`http://localhost:8000/categorias/${categoriaSeleccionada.id}`, datos)
        alert('Categoría actualizada exitosamente')
      }
      cargarCategorias()
      setVista('grid')
    } catch (error) {
      console.error('Error al guardar categoría:', error)
      if (error.response?.data?.error) {
        alert(error.response.data.error)
      } else {
        alert('Error al guardar la categoría')
      }
    }
  }

  const manejarCancelar = () => {
    setVista('grid')
    setCategoriaSeleccionada(null)
    setAccion('')
  }

  const manejarVolverAGrid = () => {
    setVista('grid')
    setCategoriaSeleccionada(null)
    setAccion('')
  }

  return (
    <div className="admin-categorias">
      <div className="admin-header">
        <div className="admin-titulo">
          <h1>Administración de Categorías</h1>
          <div className="admin-navegacion">
            <Link to="/admin" className="nav-link">Productos</Link>
            <Link to="/admin/pagos" className="nav-link">Pagos</Link>
            <Link to="/admin/marcas" className="nav-link">Marcas</Link>
            <span className="nav-link active">Categorías</span>
          </div>
        </div>
        
        {vista === 'grid' && (
          <div className="admin-acciones">
            <button 
              className="btn btn-primary"
              onClick={manejarCrear}
            >
              Nueva Categoría
            </button>
          </div>
        )}
      </div>

      {vista === 'grid' && (
        <>
          <CategoriaFiltros
            filtros={filtros}
            setFiltros={setFiltros}
            limpiarFiltros={limpiarFiltros}
          />
          <CategoriaGrid
            categorias={categoriasFiltradas}
            onVer={manejarVer}
            onEditar={manejarEditar}
            onEliminar={manejarEliminar}
          />
        </>
      )}

      {vista === 'form' && (
        <CategoriaForm
          categoria={categoriaSeleccionada}
          accion={accion}
          onGuardar={manejarGuardar}
          onCancelar={manejarCancelar}
        />
      )}

      {vista === 'detalle' && (
        <CategoriaDetalle
          categoria={categoriaSeleccionada}
          onVolver={manejarVolverAGrid}
          onEditar={manejarEditar}
        />
      )}
    </div>
  )
}

export default AdminCategorias
