import NavBar from './NavBar'
import Carrusel from './MainHome/Carrusel'
import Recuadro from './MainHome/Recuadro'
import Destacados from './MainHome/Destacados'
import Armatupc from './MainHome/Armatupc'
import "../../styles/MainHome.css"
import Nuestrascategorias from './MainHome/Nuestrascategorias'
import Mejoresmarcas from './MainHome/Mejoresmarcas'
import Footer from '../Footer/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios'


const MainHome = () => {
      const [data,SetData] = useState([])
    useEffect(() => {
      axios.get(`http://localhost:8000/productos`)
        .then(response => {
            SetData(response.data)
        })
        .catch(error =>{
            console.error("Error al obtener datos", error)
        })
    }, [])
    
  return (
    <div className="mainhome container d-flex flex-column align-items-center">
        <NavBar></NavBar>
        <Carrusel></Carrusel>
        <Destacados data={data}></Destacados>
        <Armatupc></Armatupc>
        <Recuadro></Recuadro>
        <Nuestrascategorias></Nuestrascategorias>
        <Mejoresmarcas data={data}></Mejoresmarcas>
     </div>
  )
}

export default MainHome;
