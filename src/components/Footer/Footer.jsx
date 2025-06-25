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
const Footer = () => {
  return (
    <footer className="footer-container">
      <div>
        <img
          id="data-fiscal"
          src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg"
          alt="data-fiscal"
        />
      </div>
      <div className="footer-container__div">
        <Link to="/ayuda">
          <button id="btn-ayuda">Ayuda</button>
        </Link>
        <button id="btn-arrepentimiento">Botón de arrepentimiento</button>
        <button id="btn-terminos">Términos y condiciones</button>
      </div>
      <div className="footer-container__div">
        <h3>Seguinos en</h3>
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
      <div className="footer-container__div">
        <img
          id="great-place-to-work"
          src="https://imagenes.compragamer.com/assets/logos/gptw.svg"
          alt="great-place-to-work"
        />
        <a
          href="https://compragamer.hiringroom.com/jobs"
          target="_blank"
          style={{
            color: "white",
            decoration: "bold",
          }}
        >
          ¡Trabajá con nosotros!
        </a>
      </div>
    </footer>
  );
};

export default Footer;
