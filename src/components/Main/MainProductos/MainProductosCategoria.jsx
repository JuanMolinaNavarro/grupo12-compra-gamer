import React, { useEffect, useState } from 'react'
import Aside from './Aside'
import Cards from '../Cards'
import NavBar from '../NavBar'
import '../../../styles/MainProductos.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Titulo from './Titulo'


const MainProductosCategoria = () => {
    
    const { id_categoria } = useParams()
    const [data,SetData] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:8000/productos/categoria/${id_categoria}`)
        .then(response => {
            SetData(response.data)
            console.log(data)
        })
        .catch(error =>{
            console.error("Error al obtener datos", error)
        })
    }, [id_categoria])
    

    return (
        <div>
            <NavBar></NavBar>
            <div className='containerDestacados'>
                <h4 style={{ fontWeight: '600' }}>{data[0] ? data[0].categoria : 'Cargando...'}</h4>
                <hr style={{ borderColor: 'black' }}/>
            </div>
            <div className='containerMain'>
                <Aside className="aside"></Aside>
                <div className='cardContainer'>
                    {data.map(producto => (
                        <Cards key={producto.id_producto} producto={producto}></Cards>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MainProductosCategoria