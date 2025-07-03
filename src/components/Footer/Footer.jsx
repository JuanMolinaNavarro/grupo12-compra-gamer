import React from "react";
import "../../styles/Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * Footer - Componente de pie de página del sitio web
 *
 * Este componente contiene información institucional, enlaces legales,
 * redes sociales y certificaciones oficiales. Está diseñado para ser
 * consistente en todas las páginas del sitio.
 *
 * Incluye:
 * - Información fiscal (AFIP)
 * - Enlaces de ayuda y políticas
 * - Redes sociales de la empresa
 * - Certificaciones laborales
 * - Enlaces a términos legales
 */
const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Imagen de datos fiscales requerida por AFIP */}
      <div>
        <img
          id="data-fiscal"
          src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg"
          alt="data-fiscal"
        />
      </div>

      {/* Sección de enlaces de ayuda y políticas */}
      <div className="footer-container__div">
        <Link to="/ayuda">
          <button id="btn-ayuda">Ayuda</button>
        </Link>
        <button id="btn-arrepentimiento">Botón de arrepentimiento</button>
        <button id="btn-terminos">Términos y condiciones</button>
      </div>

      {/* Sección de redes sociales */}
      <div className="footer-container__div">
        <h3>Seguinos en</h3>

        {/* Primera fila de redes sociales */}
        <div className="flex-redes">
          <a href="https://x.com/CompraGamerOK" target="_blank">
            <button>
              <FaXTwitter className="icon-redes" />
            </button>
          </a>
          <a
            href="https://www.instagram.com/compragamer_oficial/"
            target="_blank"
          >
            <button>
              <FaInstagram className="icon-redes" />
            </button>
          </a>
          <a href="https://www.facebook.com/compragamer" target="_blank">
            <button>
              <FaFacebookF className="icon-redes" />
            </button>
          </a>
          <a href="https://www.youtube.com/c/CompraGamer" target="_blank">
            <button>
              <FaYoutube className="icon-redes" />
            </button>
          </a>
          <a
            href="https://www.linkedin.com/company/newton-station-srl/mycompany/"
            target="_blank"
          >
            <button>
              <FaLinkedinIn className="icon-redes" />
            </button>
          </a>
        </div>

        {/* Segunda fila de redes sociales */}
        <div className="flex-redes">
          <a
            href="https://www.tiktok.com/@compragamer.com?lang=es"
            target="_blank"
          >
            <button>
              <FaTiktok className="icon-redes" />
            </button>
          </a>
          <a href="https://www.twitch.tv/compragamerok" target="_blank">
            <button>
              <FaTwitch className="icon-redes" />
            </button>
          </a>
        </div>
      </div>

      {/* Sección de certificaciones y reconocimientos */}
      <div className="footer-container__div">
        {/* Certificación Great Place to Work */}
        <img
          id="great-place-to-work"
          src="https://imagenes.compragamer.com/assets/logos/gptw.svg"
          alt="great-place-to-work"
        />

        {/* Enlace a certificación laboral externa */}
        <a
          href="https://www.greatplacetowork.com.ar/lista-las-mejores/medianas-empresas/las-mejores-empresas-para-trabajar-en-argentina-2023"
          target="_blank"
        >
          <img
            id="mejores-empresas"
            src="https://imagenes.compragamer.com/assets/logos/mejores-empresas-2023.svg"
            alt="mejores-empresas-para-trabajar"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
