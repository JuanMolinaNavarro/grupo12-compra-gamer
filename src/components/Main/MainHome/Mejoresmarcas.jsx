import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Mejoresmarcas - Componente que muestra productos filtrados por marcas destacadas
 * 
 * Este componente permite al usuario explorar productos de marcas específicas
 * (ASUS, Logitech, Corsair) mediante botones de filtro. Muestra productos
 * en formato de tarjetas y actualiza dinámicamente el contenido según la
 * marca seleccionada.
 * 
 * @param {Array} data - Array de todos los productos disponibles
 */
const Mejoresmarcas = ({ data }) => {
    // Estado para almacenar los productos filtrados por marca
    const [mejores, setMejores] = useState([]);

    /**
     * Filtra y muestra productos de la marca ASUS
     * Busca productos que contengan "ASUS" en su nombre (case-insensitive)
     */
    const handleclickasus = () => {
        const asusfilltrado = data.filter(producto => 
            producto.nombre.toLowerCase().includes('asus')
        );
        setMejores(asusfilltrado);
    };

    /**
     * Filtra y muestra productos de la marca Corsair
     * Busca productos que contengan "Corsair" en su nombre (case-insensitive)
     */
    const handleclickcorsair = () => {
        const corsairfilltrado = data.filter(producto => 
            producto.nombre.toLowerCase().includes('corsair')
        );
        setMejores(corsairfilltrado);
    };

    /**
     * Filtra y muestra productos de la marca Logitech
     * Busca productos que contengan "Logitech" en su nombre (case-insensitive)
     */
    const handleclicklogitech = () => {
        const logitechfilltrado = data.filter(producto => 
            producto.nombre.toLowerCase().includes('logitech')
        );
        setMejores(logitechfilltrado);
    };

    /**
     * Efecto para cargar productos ASUS por defecto al montar el componente
     * Establece ASUS como la marca seleccionada inicialmente
     */
    useEffect(() => {
        handleclickasus();
    }, [data]); // Dependencia en data para re-ejecutar cuando cambien los productos

    return (
        <>
            {/* Título de la sección */}
            <h3 className='text-start mt-3 mb-3'>
                Descubrí las <strong>Mejores Marcas</strong>
            </h3>
            
            {/* Botones de filtro por marca */}
            <div className='d-flex align-items-left'>
                {/* Botón para filtrar productos ASUS */}
                <Button 
                    variant='danger' 
                    type='button' 
                    onClick={handleclickasus} 
                    className="btn botonesMarcas"
                >
                    <img 
                        src="https://imagenes.compragamer.com/assets/logos/marcas/asus%20logo%20black_Asus_zmLf3E.svg" 
                        alt="Asus" 
                    />
                </Button>
                
                {/* Botón para filtrar productos Logitech */}
                <Button 
                    variant='danger' 
                    type='button' 
                    onClick={handleclicklogitech} 
                    className="btn botonesMarcas"
                >
                    <img 
                        src="https://imagenes.compragamer.com/assets/logos/marcas/logitech%20logo%20black_Logitech_YD2gnj.svg" 
                        alt="Logitech" 
                    />
                </Button>
                
                {/* Botón para filtrar productos Corsair */}
                <Button 
                    variant='danger' 
                    type='button' 
                    onClick={handleclickcorsair} 
                    className="btn botonesMarcas"
                >
                    <img 
                        src="https://imagenes.compragamer.com/assets/logos/marcas/corsair%20logo%20black_Corsair_kBgqT9.svg" 
                        alt="Corsair" 
                    />
                </Button>
            </div>

            {/* Grid de productos filtrados */}
            <Container fluid>
                <Row>
                    {/* Mapea y renderiza cada producto de la marca seleccionada */}
                    {mejores.map((producto) => (  
                        <Col sm={6} md={3} className="mb-4" key={producto.id_producto}>
                            {/* Tarjeta de producto como enlace navegable */}
                            <Card as={Link} className="cardDestacado" to={`/productos/mostrar/${producto.id_producto}`}>
                                {/* Imagen del producto */}
                                <Card.Img 
                                    variant="top" 
                                    src={producto.imagen_url} 
                                    className="img-fluid" 
                                />
                                
                                {/* Información del producto */}
                                <Card.Body className="d-flex flex-column justify-content-center">
                                    <Card.Title>{producto.nombre}</Card.Title>
                                    <Card.Text>{producto.descripcion}</Card.Text>
                                    {/* Precio con formato destacado */}
                                    <Card.Text><strong>${producto.precio}</strong></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Mejoresmarcas;
