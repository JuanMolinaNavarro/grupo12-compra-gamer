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

/**
 * MainHome - Componente principal de la página de inicio
 * 
 * Este componente organiza y renderiza todas las secciones de la página principal
 * del e-commerce. Maneja la carga inicial de productos desde el backend y los
 * distribuye a los diferentes componentes que los necesitan.
 * 
 * Estructura de la página:
 * 1. NavBar - Navegación principal
 * 2. Carrusel - Banner promocional rotativo
 * 3. Destacados - Productos destacados
 * 4. Armatupc - CTA para armado de PC
 * 5. Recuadro - Información de servicios (envíos, garantía, cuotas)
 * 6. Nuestrascategorias - Grid de categorías principales
 * 7. Mejoresmarcas - Productos filtrados por marca
 */
const MainHome = () => {
    // Estado para almacenar todos los productos cargados desde el backend
    const [data, setData] = useState([]);
    
    /**
     * Efecto para cargar productos al montar el componente
     * Realiza una petición GET al endpoint de productos y actualiza el estado
     */
    useEffect(() => {
        axios.get(`http://localhost:8000/productos`)
            .then(response => {
                // Actualiza el estado con los productos recibidos
                setData(response.data);
            })
            .catch(error => {
                console.error("Error al obtener datos", error);
            });
    }, []);
    
    return (
        <div className="mainhome container d-flex flex-column align-items-center">
            {/* Barra de navegación con categorías principales */}
            <NavBar />
            
            {/* Carrusel de imágenes promocionales */}
            <Carrusel />
            
            {/* Sección de productos destacados - recibe data como prop */}
            <Destacados data={data} />
            
            {/* Call-to-Action para armado de PC personalizada */}
            <Armatupc />
            
            {/* Información de servicios (envíos, garantía, cuotas) */}
            <Recuadro />
            
            {/* Grid de categorías principales con imágenes */}
            <Nuestrascategorias />
            
            {/* Productos filtrados por marcas destacadas - recibe data como prop */}
            <Mejoresmarcas data={data} />
        </div>
    );
};

export default MainHome;
