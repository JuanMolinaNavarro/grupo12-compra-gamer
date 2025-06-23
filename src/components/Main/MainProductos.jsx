import React from 'react'
import Aside from './MainProductos/Aside'
import NestedToggle from './MainProductos/NestedToggle'
import Cards from './Cards';
import productos from '../../data/productos.json'
import NavBar from './NavBar'
import '../../styles/MainProductos.css'


const MainProductos = () => {

    return (
        <div>
            <NavBar></NavBar>
            <div className='containerDestacados'>
                <h4 style={{ fontWeight: '600' }}>Destacados</h4>
                <hr style={{ borderColor: 'black' }}/>
            </div>
            <div className='containerMain'>
                <Aside className="aside"></Aside>
                <div className='cardContainer'>
                    {productos.map(producto => (
                        <Cards key={producto.id} producto={producto}></Cards>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MainProductos