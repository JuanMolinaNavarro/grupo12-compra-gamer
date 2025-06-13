import React from "react";
import "../../styles/Footer.css";
import { FaInstagram } from "react-icons/fa";
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
        <button id="btn-ayuda">Ayuda</button>
        <button id="btn-arrepentimiento">Botón de arrepentimiento</button>
        <button id="btn-terminos">Términos y condiciones</button>
      </div>
      <div className="footer-container__div">
        <h3>Seguinos en</h3>
        <FaInstagram />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div className="footer-container__div">
        <img
          id="great-place-to-work"
          src="https://imagenes.compragamer.com/assets/logos/gptw.svg"
          alt="great-place-to-work"
        />
        <a href="https://compragamer.hiringroom.com/jobs" target="_blank">
          Trabaja con nosotros{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
