import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import MainProductos from '../components/Main/MainProductos'
import useProductStore from '../stores/productStore'
import '../styles/Productos.css'

const Productos = () => {
    const { isSearching, getAllProducts } = useProductStore();

    useEffect(() => {
        if (!isSearching) {
            getAllProducts();
        }
    }, [isSearching, getAllProducts]);

    return (
        <div>
            <Header></Header>
            <MainProductos></MainProductos>
            <Footer></Footer>
        </div>
    )
}

export default Productos