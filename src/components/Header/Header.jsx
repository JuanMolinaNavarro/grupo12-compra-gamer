import React from 'react'
import cgLogo from '../../../public/compra-gamer.svg'
import '../../styles/Header.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header>    
            <Link to="/">
                <img src={cgLogo} className="logo" alt="compra gamer logo" />
            </Link>
            <div className='searchBar'>
                <input id="searchInput" type="text" required placeholder='Buscar productos' />
                <IoIosSearch className='searchIcon' color='f0320a' />
            </div>
            <div id='buttonContainer'>
                <button>
                    <FaRegUser color='#f0320a' /> Ingresá
                </button>
                <button>
                    <MdOutlineShoppingCart color='#f0320a' />
                </button>

            </div>
        </header>
    )
}

export default Header