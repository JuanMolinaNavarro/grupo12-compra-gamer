import React from 'react'
import NestedToggle from './NestedToggle'
import { Link } from 'react-router-dom'


const Aside = () => {
    return (
        <div>
            <NestedToggle title={"Categorías"}>
                <NestedToggle title={"Equipos y Notebooks"} children={"Notebooks"}></NestedToggle>
                <NestedToggle title={"Procesadores"}>
                    <p>
                        <Link>Procesadores AMD</Link>
                    </p>
                    <p>
                        <Link>Procesadores Intel</Link>
                    </p>
                </NestedToggle>
                <NestedToggle title={"Mothers"}>
                    <p>
                        <Link>Mothers AMD</Link>
                    </p>
                    <p>
                        <Link>Mothers Intel</Link>
                    </p>
                </NestedToggle>
                <NestedToggle title={"Placas de Video"}>
                    <p>
                        Placas de Video GeForce
                    </p>
                    <p>
                        Placas de Video Radeon AMD
                    </p>
                </NestedToggle>
                <NestedToggle title={"Memorias RAM"} children={"Memorias"}></NestedToggle>
                <NestedToggle title={"Almacenamiento"}>
                    <p>
                        Discos Externos
                    </p>
                    <p>
                        Discos Rigidos
                    </p>
                    <p>
                        Discos Solidos SSD
                    </p>
                </NestedToggle>
                <NestedToggle title={"Refrigeracion"}>
                    <p>Coolers Fan</p>
                    <p>Coolers CPU</p>
                    <p>Pasta Termica</p>
                </NestedToggle>
                <NestedToggle title={"Gabinetes"} children={"Gabinetes"}>
                </NestedToggle>
                <NestedToggle title={"Fuentes"} children={"Fuentes de Alimentación"}></NestedToggle>
                <NestedToggle title={"Monitores"} children={"Monitores y Pantallas"}></NestedToggle>
                <NestedToggle title={"Perifericos"}>
                    <p>Auriculares</p>
                    <p>Teclados</p>
                    <p>Mouses</p>
                    <p>Joysticks</p>
                    <p>Mouse Pads</p>
                </NestedToggle>
            </NestedToggle>

        </div>
    )
}

export default Aside