// src/components/CardProducto.jsx
import React, { useState } from 'react';
import '../../styles/Cards.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import useCartStore from '../../stores/cartStore';
import { Link } from 'react-router-dom';
const Cards = ({ producto }) => {
  const addToCart = useCartStore(state => state.addToCart)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (producto.stock > 0) {
      addToCart(producto)
      setAdded(true)
      setTimeout(() => setAdded(false), 1000)
    }
  }

  return (
    <div  className="card-producto" to="">
      <img as={Link} src={producto.imagen_url} alt={producto.nombre} className="producto-imagen" />
      <p className="producto-nombre">{producto.nombre}</p>
      <Link to={`/productos/mostrar/${producto.id_producto}`}>Ver producto</Link>
      {(!producto.stock || producto.stock <= 0) && (
        <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>Sin stock</p>
      )}
      <div className="producto-precio-contenedor">
        <span className="producto-precio">${producto.precio.toLocaleString('es-CL')}</span>
        <button 
          className={`producto-boton ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={!producto.stock || producto.stock <= 0}
          title={producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
          style={{
            opacity: (!producto.stock || producto.stock <= 0) ? 0.5 : 1,
            cursor: (!producto.stock || producto.stock <= 0) ? 'not-allowed' : 'pointer'
          }}
        >
          <MdOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Cards;
