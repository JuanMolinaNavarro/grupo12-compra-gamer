import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import MainProductos from '../components/Main/MainProductos'
import '../styles/Productos.css'

const Productos = () => {
    return (
        <div>
            <Header></Header>
            <MainProductos></MainProductos>
            <Footer></Footer>
        </div>
    )
}

export default Productos