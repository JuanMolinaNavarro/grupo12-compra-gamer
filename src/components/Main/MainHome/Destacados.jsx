import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Destacados - Componente que muestra productos destacados en la página principal
 * 
 * Este componente recibe una lista de productos y muestra los primeros 5 como
 * productos destacados. Cada producto se presenta en una tarjeta horizontal
 * con imagen, información básica y precio.
 * 
 * @param {Array} data - Array de productos obtenidos del backend
 */
const Destacados = ({ data }) => {
  // Limita la muestra a los primeros 5 productos para mantener el diseño limpio
  const primerosSeis = data.slice(0, 5);

  return (
    <>
      {/* Título de la sección con estilo destacado */}
      <h3 className='text-start'>Conocé nuestros <strong>Productos Destacados</strong></h3>
      
      <Container fluid>
        <Row>
          {/* Mapea y renderiza cada producto destacado */}
          {primerosSeis.map((producto) => (  
            <Col sm={12} md={4} className="mb-4" key={producto.id_producto}>
              {/* Tarjeta de producto como enlace navegable */}
              <Card as={Link} className="d-flex flex-row cardDestacado" to={`/productos/mostrar/${producto.id_producto}`}>
                {/* Imagen del producto con clases responsivas */}
                <Card.Img 
                  variant="top" 
                  src={producto.imagen_url} 
                  className="flex-md-shrink-0 w-40" 
                />
                
                {/* Información del producto */}
                <Card.Body className="w-60">
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

export default Destacados;
