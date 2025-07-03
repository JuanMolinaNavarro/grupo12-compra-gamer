// Importaciones necesarias para el componente
import React, { useState, useEffect } from 'react';
import useCartStore from '../../stores/cartStore'; // Store global del carrito
import useAuthStore from '../../stores/authStore'; // Store global de autenticación
import '../../styles/Cart.css'; // Estilos específicos del carrito
import axios from 'axios'; // Cliente HTTP para llamadas a la API

/**
 * Componente principal del carrito de compras
 * Maneja la visualización de productos en el carrito, 
 * actualización de cantidades, eliminación de items y proceso de checkout
 */
const MainCarrito = () => {
  // Destructuring del store del carrito - obtiene funciones y estado del carrito
  const { items, total, updateQuantity, removeFromCart, clearCart, initializeTotal } = useCartStore();
  
  // Destructuring del store de autenticación - obtiene datos del usuario
  const { usuario, isLoggedIn } = useAuthStore();
  
  // Estado local para controlar la visibilidad del modal de checkout
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Estado local para almacenar los datos de dirección de envío
  const [direccion, setDireccion] = useState({
    direccion: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    pais: 'Argentina' // Valor por defecto
  });
  
  // Estado local para almacenar los datos de pago (información de tarjeta)
  const [pago, setPago] = useState({
    numero_tarjeta: '',
    fecha_vencimiento: '',
    cvv: '',
    nombre_titular: ''
  });
  
  // Estado local para controlar el estado de carga durante el procesamiento del pedido
  const [loading, setLoading] = useState(false);

  // Hook useEffect que se ejecuta al montar el componente
  // Inicializa el total del carrito calculando el precio total de todos los items
  useEffect(() => {
    initializeTotal();
  }, [initializeTotal]);

  /**
   * Función para manejar el cambio de cantidad de un producto en el carrito
   * @param {number} id_producto - ID del producto a modificar
   * @param {string} cantidad - Nueva cantidad (viene como string del input)
   */
  const handleQuantityChange = (id_producto, cantidad) => {
    updateQuantity(id_producto, parseInt(cantidad)); // Convierte a entero y actualiza
  };

  /**
   * Función para manejar la eliminación de un producto del carrito
   * @param {number} id_producto - ID del producto a eliminar
   */
  const handleRemoveItem = (id_producto) => {
    removeFromCart(id_producto);
  };

  /**
   * Función para validar que todos los campos del formulario de checkout estén completos y sean válidos
   * @returns {boolean} - true si el formulario es válido, false en caso contrario
   */
  const validateForm = () => {
    // Validar que todos los campos de dirección estén completos
    if (!direccion.direccion || !direccion.ciudad || !direccion.provincia || !direccion.codigo_postal) {
      alert('Por favor complete todos los campos de dirección');
      return false;
    }

    // Validar que todos los campos de pago estén completos
    if (!pago.numero_tarjeta || !pago.fecha_vencimiento || !pago.cvv || !pago.nombre_titular) {
      alert('Por favor complete todos los campos de pago');
      return false;
    }

    // Validar que el número de tarjeta contenga solo dígitos (permite espacios que se eliminan)
    if (!/^\d+$/.test(pago.numero_tarjeta.replace(/\s/g, ''))) {
      alert('El número de tarjeta debe contener solo números');
      return false;
    }

    // Validar que el CVV tenga 3 o 4 dígitos
    if (!/^\d{3,4}$/.test(pago.cvv)) {
      alert('El CVV debe tener 3 o 4 dígitos');
      return false;
    }

    return true; // Todas las validaciones pasaron
  };

  /**
   * Función principal para procesar el checkout (finalizar compra)
   * Valida datos, crea el pedido en el backend y maneja la respuesta
   */
  const handleCheckout = async () => {
    // Verificar que el usuario esté logueado
    if (!isLoggedIn) {
      alert('Debe iniciar sesión para realizar una compra');
      return;
    }

    // Verificar que el carrito no esté vacío
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Ejecutar validaciones del formulario
    if (!validateForm()) {
      return;
    }

    // Activar estado de carga para mostrar feedback al usuario
    setLoading(true);

    try {
      // Preparar los datos del pedido para enviar al backend
      const pedidoData = {
        id_usuario: usuario.id_usuario, // ID del usuario logueado
        total: total, // Total calculado del carrito
        direccion: direccion, // Datos de dirección de envío
        items: items.map(item => ({ // Mapear items del carrito al formato esperado por el backend
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          precio_unitario: item.precio
        }))
      };

      // Realizar llamada POST al endpoint de crear pedido
      const response = await axios.post('http://localhost:8000/pedidos/crear', pedidoData);

      // Si el pedido se creó exitosamente
      if (response.data.success) {
        alert('¡Pedido realizado con éxito!'); // Mostrar mensaje de éxito
        clearCart(); // Vaciar el carrito
        setShowCheckout(false); // Cerrar modal de checkout
        
        // Resetear formulario de dirección a valores iniciales
        setDireccion({
          direccion: '',
          ciudad: '',
          provincia: '',
          codigo_postal: '',
          pais: 'Argentina'
        });
        
        // Resetear formulario de pago a valores iniciales
        setPago({
          numero_tarjeta: '',
          fecha_vencimiento: '',
          cvv: '',
          nombre_titular: ''
        });
      }
    } catch (error) {
      // Manejar errores de la API o de red
      alert('Error al procesar el pedido: ' + (error.response?.data?.message || 'Error del servidor'));
    } finally {
      // Desactivar estado de carga independientemente del resultado
      setLoading(false);
    }
  };

  // Renderizado condicional: Si el carrito está vacío, mostrar mensaje informativo
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

  // Renderizado principal: Carrito con productos
  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      
      {/* Sección que muestra todos los items del carrito */}
      <div className="carrito-items">
        {/* Mapear cada item del carrito para crear una fila de producto */}
        {items.map(item => (
          <div key={item.id_producto} className="carrito-item">
            {/* Imagen del producto */}
            <img src={item.imagen_url} alt={item.nombre} className="item-imagen" />
            
            {/* Información básica del producto */}
            <div className="item-info">
              <h4>{item.nombre}</h4>
              <p className="item-precio">${item.precio.toLocaleString('es-CL')}</p>
            </div>
            
            {/* Control de cantidad con input numérico */}
            <div className="item-cantidad">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => handleQuantityChange(item.id_producto, e.target.value)}
              />
            </div>
            
            {/* Subtotal del item (precio × cantidad) */}
            <div className="item-subtotal">
              <p>${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
            </div>
            
            {/* Botón para eliminar el item del carrito */}
            <button 
              className="btn-remover"
              onClick={() => handleRemoveItem(item.id_producto)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Sección del total y botón de checkout */}
      <div className="carrito-total">
        <h3>Total: ${total.toLocaleString('es-CL')}</h3>
        <button 
          className="btn-checkout"
          onClick={() => setShowCheckout(true)} // Abre el modal de checkout
          disabled={!isLoggedIn} // Deshabilita si no está logueado
        >
          {isLoggedIn ? 'Proceder al Pago' : 'Inicia sesión para comprar'}
        </button>
      </div>

      {/* Modal de checkout - se muestra condicionalmente */}
      {showCheckout && (
        <div className="checkout-modal">
          <div className="checkout-content">
            <h3>Finalizar Compra</h3>
            
            {/* Sección de dirección de envío */}
            <div className="checkout-section">
              <h4>Dirección de Envío</h4>
              {/* Input para dirección */}
              <input
                type="text"
                placeholder="Dirección"
                value={direccion.direccion}
                onChange={(e) => setDireccion({...direccion, direccion: e.target.value})}
              />
              {/* Input para ciudad */}
              <input
                type="text"
                placeholder="Ciudad"
                value={direccion.ciudad}
                onChange={(e) => setDireccion({...direccion, ciudad: e.target.value})}
              />
              {/* Input para provincia */}
              <input
                type="text"
                placeholder="Provincia"
                value={direccion.provincia}
                onChange={(e) => setDireccion({...direccion, provincia: e.target.value})}
              />
              {/* Input para código postal */}
              <input
                type="text"
                placeholder="Código Postal"
                value={direccion.codigo_postal}
                onChange={(e) => setDireccion({...direccion, codigo_postal: e.target.value})}
              />
            </div>

            {/* Sección de información de pago */}
            <div className="checkout-section">
              <h4>Información de Pago</h4>
              {/* Input para número de tarjeta */}
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={pago.numero_tarjeta}
                onChange={(e) => setPago({...pago, numero_tarjeta: e.target.value})}
              />
              {/* Input para fecha de vencimiento */}
              <input
                type="text"
                placeholder="MM/AA"
                value={pago.fecha_vencimiento}
                onChange={(e) => setPago({...pago, fecha_vencimiento: e.target.value})}
              />
              {/* Input para CVV */}
              <input
                type="text"
                placeholder="CVV"
                value={pago.cvv}
                onChange={(e) => setPago({...pago, cvv: e.target.value})}
              />
              {/* Input para nombre del titular */}
              <input
                type="text"
                placeholder="Nombre del Titular"
                value={pago.nombre_titular}
                onChange={(e) => setPago({...pago, nombre_titular: e.target.value})}
              />
            </div>

            {/* Mostrar total a pagar */}
            <div className="checkout-total">
              <h4>Total a Pagar: ${total.toLocaleString('es-CL')}</h4>
            </div>

            {/* Botones de acción del checkout */}
            <div className="checkout-buttons">
              {/* Botón para cancelar y cerrar modal */}
              <button 
                className="btn-cancelar"
                onClick={() => setShowCheckout(false)}
                disabled={loading} // Deshabilita durante procesamiento
              >
                Cancelar
              </button>
              {/* Botón para procesar el pago */}
              <button 
                className="btn-pagar"
                onClick={handleCheckout} // Ejecuta la función de checkout
                disabled={loading} // Deshabilita durante procesamiento
              >
                {loading ? 'Procesando...' : 'Pagar'} {/* Texto dinámico según estado */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCarrito;
