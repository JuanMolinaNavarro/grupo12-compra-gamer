import React from 'react'
import "../../styles/NavBar.css"
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='navContainer'>
            <nav>
                <Link to="/productos">Productos</Link>
                <Link to="/productos/categoria/1">Notebooks</Link>
                <Link to="/ayuda">Ayuda</Link>
            </nav>
        </div>
    )
}

export default NavBar