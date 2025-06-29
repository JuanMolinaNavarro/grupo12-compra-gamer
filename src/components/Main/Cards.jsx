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
    addToCart(producto)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div  className="card-producto" to="">
      <img as={Link} src={producto.imagen_url} alt={producto.nombre} className="producto-imagen" />
      <p className="producto-nombre">{producto.nombre}</p>
      <Link to={`/productos/mostrar/${producto.id_producto}`}  >Ver producto</Link>
      <div className="producto-precio-contenedor">
        <span className="producto-precio">${producto.precio.toLocaleString('es-CL')}</span>
        <button 
          className={`producto-boton ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          title="Agregar al carrito"
        >
          <MdOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Cards;
