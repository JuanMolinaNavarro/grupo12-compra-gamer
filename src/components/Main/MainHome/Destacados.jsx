import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Destacados = () => {

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
      <h3 className='text-start'>Conocé nuestros <strong>Productos Destacados</strong></h3>
      <Container fluid>
        <Row>
          {destacados.map((destacados, index) => (
            <Col sm={12} md={4} className="mb-4" key={index} >
              <Card as={Link} className="d-flex flex-row cardDestacado" to={`/Producto/${destacados.id}`}>
                <Card.Img variant="top" src={destacados.URL} className="flex-md-shrink-0 w-40" />
                <Card.Body className="w-60">
                  <Card.Title>{destacados.nombre}</Card.Title>
                  <Card.Text>{destacados.text}</Card.Text>
                  <Card.Text><strong>${destacados.precio}</strong></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Destacados;
