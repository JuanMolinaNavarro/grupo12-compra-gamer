<<<<<<< HEAD
import NavBar from './NavBar'
import Carrusel from './MainHome/Carrusel'
import Recuadro from './MainHome/Recuadro'
import Destacados from './MainHome/Destacados'
import Armatupc from './MainHome/Armatupc'
import "../../styles/MainHome.css"
import Nuestrascategorias from './MainHome/Nuestrascategorias'
import Mejoresmarcas from './MainHome/Mejoresmarcas'
=======
import React from "react";
import NavBar from "./NavBar";
import Carrusel from "./MainHome/Carrusel";
import Recuadro from "./MainHome/Recuadro";
import Footer from "../Footer/Footer";
import "../../styles/MainHome.css";
>>>>>>> dev

const MainHome = () => {
  return (
    <div>
<<<<<<< HEAD
        <NavBar></NavBar>
        <Carrusel></Carrusel>
        <Destacados></Destacados>
        <Armatupc></Armatupc>
        <Recuadro></Recuadro>
        <Nuestrascategorias></Nuestrascategorias>
        <Mejoresmarcas></Mejoresmarcas>
        
     </div>
  )
}
=======
      <NavBar></NavBar>
      <Carrusel></Carrusel>
      <h3 className="text-start">
        Conoce nuestros <strong>productos destacados</strong>{" "}
      </h3>
      <h3 className="text-start">
        Explora nuestras <strong>categorias</strong>{" "}
      </h3>
      <Recuadro></Recuadro>
      <Footer />
    </div>
  );
};
>>>>>>> dev

export default MainHome;
