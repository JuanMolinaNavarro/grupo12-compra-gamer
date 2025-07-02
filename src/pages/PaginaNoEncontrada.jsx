import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaHome, FaSearch } from "react-icons/fa";
import "../styles/ErrorPages.css";

const PaginaNoEncontrada = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <FaQuestionCircle size={80} color="#f39c12" />
        </div>

        <h1 className="error-title">Página No Encontrada</h1>
        <p className="error-subtitle">404 - Not Found</p>

        <div className="error-message">
          <p>¡Oops! La página que estás buscando no existe.</p>
          <p>
            Es posible que haya sido movida, eliminada o que hayas introducido
            una URL incorrecta.
          </p>
        </div>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <FaHome style={{ marginRight: "8px" }} />
            Ir al Inicio
          </Link>

          <Link to="/productos" className="btn btn-secondary">
            <FaSearch style={{ marginRight: "8px" }} />
            Ver Productos
          </Link>
        </div>

        <div className="error-help">
          <p>¿Necesitas ayuda?</p>
          <Link to="/ayuda">Visita nuestra sección de ayuda</Link>
        </div>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;
