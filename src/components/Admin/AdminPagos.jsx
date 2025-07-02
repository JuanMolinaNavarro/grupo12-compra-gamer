import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PagosGrid from './PagosGrid'
import PagoDetalle from './PagoDetalle'
import PagosFiltros from './PagosFiltros'
import '../../styles/AdminPagos.css'

const AdminPagos = () => {
  const [pagos, setPagos] = useState([])
  const [pagosFiltrados, setPagosFiltrados] = useState([])
  const [metodosPago, setMetodosPago] = useState([])
  const [vista, setVista] = useState('grid') // 'grid', 'detalle'
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null)
  const [filtros, setFiltros] = useState({
    usuario: '',
    email: '',
    metodo_pago: '',
    estado: '',
    fecha_desde: '',
    fecha_hasta: '',
    monto_min: '',
    monto_max: ''
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const [pagosRes, metodosRes] = await Promise.all([
        axios.get('http://localhost:8000/pagos'),
        axios.get('http://localhost:8000/metodos-pago')
      ])
      
      setPagos(pagosRes.data)
      setMetodosPago(metodosRes.data)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    }
  }

  const aplicarFiltros = () => {
    let pagosFiltrados = [...pagos]

    // Filtro por usuario
    if (filtros.usuario) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        `${pago.usuario_nombre} ${pago.usuario_apellido}`.toLowerCase().includes(filtros.usuario.toLowerCase())
      )
    }

    // Filtro por email
    if (filtros.email) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        pago.usuario_email.toLowerCase().includes(filtros.email.toLowerCase())
      )
    }

    // Filtro por método de pago
    if (filtros.metodo_pago) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        pago.metodo_pago.toLowerCase().includes(filtros.metodo_pago.toLowerCase())
      )
    }

    // Filtro por estado del pedido
    if (filtros.estado) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        pago.estado.toLowerCase().includes(filtros.estado.toLowerCase())
      )
    }

    // Filtro por fecha desde
    if (filtros.fecha_desde) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        new Date(pago.fecha_pago) >= new Date(filtros.fecha_desde)
      )
    }

    // Filtro por fecha hasta
    if (filtros.fecha_hasta) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        new Date(pago.fecha_pago) <= new Date(filtros.fecha_hasta)
      )
    }

    // Filtro por monto mínimo
    if (filtros.monto_min) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        parseFloat(pago.monto) >= parseFloat(filtros.monto_min)
      )
    }

    // Filtro por monto máximo
    if (filtros.monto_max) {
      pagosFiltrados = pagosFiltrados.filter(pago =>
        parseFloat(pago.monto) <= parseFloat(filtros.monto_max)
      )
    }

    setPagosFiltrados(pagosFiltrados)
  }

  useEffect(() => {
    aplicarFiltros()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagos, filtros])

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  const limpiarFiltros = () => {
    setFiltros({
      usuario: '',
      email: '',
      metodo_pago: '',
      estado: '',
      fecha_desde: '',
      fecha_hasta: '',
      monto_min: '',
      monto_max: ''
    })
  }

  const hayFiltrosActivos = () => {
    return Object.values(filtros).some(filtro => filtro !== '')
  }

  const handleVerDetalle = (pago) => {
    setPagoSeleccionado(pago)
    setVista('detalle')
  }

  const handleVolverGrid = () => {
    setVista('grid')
    setPagoSeleccionado(null)
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-titulo">
          <h1>💳 Administración de Pagos</h1>
          <div className="admin-navegacion">
            <Link to="/admin" className="nav-link">Productos</Link>
            <span className="nav-link active">Pagos</span>
            <Link to="/admin/marcas" className="nav-link">Marcas</Link>
            <Link to="/admin/categorias" className="nav-link">Categorías</Link>
          </div>
        </div>
        <div className="admin-actions">
          {vista === 'grid' && hayFiltrosActivos() && (
            <button className="btn-limpiar-filtros" onClick={limpiarFiltros}>
              🧹 Limpiar Filtros
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
          <PagosFiltros
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            metodosPago={metodosPago}
          />
          
          <div className="resultados-info">
            Mostrando {pagosFiltrados.length} de {pagos.length} pagos
            {hayFiltrosActivos() && ' (filtrado)'}
          </div>
          
          <PagosGrid
            pagos={pagosFiltrados}
            onVerDetalle={handleVerDetalle}
          />
        </>
      )}

      {vista === 'detalle' && (
        <PagoDetalle
          pago={pagoSeleccionado}
          onVolver={handleVolverGrid}
        />
      )}
    </div>
  )
}

export default AdminPagos
