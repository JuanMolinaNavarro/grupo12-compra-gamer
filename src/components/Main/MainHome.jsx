import NavBar from './NavBar'
import Carrusel from './MainHome/Carrusel'
import Recuadro from './MainHome/Recuadro'
import Destacados from './MainHome/Destacados'
import Armatupc from './MainHome/Armatupc'
import "../../styles/MainHome.css"

const MainHome = () => {
  return (
    <div>
        <NavBar></NavBar>
        <Carrusel></Carrusel>
        <Destacados></Destacados>
        <Armatupc></Armatupc>
        <h3 className='text-start'>Explora nuestras <strong>categorias</strong> </h3>
        <Recuadro></Recuadro>
     </div>
  )
}

export default MainHome