import React from 'react'

const PagosFiltros = ({ filtros, onFiltroChange, metodosPago }) => {
  
  const estados = ['pendiente', 'pagado', 'enviado', 'cancelado']

  return (
    <div className="filtros-container">
      <h3>🔍 Filtrar Pagos</h3>
      <div className="filtros-grid pagos-filtros">
        
        {/* Filtro por Usuario */}
        <div className="filtro-item">
          <label>Usuario</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={filtros.usuario}
              onChange={(e) => onFiltroChange('usuario', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Email */}
        <div className="filtro-item">
          <label>Email</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Buscar por email..."
              value={filtros.email}
              onChange={(e) => onFiltroChange('email', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Método de Pago */}
        <div className="filtro-item">
          <label>Método de Pago</label>
          <div className="filtro-select-container">
            <select
              value={filtros.metodo_pago}
              onChange={(e) => onFiltroChange('metodo_pago', e.target.value)}
            >
              <option value="">Todos los métodos</option>
              {metodosPago.map(metodo => (
                <option key={metodo.id_metodo} value={metodo.nombre}>
                  {metodo.nombre}
                </option>
              ))}
            </select>
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Estado */}
        <div className="filtro-item">
          <label>Estado del Pedido</label>
          <div className="filtro-select-container">
            <select
              value={filtros.estado}
              onChange={(e) => onFiltroChange('estado', e.target.value)}
            >
              <option value="">Todos los estados</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </option>
              ))}
            </select>
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Fecha Desde */}
        <div className="filtro-item">
          <label>Fecha Desde</label>
          <div className="input-with-icon">
            <input
              type="date"
              value={filtros.fecha_desde}
              onChange={(e) => onFiltroChange('fecha_desde', e.target.value)}
            />
            <span className="search-icon">📅</span>
          </div>
        </div>

        {/* Filtro por Fecha Hasta */}
        <div className="filtro-item">
          <label>Fecha Hasta</label>
          <div className="input-with-icon">
            <input
              type="date"
              value={filtros.fecha_hasta}
              onChange={(e) => onFiltroChange('fecha_hasta', e.target.value)}
            />
            <span className="search-icon">📅</span>
          </div>
        </div>

        {/* Filtro por Monto Mínimo */}
        <div className="filtro-item">
          <label>Monto Mínimo</label>
          <div className="input-with-icon">
            <input
              type="number"
              placeholder="$0"
              value={filtros.monto_min}
              onChange={(e) => onFiltroChange('monto_min', e.target.value)}
            />
            <span className="search-icon">💰</span>
          </div>
        </div>

        {/* Filtro por Monto Máximo */}
        <div className="filtro-item">
          <label>Monto Máximo</label>
          <div className="input-with-icon">
            <input
              type="number"
              placeholder="$999999"
              value={filtros.monto_max}
              onChange={(e) => onFiltroChange('monto_max', e.target.value)}
            />
            <span className="search-icon">💰</span>
          </div>
        </div>

      </div>

      {/* Resumen de filtros activos */}
      <div className="filtros-activos">
        {filtros.usuario && (
          <span className="filtro-tag">
            Usuario: {filtros.usuario}
            <button onClick={() => onFiltroChange('usuario', '')}>×</button>
          </span>
        )}
        {filtros.email && (
          <span className="filtro-tag">
            Email: {filtros.email}
            <button onClick={() => onFiltroChange('email', '')}>×</button>
          </span>
        )}
        {filtros.metodo_pago && (
          <span className="filtro-tag">
            Método: {filtros.metodo_pago}
            <button onClick={() => onFiltroChange('metodo_pago', '')}>×</button>
          </span>
        )}
        {filtros.estado && (
          <span className="filtro-tag">
            Estado: {filtros.estado}
            <button onClick={() => onFiltroChange('estado', '')}>×</button>
          </span>
        )}
        {filtros.fecha_desde && (
          <span className="filtro-tag">
            Desde: {filtros.fecha_desde}
            <button onClick={() => onFiltroChange('fecha_desde', '')}>×</button>
          </span>
        )}
        {filtros.fecha_hasta && (
          <span className="filtro-tag">
            Hasta: {filtros.fecha_hasta}
            <button onClick={() => onFiltroChange('fecha_hasta', '')}>×</button>
          </span>
        )}
        {filtros.monto_min && (
          <span className="filtro-tag">
            Min: ${filtros.monto_min}
            <button onClick={() => onFiltroChange('monto_min', '')}>×</button>
          </span>
        )}
        {filtros.monto_max && (
          <span className="filtro-tag">
            Max: ${filtros.monto_max}
            <button onClick={() => onFiltroChange('monto_max', '')}>×</button>
          </span>
        )}
      </div>
    </div>
  )
}

export default PagosFiltros
