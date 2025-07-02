import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Mejoresmarcas = ({ data }) => {

        const [mejores,SetMejores]=useState([])
        const handleclickasus = ()=>{
             const productosAsus = data.filter(item => item.id_marca === 2)
             const Asusflltrado = productosAsus.slice(0,4)
            SetMejores( Asusflltrado)
        }
        const handleclickcorsair = ()=>{
            const productosCorsair = data.filter(item => item.id_marca === 4)
            const Corsairflltrado = productosCorsair.slice(0,4)
            SetMejores( Corsairflltrado)
        }
        const handleclicklogitech = ()=>{
            const productosLogitech = data.filter(item => item.id_marca === 6)
            const Logitechflltrado = productosLogitech.slice(0,4)
            SetMejores( Logitechflltrado)
        }

        useEffect(() => {
            handleclickasus();
        }, [])
    return (
        <>
        
            <h3 className='text-start mt-3 mb-3'>Descubrí las <strong>Mejores Marcas</strong></h3>
            <div className='d-flex align-items-left'>
                <Button variant='danger' type='button' onClick={handleclickasus} className="btn botonesMarcas">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/asus%20logo%20black_Asus_zmLf3E.svg" alt="Asus" />
                </Button>
                <Button variant='danger' type='button' onClick={handleclicklogitech} className="btn botonesMarcas">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/logitech%20logo%20black_Logitech_YD2gnj.svg" alt="Logitech" />
                </Button>
                <Button variant='danger' type='button' onClick={handleclickcorsair} className="btn botonesMarcas">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/corsair%20logo%20black_Corsair_kBgqT9.svg" alt="Corsair" />
                </Button>
            </div>

            <Container fluid>
                <Row>
                    {mejores.map((mejores) => (  
                        <Col sm={6} md={3} className="mb-4" key={mejores.id_producto}>
                            <Card as={Link} className="cardDestacado" to={`/productos/mostrar/${mejores.id_producto}`}>
                                <Card.Img variant="top" src={mejores.imagen_url} className="img-fluid" />
                                <Card.Body className="d-flex flex-column justify-content-center">
                                    <Card.Title>{mejores.nombre}</Card.Title>
                                    <Card.Text>{mejores.descripcion}</Card.Text>
                                    <Card.Text><strong>${mejores.precio}</strong></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Mejoresmarcas;
