import { useEffect, useState } from 'react';
import NavBar from './NavBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import '../../styles/Mostrarproducto.css'
import { FaShieldAlt, FaTruck, FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../../stores/cartStore';
const MainMostrarProducto = () => {

    const [data, SetData] = useState([])
    const [added, setAdded] = useState(false)
    const { id_producto } = useParams()
    
    // Store del carrito
    const { addToCart } = useCartStore()
    
    useEffect(() => {
        axios.get(`http://localhost:8000/productos/${id_producto}`)
            .then(response => {
                SetData(response.data[0])
            })
            .catch(error => {
                console.error("Error al obtener datos", error)
            })
    }, [id_producto])

    const handleAddToCart = () => {
        if (data && data.id_producto) {
            addToCart(data)
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }
    }


    return (
        <>
            <NavBar></NavBar>
            <Container className='bg-light'>
                <Row className='mt-5 mb-5'>
                    <Col className='mt-5' md={6}>
                        <img className='img-fluid' src={data.imagen_url} alt="Imagen producto" />
                    </Col>

                    <Col md={6}>
                        <h2 className='text-start'>{data.nombre} </h2>
                        <hr />
                        <p className='fs-2 text-start'><strong>${data.precio}</strong></p>
                        <hr />
                        <p className='text-start'>Hasta 18 cuotas en precio de lista</p>
                        <hr />
                        <div className='d-flex align-items-center '>
                            <FaShieldAlt className="me-2 iconos" />
                            <h5 className='mt-2 colortexto'>Garantía - 12 meses</h5>
                        </div>
                        <div className='d-flex align-items-center '>
                            <FaCheck className="me-2 iconos" />
                            <h5 className='mt-2 colortexto'>
                                {data.stock > 0 ? `Stock disponible (${data.stock} unidades)` : 'Sin stock'}
                            </h5>
                        </div>
                        <div className='d-flex align-items-center '>
                            <FaTruck className="me-2 iconos" />
                            <h5 className='mt-2 colortexto'>Envios a todo el pais</h5>
                        </div>

                        <hr />
                        <Button 
                            className='btnsumar d-flex' 
                            type='button' 
                            onClick={handleAddToCart}
                            disabled={!data.stock || data.stock <= 0}
                            style={{
                                backgroundColor: added ? '#28a745' : '#f0320a',
                                borderColor: added ? '#28a745' : '#f0320a',
                                color: 'white',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {added ? '¡Agregado al carrito!' : 'Sumar al carrito'}
                        </Button>
                        {(!data.stock || data.stock <= 0) && (
                            <p style={{ color: 'red', marginTop: '10px' }}>
                                Producto sin stock disponible
                            </p>
                        )}
                    </Col>
                </Row>
                <hr />
                <div>
                    <h3 className='text-start colortexto'>Descripcion</h3>
                    <h4 className='text-start mb-3 pb-3'>{data.descripcion}</h4>
                </div>


            </Container>
        </>
    )
}

export default MainMostrarProducto