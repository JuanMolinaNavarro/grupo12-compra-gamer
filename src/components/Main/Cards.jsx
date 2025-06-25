// src/components/CardProducto.jsx
import React from 'react';
import '../../styles/Cards.css';
import { MdOutlineShoppingCart } from "react-icons/md";

const Cards = ({ producto }) => {
  return (
    <div className="card-producto">
      <img src={producto.imagen_url} alt={producto.nombre} className="producto-imagen" />
      <p className="producto-nombre">{producto.nombre}</p>
      <div className="producto-precio-contenedor">
        <span className="producto-precio">${producto.precio.toLocaleString('es-CL')}</span>
        <button className="producto-boton">
          <MdOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Cards;
