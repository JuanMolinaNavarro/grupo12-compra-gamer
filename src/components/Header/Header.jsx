import React from 'react'
import cgLogo from '../../../public/compra-gamer.svg'
import '../../styles/Header.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";


const Header = () => {
    return (
        <header>
            <img src={cgLogo} className="logo" alt="compra gamer logo" />
            <input type="text" placeholder='Buscar productos' />
            <button className='busquedaHeader'>
                <FaRegUser color='#f0320a' /> Ingresá
            </button>
            <button>
                <MdOutlineShoppingCart color='#f0320a' />
            </button>
        </header>
    )
}

export default Header