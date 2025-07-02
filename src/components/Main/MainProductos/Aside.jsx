import React from 'react'
import NestedToggle from './NestedToggle'
import { Link } from 'react-router-dom'


const Aside = () => {
    return (
        <div>
            <NestedToggle title={"Categorías"}>
                <NestedToggle title={"Equipos y Notebooks"}>
                    <Link to={"/productos/categoria/1"}>Notebooks</Link>
                </NestedToggle>
                <NestedToggle title={"Procesadores"}>

                    <Link to={"/productos/categoria/2"} >Procesadores AMD</Link>
                    <br />
                    <Link to={"/productos/categoria/3"}>Procesadores Intel</Link>

                </NestedToggle>
                <NestedToggle title={"Mothers"}>

                    <Link to={"/productos/categoria/4"}>Mothers AMD</Link>
                    <br />
                    <Link to={"/productos/categoria/5"}>Mothers Intel</Link>

                </NestedToggle>
                <NestedToggle title={"Placas de Video"}>
                    <Link to={"/productos/categoria/6"}>
                        Placas de Video GeForce
                    </Link>
                    <br />

                    <Link to={"/productos/categoria/7"}>
                        Placas de Video Radeon AMD
                    </Link>
                </NestedToggle>
                <NestedToggle title={"Memorias RAM"}>
                    <Link to={"/productos/categoria/8"}>Memorias</Link>
                </NestedToggle>
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
                <NestedToggle title={"Refrigeracion"}>
                    <Link >Coolers Fan</Link>
                    <br />

                    <Link to={"/productos/categoria/12"}>Coolers CPU</Link>
                    <br />

                    <Link to={"/productos/categoria/13"}>Pasta Termica</Link>
                </NestedToggle>
                <NestedToggle title={"Gabinetes"}>
                    <Link to={"/productos/categoria/15"}>Gabinetes</Link>
                </NestedToggle>
                <NestedToggle title={"Fuentes"}>
                    <Link to={"/productos/categoria/16"}>Fuentes de Alimentación</Link>
                </NestedToggle>
                <NestedToggle title={"Monitores"}>
                    <Link to={"/productos/categoria/17"}>Monitores y Pantallas</Link>
                </NestedToggle>
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