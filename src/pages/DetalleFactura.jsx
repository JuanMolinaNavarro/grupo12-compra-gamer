import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useCartStore from '../stores/cartStore';
import useAuthStore from '../stores/authStore';
import '../styles/Cart.css';
import axios from 'axios';

const DetalleFactura = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total, clearCart } = useCartStore();
  const { usuario, isLoggedIn } = useAuthStore();
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Obtener datos del formulario del estado de la navegación
  const { direccion, pago } = location.state || {};

  useEffect(() => {
    // Redirigir si no hay datos del pedido
    if (!direccion || !pago || !isLoggedIn || items.length === 0) {
      navigate('/carrito');
    }
  }, [direccion, pago, isLoggedIn, items, navigate]);

  const handleFinalizarCompra = async () => {
    setLoading(true);

    try {
      // Crear pedido
      const pedidoData = {
        id_usuario: usuario.id_usuario,
        total: total,
        direccion: direccion,
        items: items.map(item => ({
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          precio_unitario: item.precio
        }))
      };

      const response = await axios.post('http://localhost:8000/pedidos/crear', pedidoData);

      if (response.data.success) {
        alert('¡Pedido realizado con éxito!');
        clearCart();
        navigate('/');
      }
    } catch (error) {
      alert('Error al procesar el pedido: ' + (error.response?.data?.message || 'Error del servidor'));
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  const handleConfirmarPago = () => {
    setShowConfirmModal(true);
  };

  const handleCancelarConfirmacion = () => {
    setShowConfirmModal(false);
  };

  const handleVolver = () => {
    navigate('/carrito');
  };

  if (!direccion || !pago || !isLoggedIn) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="detalle-factura-container">
        <h2>Detalle de la Factura</h2>
        
        {/* Información del cliente */}
        <div className="detalle-factura-content">
          <div className="checkout-section">
            <h4>Datos del Cliente</h4>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
          </div>

          {/* Dirección de envío */}
          <div className="checkout-section">
            <h4>Dirección de Envío</h4>
            <p><strong>Dirección:</strong> {direccion.direccion}</p>
            <p><strong>Ciudad:</strong> {direccion.ciudad}</p>
            <p><strong>Provincia:</strong> {direccion.provincia}</p>
            <p><strong>Código Postal:</strong> {direccion.codigo_postal}</p>
            <p><strong>País:</strong> {direccion.pais}</p>
          </div>

          {/* Método de pago */}
          <div className="checkout-section">
            <h4>Método de Pago</h4>
            <p><strong>Tarjeta:</strong> **** **** **** {pago.numero_tarjeta.slice(-4)}</p>
            <p><strong>Titular:</strong> {pago.nombre_titular}</p>
            <p><strong>Vencimiento:</strong> {pago.fecha_vencimiento}</p>
          </div>

          {/* Productos del pedido */}
          <div className="checkout-section">
            <h4>Productos del Pedido</h4>
            <div className="carrito-items">
              {items.map(item => (
                <div key={item.id_producto} className="carrito-item">
                  <img src={item.imagen_url} alt={item.nombre} className="item-imagen" />
                  <div className="item-info">
                    <h4>{item.nombre}</h4>
                    <p className="item-precio">${item.precio.toLocaleString('es-CL')}</p>
                  </div>
                  <div className="item-cantidad">
                    <label>Cantidad:</label>
                    <span className="cantidad-display">{item.cantidad}</span>
                  </div>
                  <div className="item-subtotal">
                    <p>${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total del pedido */}
          <div className="checkout-total">
            <h4>Total a Pagar: ${total.toLocaleString('es-CL')}</h4>
          </div>

          {/* Botones */}
          <div className="checkout-buttons">
            <button 
              className="btn-cancelar"
              onClick={handleVolver}
              disabled={loading}
            >
              Volver al Carrito
            </button>
            <button 
              className="btn-pagar"
              onClick={handleConfirmarPago}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Pagar'}
            </button>
          </div>
        </div>

        {/* Modal de confirmación */}
        {showConfirmModal && (
          <div className="checkout-modal">
            <div className="checkout-content">
              <h3>Confirmar Compra</h3>
              <div className="checkout-section">
                <p>¿Desea finalizar la compra?</p>
                <div className="checkout-total">
                  <h4>Total: ${total.toLocaleString('es-CL')}</h4>
                </div>
              </div>
              <div className="checkout-buttons">
                <button 
                  className="btn-cancelar"
                  onClick={handleCancelarConfirmacion}
                  disabled={loading}
                >
                  No
                </button>
                <button 
                  className="btn-pagar"
                  onClick={handleFinalizarCompra}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Sí'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetalleFactura;
