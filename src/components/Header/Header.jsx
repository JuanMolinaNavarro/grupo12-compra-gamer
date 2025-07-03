// Importaciones necesarias para el componente Header
import React, { useState, useEffect } from "react";
import cgLogo from "../../assets/compra-gamer.svg"; // Logo de la empresa
import "../../styles/Header.css"; // Estilos específicos del header
import { MdOutlineShoppingCart } from "react-icons/md"; // Icono del carrito
import { FaRegUser } from "react-icons/fa6"; // Icono de usuario
import { IoIosSearch } from "react-icons/io"; // Icono de búsqueda
import { Link, useNavigate } from "react-router-dom"; // Navegación de React Router
import AuthModal from "../Auth/AuthModal"; // Modal de autenticación
import useAuthStore from "../../stores/authStore"; // Store de autenticación
import useCartStore from "../../stores/cartStore"; // Store del carrito
import useProductStore from "../../stores/productStore"; // Store de productos
import "../../styles/AuthModal.css"; // Estilos del modal de autenticación

/**
 * Componente Header principal de la aplicación
 * Contiene: logo, barra de búsqueda, botones de usuario/admin, carrito
 * Maneja la navegación principal y la funcionalidad de búsqueda
 */
const Header = () => {
  // ============ ESTADO LOCAL ============
  
  // Estado para controlar la visibilidad del modal de login
  const [showLogin, setShowLogin] = useState(false);
  
  // Estado local para el input de búsqueda (separado del store para mejor UX)
  const [searchInput, setSearchInput] = useState("");

  // Hook de navegación para redireccionar programáticamente
  const navigate = useNavigate();

  // ============ ESTADO GLOBAL (STORES) ============
  
  // Destructuring del store de autenticación
  const { usuario, isLoggedIn, logout } = useAuthStore();

  // Destructuring del store del carrito
  const { getTotalItems, initializeTotal } = useCartStore();
  const totalItems = getTotalItems(); // Obtener cantidad total de items

  // Destructuring del store de productos para la búsqueda
  const { searchProducts, clearSearch, searchQuery } = useProductStore();

  // ============ EFECTOS ============
  
  /**
   * Hook useEffect que se ejecuta al montar el componente
   * Inicializa el total del carrito y sincroniza el input de búsqueda
   */
  useEffect(() => {
    initializeTotal(); // Calcular total inicial del carrito
    // Sincronizar el input con el estado de búsqueda del store
    setSearchInput(searchQuery);
  }, [initializeTotal, searchQuery]);

  // ============ FUNCIONES DE MANEJO ============
  
  /**
   * Función para mostrar el modal de login
   */
  const onLoginClick = () => setShowLogin(true);
  
  /**
   * Función para cerrar el modal de login
   */
  const handleClose = () => setShowLogin(false);

  /**
   * Función para manejar el logout del usuario
   * Llama a la función logout del store de autenticación
   */
  const handleLogout = async () => {
    await logout();
  };

  /**
   * Función para manejar la búsqueda de productos
   * Ejecuta la búsqueda y navega a la página de productos
   * @param {Event} e - Evento del formulario o click
   */
  const handleSearch = (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    
    // Solo buscar si hay texto en el input
    if (searchInput.trim()) {
      searchProducts(searchInput.trim()); // Ejecutar búsqueda en el store
      navigate('/productos'); // Navegar a la página de productos
    }
  };

  /**
   * Función para manejar cambios en el input de búsqueda
   * Si el usuario borra todo el texto, limpia la búsqueda automáticamente
   * @param {Event} e - Evento de cambio del input
   */
  const handleInputChange = (e) => {
    setSearchInput(e.target.value); // Actualizar estado local del input
    
    // Si el usuario borra todo el texto, limpiar la búsqueda
    if (e.target.value === '') {
      clearSearch(); // Volver al catálogo completo
    }
  };

  /**
   * Función para manejar la tecla Enter en el input de búsqueda
   * Permite buscar presionando Enter además del botón de búsqueda
   * @param {Event} e - Evento de tecla presionada
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e); // Ejecutar búsqueda al presionar Enter
    }
  };

  /**
   * Función para limpiar completamente la búsqueda
   * Limpia el input y vuelve al catálogo completo
   */
  const handleClearSearch = () => {
    setSearchInput(''); // Limpiar input local
    clearSearch(); // Limpiar búsqueda en el store
  };
  
  // ============ RENDERIZADO ============
  
  return (
    <header>
      {/* Logo principal que navega al home y limpia búsquedas */}
      <Link to="/" onClick={handleClearSearch}>
        <img src={cgLogo} className="logo" alt="compra gamer logo" />
      </Link>
      
      {/* Barra de búsqueda con input y botón */}
      <div className="searchBar">
        <input
          id="searchInput"
          type="text"
          required
          placeholder="Buscar productos"
          value={searchInput} // Valor controlado por estado local
          onChange={handleInputChange} // Maneja cambios en tiempo real
          onKeyPress={handleKeyPress} // Permite buscar con Enter
        />
        {/* Icono de búsqueda que funciona como botón */}
        <IoIosSearch 
          className="searchIcon" 
          color="f0320a" 
          onClick={handleSearch} // Ejecuta búsqueda al hacer click
          style={{ cursor: 'pointer' }} // Indicar que es clickeable
        />
      </div>
      
      {/* Container de botones de usuario y carrito */}
      <div id="buttonContainer">
        {/* Renderizado condicional basado en estado de autenticación */}
        {isLoggedIn ? (
          // Usuario logueado: mostrar saludo y botón de logout
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#f0320a", fontSize: "14px" }}>
              Hola, {usuario?.nombre} {/* Saludo personalizado con nombre del usuario */}
            </span>
            <button onClick={handleLogout}>
              <FaRegUser color="#f0320a" /> Cerrar Sesión
            </button>
          </div>
        ) : (
          // Usuario no logueado: mostrar botón de login
          <button onClick={onLoginClick}>
            <FaRegUser color="#f0320a" /> Ingresá
          </button>
        )}

        {/* Botón de Admin - solo visible para usuarios administradores */}
        {isLoggedIn && usuario?.is_adm && (
          <Link to="/admin">
            <button
              style={{
                backgroundColor: "#28a745", // Verde para distinguir del resto
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              Admin
            </button>
          </Link>
        )}

        {/* Botón del carrito con contador de items */}
        <Link to="/carrito">
          <button style={{ position: "relative" }}>
            <MdOutlineShoppingCart color="#f0320a" />
            
            {/* Badge con cantidad de items - solo visible si hay items */}
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#f0320a",
                  color: "white",
                  borderRadius: "50%", // Forma circular
                  padding: "2px 6px",
                  fontSize: "12px",
                  minWidth: "18px",
                  textAlign: "center",
                }}
              >
                {totalItems} {/* Número de items en el carrito */}
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* Modal de autenticación que se muestra condicionalmente */}
      <AuthModal show={showLogin} handleClose={handleClose} />
    </header>
  );
};

// Exportar el componente para uso en otras partes de la aplicación
export default Header;
