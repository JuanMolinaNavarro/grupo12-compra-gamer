import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import "../../styles/Help.css";
import AuthModal from "../Auth/AuthModal";
import NavBar from "../Main/NavBar";

const CardGrid = () => {
  const [activo, setActivo] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const onLoginClick = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);

  const toggleSeccion = (indice) => {
    setActivo((prev) => (prev === indice ? null : indice));
  };

  const subCards = [
    {
      titulo: "Realizar un pedido",
      subtitulo: "Paso a paso para comprar",
      contenido:
        "Solo tenés que seleccionar todos los productos que deseas adquirir. Seguidamente, en el carrito de compras, para conocer el costo del envío colocás tu código postal en el recuadro correspondiente...",
    },
    {
      titulo: "Precio",
      subtitulo: "¿El precio que figura en la web es el precio final?",
      contenido:
        "Todos los precios en la web incluyen el IVA, y se encuentran expresados en pesos argentinos.",
    },
    {
      titulo: "Formas de pago",
      subtitulo: "¿Cuáles son las formas de pago?",
      contenido:
        "Contamos con dos formas de pago: depósito/transferencia bancaria (precio especial) o métodos Pago Gamer / MercadoPago en cuotas.",
    },
    {
      titulo: "Depósito - Transferencia bancaria",
      subtitulo: "¿Cómo abono a través de depósito/transferencia?",
      contenido:
        "Una vez realizado el pedido, te facilitamos el CBU. Debés abonar e informar el pago desde la web antes del vencimiento.",
    },
    {
      titulo: "Pago Gamer",
      subtitulo: "¿Qué es y cómo se utiliza?",
      contenido:
        "Pago Gamer permite pagar con Visa o MasterCard en cuotas al precio de lista desde nuestra web.",
    },
    {
      titulo: "MercadoPago",
      subtitulo: "¿Cómo abonar con MercadoPago?",
      contenido:
        "Podés usar tarjetas online, RapiPago/PagoFácil (1 pago) o transferencias desde tu cuenta de MercadoPago.",
    },
    {
      titulo: "Envíos",
      subtitulo: "¿Cómo gestiono el envío?",
      contenido:
        "Agregá productos al carrito, ingresá tu código postal y seleccioná mensajería. Usamos OCA o mensajería privada en CABA.",
    },
    {
      titulo: "Facturación",
      subtitulo: "¿Cómo tramito la factura?",
      contenido:
        "Te enviamos la factura al mail. Si necesitás factura A, ingresá tu CUIT al hacer el pedido.",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}
    >
      <NavBar></NavBar>
      {/* Título principal con línea naranja */}
      <h2
        style={{ fontWeight: "bold", marginBottom: "8px", textAlign: "left" }}
      >
        Preguntas Frecuentes
      </h2>
      <div
        style={{
          height: "3px",
          width: "150px",
          backgroundColor: "#f0320a",
          marginBottom: "30px",
          borderRadius: "2px",
        }}
      ></div>

      {/* Card principal con borde más grueso */}
      <Card
        style={{
          borderWidth: "2px",
          borderColor: "#ccc",
          borderStyle: "solid",
        }}
      >
        <Card.Body>
          <Row>
            {subCards.map((card, index) => (
              <Col key={index} xs={12}>
                <div onClick={() => toggleSeccion(index)} className="card-item">
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontWeight: "normal", marginBottom: "4px" }}>
                      {card.titulo}
                    </h5>
                    {activo === index && (
                      <>
                        <h6
                          style={{
                            color: "#f0320a",
                            fontWeight: "normal",
                            marginBottom: "8px",
                          }}
                        >
                          {card.subtitulo}
                        </h6>
                        <p style={{ margin: 0, color: "#999" }}>
                          {card.contenido}
                        </p>
                      </>
                    )}
                  </div>
                  <MdKeyboardArrowDown
                    size={24}
                    style={{
                      color: "#f0320a",
                      transition: "transform 0.3s ease",
                      transform:
                        activo === index ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Card secundaria abajo */}
      <Card
        style={{
          marginTop: "40px",
          padding: "20px",
          borderWidth: "2px",
          borderColor: "#ccc",
          borderStyle: "solid",
          textAlign: "left",
        }}
      >
        <Card.Body>
          <h4 style={{ fontWeight: "normal", marginBottom: "12px" }}>
            Servicio postventa y garantías
          </h4>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Para realizar consultas/reclamos relacionadas con la garantía o
            devolución de alguna de tus compras, debajo de esta sección contamos
            con el apartado "Compra Gamer te ayuda. ¿Cuál es tu consulta?" donde
            debes exponer tu caso, seleccionando el motivo de "Postventa" que se
            adapte a tu requerimiento y uno de nuestros representantes te
            ofrecerá la información correspondiente sobre cómo proceder.
          </p>
          <p>
            Para saber si tu producto califica, te aconsejamos revisar los
            términos y condiciones de garantía.
          </p>
          <p>
            Podes sacar un turno para venir en forma presencial a gestionar tu
            garantía en Compra Gamer o, si pasaron más de 30 días, podés
            gestionar la garantía con la marca.
          </p>
          {/* Botones uno al lado del otro */}
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <Button
              style={{
                backgroundColor: "#f0320a",
                color: "#fff",
                borderColor: "#f0320a",
              }}
            >
              SACAR TURNO PRESENCIAL EN COMPRA GAMER
            </Button>

            <Button
              style={{
                backgroundColor: "#fff",
                color: "#f0320a",
                borderColor: "#f0320a",
              }}
              variant="outline-primary"
            >
              COMO TRAMITAR LA GARANTIA CON LA MARCA
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Card de consulta con botón de inicio de sesión */}
      <Card
        style={{
          marginTop: "40px",
          padding: "20px",
          borderWidth: "2px",
          borderColor: "#ccc",
          borderStyle: "solid",
          textAlign: "left",
        }}
      >
        <Card.Body>
          <h4
            style={{
              fontWeight: "normal",
              marginBottom: "12px",
              color: "#f0320a",
            }}
          >
            Compra Gamer te ayuda. ¿Cuál es tu consulta?
          </h4>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Para realizar una consulta es necesario que inicies sesión en tu
            cuenta
          </p>

          <Button
            onClick={onLoginClick}
            style={{
              backgroundColor: "#f0320a",
              color: "#fff",
              borderColor: "#f0320a",
            }}
          >
            <FaRegUserCircle style={{ marginRight: "5px" }} />
            Inicia Sesión
          </Button>
        </Card.Body>
      </Card>

      {/* Modal de inicio de sesión */}
      <AuthModal show={showLogin} handleClose={handleClose} />
    </div>
  );
};

export default CardGrid;
