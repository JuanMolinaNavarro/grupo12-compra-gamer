import React from 'react'
import NavBar from './NavBar'
import Carrusel from './MainHome/Carrusel'
import Recuadro from './MainHome/Recuadro'
import "../../styles/MainHome.css"

const MainHome = () => {
  return (
    <div>
        <NavBar></NavBar>
        <Carrusel></Carrusel>
        <h3 className='text-start'>Conoce nuestros  <strong>productos destacados</strong> </h3>
        <h3 className='text-start'>Explora nuestras <strong>categorias</strong> </h3>
        <Recuadro></Recuadro>

    </div>
  )
}

export default MainHome