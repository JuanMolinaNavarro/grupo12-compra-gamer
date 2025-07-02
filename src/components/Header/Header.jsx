import React, { useState, useEffect } from "react";
import cgLogo from "../../assets/compra-gamer.svg";
import "../../styles/Header.css";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
import useAuthStore from "../../stores/authStore";
import useCartStore from "../../stores/cartStore";
import useProductStore from "../../stores/productStore";
import "../../styles/AuthModal.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  // Estados del store de autenticación
  const { usuario, isLoggedIn, logout } = useAuthStore();

  // Estado del carrito
  const { getTotalItems, initializeTotal } = useCartStore();
  const totalItems = getTotalItems();

  // Estado de productos para la búsqueda
  const { searchProducts, clearSearch, searchQuery } = useProductStore();

  useEffect(() => {
    initializeTotal();
    // Sincronizar el input con el estado de búsqueda del store
    setSearchInput(searchQuery);
  }, [initializeTotal, searchQuery]);

  const onLoginClick = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchProducts(searchInput.trim());
      navigate('/productos');
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    // Si el usuario borra todo el texto, limpiar la búsqueda
    if (e.target.value === '') {
      clearSearch();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    clearSearch();
  };
  return (
    <header>
      <Link to="/" onClick={handleClearSearch}>
        <img src={cgLogo} className="logo" alt="compra gamer logo" />
      </Link>
      <div className="searchBar">
        <input
          id="searchInput"
          type="text"
          required
          placeholder="Buscar productos"
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IoIosSearch 
          className="searchIcon" 
          color="f0320a" 
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div id="buttonContainer">
        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#f0320a", fontSize: "14px" }}>
              Hola, {usuario?.nombre}
            </span>
            <button onClick={handleLogout}>
              <FaRegUser color="#f0320a" /> Cerrar Sesión
            </button>
          </div>
        ) : (
          <button onClick={onLoginClick}>
            <FaRegUser color="#f0320a" /> Ingresá
          </button>
        )}

        {/* Mostrar botón Admin solo si el usuario está logueado y es administrador */}
        {isLoggedIn && usuario?.is_adm && (
          <Link to="/admin">
            <button
              style={{
                backgroundColor: "#28a745",
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

        <Link to="/carrito">
          <button style={{ position: "relative" }}>
            <MdOutlineShoppingCart color="#f0320a" />
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#f0320a",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  minWidth: "18px",
                  textAlign: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>

      <AuthModal show={showLogin} handleClose={handleClose} />
    </header>
  );
};

export default Header;
