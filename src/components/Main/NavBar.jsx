import React from 'react'
import "../../styles/NavBar.css"
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='navContainer'>
            <nav>
                <Link to="/productos">Productos</Link>
                <Link to="/notebooks">Notebooks</Link>
                <Link to="/armarpc">Armá tu PC</Link>
                <Link to="/ayuda">Ayuda</Link>
            </nav>
        </div>
    )
}

export default NavBar