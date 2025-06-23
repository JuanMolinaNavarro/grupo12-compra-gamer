import NavBar from './NavBar'
import Carrusel from './MainHome/Carrusel'
import Recuadro from './MainHome/Recuadro'
import Destacados from './MainHome/Destacados'
import Armatupc from './MainHome/Armatupc'
import "../../styles/MainHome.css"
import Nuestrascategorias from './MainHome/Nuestrascategorias'

const MainHome = () => {
  return (
    <div>
        <NavBar></NavBar>
        <Carrusel></Carrusel>
        <Destacados></Destacados>
        <Armatupc></Armatupc>
        <Recuadro></Recuadro>
        <Nuestrascategorias></Nuestrascategorias>
        
     </div>
  )
}

export default MainHome