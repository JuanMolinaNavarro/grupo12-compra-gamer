import { Button, Card, Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Mejoresmarcas = () => {

    const destacados = [
    {
      nombre: "Auriculares Corsair",
      text: "Surround Dolby Audio 7.1",
      URL: "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_40800_Auriculares_Corsair_HS55_White_Surround_Dolby_Audio_7.1_PC_MAC_SWITCH_PS5_bee3805e-mini.jpg",
      precio: "90.500",
      id: "1"
    },
    {
      nombre: "Auriculares Corsair",
      text: "Surround Dolby Audio 7.1",
      URL: "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_40800_Auriculares_Corsair_HS55_White_Surround_Dolby_Audio_7.1_PC_MAC_SWITCH_PS5_bee3805e-mini.jpg",
      precio: "90.500",
      id: "1"
    },
    {
      nombre: "Auriculares Corsair",
      text: "Surround Dolby Audio 7.1",
      URL: "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_40800_Auriculares_Corsair_HS55_White_Surround_Dolby_Audio_7.1_PC_MAC_SWITCH_PS5_bee3805e-mini.jpg",
      precio: "90.500",
      id: "1"
    },

  ]
    return (
        
        <>
            <h3 className='text-start mt-3 mb-3 '>Descubri las  <strong> Mejores Marcas</strong> </h3>
            <div className='d-flex align-items-left'>
                <Button variant='danger' type='button' className="btn botonesMarcas ">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/asus%20logo%20black_Asus_zmLf3E.svg" alt="" />
                </Button>

                <Button variant='danger' type='button'  className="btn botonesMarcas">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/logitech%20logo%20black_Logitech_YD2gnj.svg" alt="" />
                </Button>
                <Button variant='danger' type='button'  className="btn botonesMarcas">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/corsair%20logo%20black_Corsair_kBgqT9.svg" alt="" />
                </Button>
                <Button variant='danger' type='button'  className="btn botonesMarcas">
                    <img src="https://imagenes.compragamer.com/assets/logos/marcas/01_logo_SS_horizontalblack_SteelSeries_41GJgS.svg" alt="" />
                </Button>
            </div>

            <Container fluid>
                <Row>
                    {destacados.map((destacados, index) => (
                        <Col sm={6} md={3} className="mb-4" key={index} >
                            <Card as={Link} className=" cardDestacado" to={`/Producto/${destacados.id}`}>
                                <Card.Img variant="top" src={destacados.URL} className="" />
                                <Card.Body className="d-flex flex-column justify-content-center ">
                                    <Card.Title className=''>{destacados.nombre}</Card.Title>
                                    <Card.Text>{destacados.text}</Card.Text>
                                    <Card.Text><strong>${destacados.precio}</strong></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    )
}

export default Mejoresmarcas
