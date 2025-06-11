import React from 'react'
import cgLogo from '../../../public/compra-gamer.svg'
import '../../styles/Header.css'

const Header = () => {
    return (
        <header>
            <img src={cgLogo} className="logo" alt="compra gamer logo" />
            <button></button>
            <button></button>
        </header>
    )
}

export default Header