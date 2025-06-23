<<<<<<< HEAD
import cgLogo from '../../../public/compra-gamer.svg'
import '../../styles/Header.css'
=======
import React, { useState } from "react";
import cgLogo from "../../assets/compra-gamer.svg";
import "../../styles/Header.css";
>>>>>>> dev
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
import "../../styles/AuthModal.css";
const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const onLoginClick = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);
  confirm;
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
        <button onClick={onLoginClick}>
          <FaRegUser color="#f0320a" /> Ingresá
        </button>
        <button>
          <MdOutlineShoppingCart color="#f0320a" />
        </button>
        \
      </div>

      <AuthModal show={showLogin} handleClose={handleClose} />
    </header>
  );
};

export default Header;
