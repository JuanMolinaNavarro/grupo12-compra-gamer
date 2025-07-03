import { Row, Col, } from "react-bootstrap";
import { FaShieldAlt, FaTruck, FaCreditCard } from 'react-icons/fa';

/**
 * Recuadro - Componente informativo sobre servicios y beneficios
 * 
 * Este componente muestra los principales beneficios y servicios que ofrece
 * la tienda a sus clientes. Utiliza iconos descriptivos y texto claro para
 * comunicar valor agregado al cliente.
 * 
 * Servicios destacados:
 * - Financiación en cuotas
 * - Envíos a todo el país
 * - Garantía oficial extendida
 */
const Recuadro = () => {
  return (
    <Row className="bg-light m-3 p-4 Container">
      {/* Sección de financiación */}
      <Col sm={12} md={4} className="d-flex align-items-center">
        <FaCreditCard className="me-2 iconos" />
        <div>
          <h4>Hasta 18 cuotas</h4>
          <p>Abonando con crédito</p>
        </div>
      </Col>
      
      {/* Sección de envíos con separador visual */}
      <Col sm={12} md={4} className="d-flex align-items-center border-start border-5">
        <FaTruck className="me-2 iconos" />
        <div>
          <h4>Envío a todo el país</h4>
          <p>A través de OCA</p>
        </div>
      </Col>
      
      {/* Sección de garantía con separador visual */}
      <Col sm={12} md={4} className="d-flex align-items-center border-start border-5">
        <FaShieldAlt className="me-2 iconos" />
        <div>
          <h4>Garantía oficial</h4>
          <p>De hasta 36 meses en todos los productos</p>
        </div>
      </Col>
    </Row>
  );
};

export default Recuadro;
