import React from 'react'
import NestedToggle from './NestedToggle'
import { Link } from 'react-router-dom'

/**
 * Aside - Componente de navegación lateral para filtros y categorías
 * 
 * Este componente muestra una barra lateral con categorías organizadas
 * jerárquicamente usando el componente NestedToggle. Permite a los usuarios
 * navegar por diferentes categorías de productos de manera intuitiva.
 * 
 * Se utiliza principalmente en las páginas de productos para proporcionar
 * una navegación rápida y organizada por categorías.
 */
const Aside = () => {
    return (
        <div>
            {/* Categoría raíz que contiene todas las subcategorías */}
            <NestedToggle title={"Categorías"}>
                
                {/* Equipos y Notebooks */}
                <NestedToggle title={"Equipos y Notebooks"}>
                    <Link to={"/productos/categoria/1"}>Notebooks</Link>
                </NestedToggle>
                
                {/* Procesadores - Separados por marca/arquitectura */}
                <NestedToggle title={"Procesadores"}>
                    <Link to={"/productos/categoria/2"} >Procesadores AMD</Link>
                    <br />
                    <Link to={"/productos/categoria/3"}>Procesadores Intel</Link>
                </NestedToggle>
                
                {/* Motherboards - Separados por compatibilidad */}
                <NestedToggle title={"Mothers"}>
                    <Link to={"/productos/categoria/4"}>Mothers AMD</Link>
                    <br />
                    <Link to={"/productos/categoria/5"}>Mothers Intel</Link>
                </NestedToggle>
                
                {/* Placas de Video - Separadas por fabricante */}
                <NestedToggle title={"Placas de Video"}>
                    <Link to={"/productos/categoria/6"}>
                        Placas de Video GeForce
                    </Link>
                    <br />
                    <Link to={"/productos/categoria/7"}>
                        Placas de Video Radeon AMD
                    </Link>
                </NestedToggle>
                
                {/* Memorias RAM */}
                <NestedToggle title={"Memorias RAM"}>
                    <Link to={"/productos/categoria/8"}>Memorias</Link>
                </NestedToggle>
                
                {/* Almacenamiento - Diferentes tipos de dispositivos */}
                <NestedToggle title={"Almacenamiento"}>
                    <Link to={"/productos/categoria/9"}> 
                        Discos Externos
                    </Link>
                    <br />
                    <Link to={"/productos/categoria/10"}>
                        Discos Rigidos
                    </Link>
                    <br />
                    <Link to={"/productos/categoria/11"}>
                        Discos Solidos SSD
                    </Link>
                </NestedToggle>
                
                {/* Refrigeración - Componentes de cooling */}
                <NestedToggle title={"Refrigeracion"}>
                    <Link >Coolers Fan</Link>
                    <br />
                    <Link to={"/productos/categoria/12"}>Coolers CPU</Link>
                    <br />
                    <Link to={"/productos/categoria/13"}>Pasta Termica</Link>
                </NestedToggle>
                
                {/* Gabinetes */}
                <NestedToggle title={"Gabinetes"}>
                    <Link to={"/productos/categoria/15"}>Gabinetes</Link>
                </NestedToggle>
                
                {/* Fuentes de Alimentación */}
                <NestedToggle title={"Fuentes"}>
                    <Link to={"/productos/categoria/16"}>Fuentes de Alimentación</Link>
                </NestedToggle>
                
                {/* Monitores */}
                <NestedToggle title={"Monitores"}>
                    <Link to={"/productos/categoria/17"}>Monitores y Pantallas</Link>
                </NestedToggle>
                
                {/* Periféricos - Accesorios y dispositivos de entrada */}
                <NestedToggle title={"Perifericos"}>
                    <Link to={"/productos/categoria/18"}>Auriculares</Link>
                    <br />
                    <Link to={"/productos/categoria/19"}>Teclados</Link>
                    <br />
                    <Link to={"/productos/categoria/20"}>Mouses</Link>
                    <br />
                    <Link to={"/productos/categoria/21"}>Joysticks</Link>
                    <br />
                    <Link to={"/productos/categoria/22"}>Mouse Pads</Link>
                </NestedToggle>
            </NestedToggle>
        </div>
    )
}

export default Aside