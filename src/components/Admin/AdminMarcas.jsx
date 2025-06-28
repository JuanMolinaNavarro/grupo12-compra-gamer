import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MarcaGrid from './MarcaGrid'
import MarcaForm from './MarcaForm'
import MarcaDetalle from './MarcaDetalle'
import MarcaFiltros from './MarcaFiltros'
import '../../styles/AdminMarcas.css'

const AdminMarcas = () => {
  const [marcas, setMarcas] = useState([])
  const [marcasFiltradas, setMarcasFiltradas] = useState([])
  const [vista, setVista] = useState('grid') // 'grid', 'form', 'detalle'
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null)
  const [accion, setAccion] = useState('') // 'crear', 'editar', 'ver'
  const [filtros, setFiltros] = useState({
    id: '',
    nombre: '',
    descripcion: ''
  })

  useEffect(() => {
    cargarMarcas()
  }, [])

  useEffect(() => {
    const aplicarFiltrosLocal = () => {
      let marcasFiltradas = [...marcas]

      // Filtro por ID
      if (filtros.id) {
        marcasFiltradas = marcasFiltradas.filter(marca =>
          marca.id.toString().includes(filtros.id)
        )
      }

      // Filtro por nombre
      if (filtros.nombre) {
        marcasFiltradas = marcasFiltradas.filter(marca =>
          marca.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
        )
      }

      // Filtro por descripción
      if (filtros.descripcion) {
        marcasFiltradas = marcasFiltradas.filter(marca =>
          marca.descripcion && marca.descripcion.toLowerCase().includes(filtros.descripcion.toLowerCase())
        )
      }

      setMarcasFiltradas(marcasFiltradas)
    }
    
    aplicarFiltrosLocal()
  }, [marcas, filtros])

  const cargarMarcas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/marcas')
      setMarcas(response.data)
    } catch (error) {
      console.error('Error al cargar marcas:', error)
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
    setMarcaSeleccionada(null)
    setVista('form')
  }

  const manejarEditar = (marca) => {
    setAccion('editar')
    setMarcaSeleccionada(marca)
    setVista('form')
  }

  const manejarVer = (marca) => {
    setAccion('ver')
    setMarcaSeleccionada(marca)
    setVista('detalle')
  }

  const manejarEliminar = async (marca) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la marca "${marca.nombre}"?`)) {
      try {
        await axios.delete(`http://localhost:8000/marcas/${marca.id}`)
        cargarMarcas()
        alert('Marca eliminada exitosamente')
      } catch (error) {
        console.error('Error al eliminar marca:', error)
        if (error.response?.data?.error) {
          alert(error.response.data.error)
        } else {
          alert('Error al eliminar la marca')
        }
      }
    }
  }

  const manejarGuardar = async (datos) => {
    try {
      if (accion === 'crear') {
        await axios.post('http://localhost:8000/marcas', datos)
        alert('Marca creada exitosamente')
      } else if (accion === 'editar') {
        await axios.put(`http://localhost:8000/marcas/${marcaSeleccionada.id}`, datos)
        alert('Marca actualizada exitosamente')
      }
      cargarMarcas()
      setVista('grid')
    } catch (error) {
      console.error('Error al guardar marca:', error)
      if (error.response?.data?.error) {
        alert(error.response.data.error)
      } else {
        alert('Error al guardar la marca')
      }
    }
  }

  const manejarCancelar = () => {
    setVista('grid')
    setMarcaSeleccionada(null)
    setAccion('')
  }

  const manejarVolverAGrid = () => {
    setVista('grid')
    setMarcaSeleccionada(null)
    setAccion('')
  }

  return (
    <div className="admin-marcas">
      <div className="admin-header">
        <div className="admin-titulo">
          <h1>Administración de Marcas</h1>
          <div className="admin-navegacion">
            <Link to="/admin" className="nav-link">Productos</Link>
            <Link to="/admin/pagos" className="nav-link">Pagos</Link>
            <span className="nav-link active">Marcas</span>
            <Link to="/admin/categorias" className="nav-link">Categorías</Link>
          </div>
        </div>
        
        {vista === 'grid' && (
          <div className="admin-acciones">
            <button 
              className="btn btn-primary"
              onClick={manejarCrear}
            >
              Nueva Marca
            </button>
          </div>
        )}
      </div>

      {vista === 'grid' && (
        <>
          <MarcaFiltros
            filtros={filtros}
            setFiltros={setFiltros}
            limpiarFiltros={limpiarFiltros}
          />
          <MarcaGrid
            marcas={marcasFiltradas}
            onVer={manejarVer}
            onEditar={manejarEditar}
            onEliminar={manejarEliminar}
          />
        </>
      )}

      {vista === 'form' && (
        <MarcaForm
          marca={marcaSeleccionada}
          accion={accion}
          onGuardar={manejarGuardar}
          onCancelar={manejarCancelar}
        />
      )}

      {vista === 'detalle' && (
        <MarcaDetalle
          marca={marcaSeleccionada}
          onVolver={manejarVolverAGrid}
          onEditar={manejarEditar}
        />
      )}
    </div>
  )
}

export default AdminMarcas
