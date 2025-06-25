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

                    <Link>Procesadores AMD</Link>
                    <br />
                    <Link>Procesadores Intel</Link>

                </NestedToggle>
                <NestedToggle title={"Mothers"}>

                    <Link>Mothers AMD</Link>
                    <br />
                    <Link>Mothers Intel</Link>

                </NestedToggle>
                <NestedToggle title={"Placas de Video"}>
                    <Link>
                        Placas de Video GeForce
                    </Link>
                    <br />

                    <Link>
                        Placas de Video Radeon AMD
                    </Link>
                </NestedToggle>
                <NestedToggle title={"Memorias RAM"}>
                    <Link>Memorias</Link>
                </NestedToggle>
                <NestedToggle title={"Almacenamiento"}>
                    <Link>
                        Discos Externos
                    </Link>
                    <br />

                    <Link>
                        Discos Rigidos
                    </Link>
                    <br />

                    <Link>
                        Discos Solidos SSD
                    </Link>
                </NestedToggle>
                <NestedToggle title={"Refrigeracion"}>
                    <Link>Coolers Fan</Link>
                    <br />

                    <Link>Coolers CPU</Link>
                    <br />

                    <Link>Pasta Termica</Link>
                </NestedToggle>
                <NestedToggle title={"Gabinetes"}>
                    <Link>Gabinetes</Link>
                </NestedToggle>
                <NestedToggle title={"Fuentes"}>
                    <Link>Fuentes de Alimentación</Link>
                </NestedToggle>
                <NestedToggle title={"Monitores"}>
                    <Link>Monitores y Pantallas</Link>
                </NestedToggle>
                <NestedToggle title={"Perifericos"}>
                    <Link>Auriculares</Link>
                    <br />

                    <Link>Teclados</Link>
                    <br />

                    <Link>Mouses</Link>
                    <br />

                    <Link>Joysticks</Link>
                    <br />

                    <Link>Mouse Pads</Link>
                </NestedToggle>
            </NestedToggle>

        </div>
    )
}

export default Aside