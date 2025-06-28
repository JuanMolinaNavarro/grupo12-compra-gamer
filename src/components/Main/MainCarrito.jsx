import React, { useState, useEffect } from 'react';
import useCartStore from '../../stores/cartStore';
import useAuthStore from '../../stores/authStore';
import '../../styles/Cart.css';
import axios from 'axios';

const MainCarrito = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart, initializeTotal } = useCartStore();
  const { usuario, isLoggedIn } = useAuthStore();
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [direccion, setDireccion] = useState({
    direccion: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    pais: 'Argentina'
  });
  
  const [pago, setPago] = useState({
    numero_tarjeta: '',
    fecha_vencimiento: '',
    cvv: '',
    nombre_titular: ''
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeTotal();
  }, [initializeTotal]);

  const handleQuantityChange = (id_producto, cantidad) => {
    updateQuantity(id_producto, parseInt(cantidad));
  };

  const handleRemoveItem = (id_producto) => {
    removeFromCart(id_producto);
  };

  const validateForm = () => {
    // Validar dirección
    if (!direccion.direccion || !direccion.ciudad || !direccion.provincia || !direccion.codigo_postal) {
      alert('Por favor complete todos los campos de dirección');
      return false;
    }

    // Validar datos de pago
    if (!pago.numero_tarjeta || !pago.fecha_vencimiento || !pago.cvv || !pago.nombre_titular) {
      alert('Por favor complete todos los campos de pago');
      return false;
    }

    // Validar que el número de tarjeta sea numérico
    if (!/^\d+$/.test(pago.numero_tarjeta.replace(/\s/g, ''))) {
      alert('El número de tarjeta debe contener solo números');
      return false;
    }

    // Validar que el CVV sea numérico
    if (!/^\d{3,4}$/.test(pago.cvv)) {
      alert('El CVV debe tener 3 o 4 dígitos');
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert('Debe iniciar sesión para realizar una compra');
      return;
    }

    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (!validateForm()) {
      return;
    }

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
        setShowCheckout(false);
        setDireccion({
          direccion: '',
          ciudad: '',
          provincia: '',
          codigo_postal: '',
          pais: 'Argentina'
        });
        setPago({
          numero_tarjeta: '',
          fecha_vencimiento: '',
          cvv: '',
          nombre_titular: ''
        });
      }
    } catch (error) {
      alert('Error al procesar el pedido: ' + (error.response?.data?.message || 'Error del servidor'));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="carrito-container">
        <h2>Carrito de Compras</h2>
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
          <p>¡Agrega algunos productos para comenzar!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      
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
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => handleQuantityChange(item.id_producto, e.target.value)}
              />
            </div>
            <div className="item-subtotal">
              <p>${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
            </div>
            <button 
              className="btn-remover"
              onClick={() => handleRemoveItem(item.id_producto)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-total">
        <h3>Total: ${total.toLocaleString('es-CL')}</h3>
        <button 
          className="btn-checkout"
          onClick={() => setShowCheckout(true)}
          disabled={!isLoggedIn}
        >
          {isLoggedIn ? 'Proceder al Pago' : 'Inicia sesión para comprar'}
        </button>
      </div>

      {showCheckout && (
        <div className="checkout-modal">
          <div className="checkout-content">
            <h3>Finalizar Compra</h3>
            
            <div className="checkout-section">
              <h4>Dirección de Envío</h4>
              <input
                type="text"
                placeholder="Dirección"
                value={direccion.direccion}
                onChange={(e) => setDireccion({...direccion, direccion: e.target.value})}
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={direccion.ciudad}
                onChange={(e) => setDireccion({...direccion, ciudad: e.target.value})}
              />
              <input
                type="text"
                placeholder="Provincia"
                value={direccion.provincia}
                onChange={(e) => setDireccion({...direccion, provincia: e.target.value})}
              />
              <input
                type="text"
                placeholder="Código Postal"
                value={direccion.codigo_postal}
                onChange={(e) => setDireccion({...direccion, codigo_postal: e.target.value})}
              />
            </div>

            <div className="checkout-section">
              <h4>Información de Pago</h4>
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={pago.numero_tarjeta}
                onChange={(e) => setPago({...pago, numero_tarjeta: e.target.value})}
              />
              <input
                type="text"
                placeholder="MM/AA"
                value={pago.fecha_vencimiento}
                onChange={(e) => setPago({...pago, fecha_vencimiento: e.target.value})}
              />
              <input
                type="text"
                placeholder="CVV"
                value={pago.cvv}
                onChange={(e) => setPago({...pago, cvv: e.target.value})}
              />
              <input
                type="text"
                placeholder="Nombre del Titular"
                value={pago.nombre_titular}
                onChange={(e) => setPago({...pago, nombre_titular: e.target.value})}
              />
            </div>

            <div className="checkout-total">
              <h4>Total a Pagar: ${total.toLocaleString('es-CL')}</h4>
            </div>

            <div className="checkout-buttons">
              <button 
                className="btn-cancelar"
                onClick={() => setShowCheckout(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                className="btn-pagar"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Pagar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCarrito;
