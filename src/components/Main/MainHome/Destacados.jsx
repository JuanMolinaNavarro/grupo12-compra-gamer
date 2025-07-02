import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Destacados = ({data}) => {

  const primerosSeis = data.slice(0, 5);

  return (
    <>
      <h3 className='text-start'>Conocé nuestros <strong>Productos Destacados</strong></h3>
      <Container fluid>
        <Row>
          {primerosSeis.map((producto) => (  
            <Col sm={12} md={4} className="mb-4" key={producto.id_producto}>
              <Card as={Link} className="d-flex flex-row cardDestacado" to={`/productos/mostrar/${producto.id_producto}`}>
                <Card.Img variant="top" src={producto.imagen_url} className="flex-md-shrink-0 w-40" />
                <Card.Body className="w-60">
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>{producto.descripcion}</Card.Text>
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

export default Destacados;
