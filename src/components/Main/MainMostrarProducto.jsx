// Importaciones necesarias para el componente
import { useEffect, useState } from 'react';
import NavBar from './NavBar' // Componente de navegación
import { Container, Row, Col, Button } from 'react-bootstrap' // Componentes de Bootstrap para layout
import '../../styles/Mostrarproducto.css' // Estilos específicos para mostrar producto
import { FaShieldAlt, FaTruck, FaCheck } from 'react-icons/fa'; // Iconos de React Icons
import { useParams } from 'react-router-dom'; // Hook para obtener parámetros de la URL
import axios from 'axios'; // Cliente HTTP para llamadas a la API
import useCartStore from '../../stores/cartStore'; // Store global del carrito

/**
 * Componente para mostrar el detalle completo de un producto específico
 * Permite ver información detallada y agregar el producto al carrito
 */
const MainMostrarProducto = () => {

    // Estado local para almacenar los datos del producto obtenidos de la API
    const [data, SetData] = useState([])
    
    // Estado local para controlar el feedback visual cuando se agrega al carrito
    const [added, setAdded] = useState(false)
    
    // Obtener el ID del producto desde los parámetros de la URL
    const { id_producto } = useParams()
    
    // Obtener la función addToCart del store global del carrito
    const { addToCart } = useCartStore()
    
    /**
     * Hook useEffect que se ejecuta al montar el componente y cuando cambia id_producto
     * Realiza una llamada a la API para obtener los datos del producto específico
     */
    useEffect(() => {
        axios.get(`http://localhost:8000/productos/${id_producto}`)
            .then(response => {
                // La API devuelve un array, tomamos el primer elemento
                SetData(response.data[0])
            })
            .catch(error => {
                console.error("Error al obtener datos", error)
            })
    }, [id_producto]) // Dependencia: se ejecuta cuando cambia el ID del producto

    /**
     * Función para manejar la adición del producto al carrito
     * Valida que el producto tenga datos válidos antes de agregarlo
     * Muestra feedback visual temporal al usuario
     */
    const handleAddToCart = () => {
        // Verificar que el producto tenga datos válidos y un ID
        if (data && data.id_producto) {
            addToCart(data) // Agregar producto al carrito global
            setAdded(true) // Activar estado de "agregado" para feedback visual
            // Desactivar feedback después de 2 segundos
            setTimeout(() => setAdded(false), 2000)
        }
    }


    return (
        <>
            {/* Componente de navegación */}
            <NavBar></NavBar>
            
            {/* Container principal con fondo claro */}
            <Container className='bg-light'>
                {/* Fila principal con márgenes superior e inferior */}
                <Row className='mt-5 mb-5'>
                    {/* Columna izquierda para la imagen del producto */}
                    <Col className='mt-5' md={6}>
                        <img className='img-fluid' src={data.imagen_url} alt="Imagen producto" />
                    </Col>

                    {/* Columna derecha para la información del producto */}
                    <Col md={6}>
                        {/* Nombre del producto */}
                        <h2 className='text-start'>{data.nombre} </h2>
                        <hr />
                        
                        {/* Precio del producto con formato destacado */}
                        <p className='fs-2 text-start'><strong>${data.precio}</strong></p>
                        <hr />
                        
                        {/* Información de cuotas */}
                        <p className='text-start'>Hasta 18 cuotas en precio de lista</p>
                        <hr />
                        
                        {/* Sección de características del producto con iconos */}
                        {/* Información de garantía */}
                        <div className='d-flex align-items-center '>
                            <FaShieldAlt className="me-2 iconos" />
                            <h5 className='mt-2 colortexto'>Garantía - 12 meses</h5>
                        </div>
                        
                        {/* Información de stock con renderizado condicional */}
                        <div className='d-flex align-items-center '>
                            <FaCheck className="me-2 iconos" />
                            <h5 className='mt-2 colortexto'>
                                {/* Mostrar stock disponible o sin stock según la cantidad */}
                                {data.stock > 0 ? `Stock disponible (${data.stock} unidades)` : 'Sin stock'}
                            </h5>
                        </div>
                        
                        {/* Información de envío */}
                        <div className='d-flex align-items-center '>
                            <FaTruck className="me-2 iconos" />
                            <h5 className='mt-2 colortexto'>Envios a todo el pais</h5>
                        </div>

                        <hr />
                        
                        {/* Botón para agregar al carrito con múltiples funcionalidades */}
                        <Button 
                            className='btnsumar d-flex' 
                            type='button' 
                            onClick={handleAddToCart} // Función para agregar al carrito
                            disabled={!data.stock || data.stock <= 0} // Deshabilitar si no hay stock
                            style={{
                                // Cambio de color dinámico: verde cuando se agrega, rojo por defecto
                                backgroundColor: added ? '#28a745' : '#f0320a',
                                borderColor: added ? '#28a745' : '#f0320a',
                                color: 'white',
                                transition: 'all 0.3s ease' // Transición suave para cambios visuales
                            }}
                        >
                            {/* Texto dinámico según el estado */}
                            {added ? '¡Agregado al carrito!' : 'Sumar al carrito'}
                        </Button>
                        
                        {/* Mensaje de error mostrado condicionalmente cuando no hay stock */}
                        {(!data.stock || data.stock <= 0) && (
                            <p style={{ color: 'red', marginTop: '10px' }}>
                                Producto sin stock disponible
                            </p>
                        )}
                    </Col>
                </Row>
                <hr />
                
                {/* Sección de descripción del producto */}
                <div>
                    <h3 className='text-start colortexto'>Descripcion</h3>
                    <h4 className='text-start mb-3 pb-3'>{data.descripcion}</h4>
                </div>


            </Container>
        </>
    )
}

export default MainMostrarProducto