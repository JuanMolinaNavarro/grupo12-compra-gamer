import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaHome, FaSignInAlt } from "react-icons/fa";
import "../styles/ErrorPages.css";

const AccesoDenegado = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <FaLock size={80} color="#ff6b6b" />
        </div>

        <h1 className="error-title">Acceso Denegado</h1>
        <p className="error-subtitle">403 - Forbidden</p>

        <div className="error-message">
          <p>No tienes permisos para acceder a esta sección.</p>
          <p>
            Solo los administradores pueden acceder al panel de administración.
          </p>
        </div>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <FaHome style={{ marginRight: "8px" }} />
            Volver al Inicio
          </Link>

          <button
            className="btn btn-secondary"
            onClick={() => window.location.reload()}
          >
            <FaSignInAlt style={{ marginRight: "8px" }} />
            Iniciar Sesión como Admin
          </button>
        </div>

        <div className="error-help">
          <p>¿Crees que esto es un error?</p>
          <a href="mailto:soporte@compragamer.com">
            Contacta al soporte técnico
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccesoDenegado;
