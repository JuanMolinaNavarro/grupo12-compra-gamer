import React, { useEffect, useState } from 'react'
import Aside from './MainProductos/Aside'
import NestedToggle from './MainProductos/NestedToggle'
import Cards from './Cards';
//import productos from '../../data/productos.json'
import NavBar from './NavBar'
import '../../styles/MainProductos.css'
import axios from 'axios'
import useProductStore from '../../stores/productStore'


const MainProductos = () => {
    
    // Usar el store de productos en lugar del estado local
    const { productos, loading, error, isSearching, searchQuery, getAllProducts } = useProductStore();

    useEffect(() => {
        // Si no hay productos o no estamos en modo búsqueda, cargar todos los productos
        if (productos.length === 0 && !isSearching) {
            getAllProducts();
        }
    }, [productos.length, isSearching, getAllProducts]);
    

    return (
        <div>
            <NavBar></NavBar>
            <div className='containerDestacados'>
                <h4 style={{ fontWeight: '600' }}>
                    {isSearching ? `Resultados de búsqueda: "${searchQuery}"` : 'Destacados'}
                </h4>
                <hr style={{ borderColor: 'black' }}/>
                {isSearching && productos.length === 0 && !loading && (
                    <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        No se encontraron productos que coincidan con tu búsqueda.
                    </p>
                )}
            </div>
            <div className='containerMain'>
                <Aside className="aside"></Aside>
                <div className='cardContainer'>
                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>Cargando productos...</p>
                    ) : error ? (
                        <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</p>
                    ) : (
                        productos.map(producto => (
                            <Cards key={producto.id_producto} producto={producto}></Cards>
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}

export default MainProductos