import React, { useState } from "react";
import cgLogo from "../../assets/compra-gamer.svg";
import "../../styles/Header.css";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
import useAuthStore from "../../stores/authStore";
import "../../styles/AuthModal.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  // Estados del store de autenticación
  const { usuario, isLoggedIn, logout } = useAuthStore();

  const onLoginClick = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);
  
  const handleLogout = async () => {
    await logout();
  };
  return (
    <header>
      <Link to="/">
        <img src={cgLogo} className="logo" alt="compra gamer logo" />
      </Link>
      <div className="searchBar">
        <input
          id="searchInput"
          type="text"
          required
          placeholder="Buscar productos"
        />
        <IoIosSearch className="searchIcon" color="f0320a" />
      </div>
      <div id="buttonContainer">
        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#f0320a', fontSize: '14px' }}>
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
        <Link to='/carrito'>
          <button>
            <MdOutlineShoppingCart color="#f0320a" />
          </button>
        </Link>
      </div>

      <AuthModal show={showLogin} handleClose={handleClose} />
    </header>
  );
};

export default Header;
