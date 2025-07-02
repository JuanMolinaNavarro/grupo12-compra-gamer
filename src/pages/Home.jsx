import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import MainHome from '../components/Main/MainHome'
import Footer from '../components/Footer/Footer'
import useProductStore from '../stores/productStore'

const Home = () => {
  const { clearSearch } = useProductStore();

  useEffect(() => {
    // Limpiar búsqueda al cargar la página de inicio
    clearSearch();
  }, [clearSearch]);

  return (
    <div>
        <Header></Header>
        <MainHome></MainHome>
        <Footer></Footer>
    </div>
  )
}

export default Home