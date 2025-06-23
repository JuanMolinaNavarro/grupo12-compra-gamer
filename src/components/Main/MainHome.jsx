import NavBar from './NavBar'
import Carrusel from './MainHome/Carrusel'
import Recuadro from './MainHome/Recuadro'
import Destacados from './MainHome/Destacados'
import Armatupc from './MainHome/Armatupc'
import "../../styles/MainHome.css"
import Nuestrascategorias from './MainHome/Nuestrascategorias'
import Mejoresmarcas from './MainHome/Mejoresmarcas'
import Footer from '../Footer/Footer'

const MainHome = () => {
  return (
    <div>
        <NavBar></NavBar>
        <Carrusel></Carrusel>
        <Destacados></Destacados>
        <Armatupc></Armatupc>
        <Recuadro></Recuadro>
        <Nuestrascategorias></Nuestrascategorias>
        <Mejoresmarcas></Mejoresmarcas>
        <Footer></Footer>
     </div>
  )
}

export default MainHome;
