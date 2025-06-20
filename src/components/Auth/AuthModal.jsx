import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/AuthModal.css";
import { RiVideoFill } from "react-icons/ri";

const AuthModal = ({ show, handleClose }) => {
  const [mode, setMode] = useState("login"); // login o register

  // Estados de los inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneCode("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchToRegister = () => {
    resetFields();
    setMode("register");
  };

  const switchToLogin = () => {
    resetFields();
    setMode("login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "login") {
      console.log("Login con:", email, password);
      // lógica para login
    } else {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      console.log("Registro con:", {
        firstName,
        lastName,
        email,
        phoneCode,
        phoneNumber,
        password,
      });
      // lógica para registro
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center">
          {mode === "login"
            ? "Para comenzar ingresa tu mail"
            : "Complete los campos para crear su cuenta"}
        </p>

        <Form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              {/* Nombre y apellido */}
              <Form.Group className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Control
                      type="text"
                      placeholder="Nombre*"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="auth-modal-input"
                    />
                  </div>
                  <div className="col">
                    <Form.Control
                      type="text"
                      placeholder="Apellido*"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="auth-modal-input"
                    />
                  </div>
                </div>
              </Form.Group>
            </>
          )}

          {/* Email */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-modal-input"
            />
          </Form.Group>

          {mode === "register" && (
            <>
              {/* Teléfono */}
              <Form.Group className="mb-3">
                <div className="row">
                  <div className="col-4">
                    <Form.Control
                      type="text"
                      placeholder="Código de área*"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      required
                      className="auth-modal-input"
                    />
                  </div>
                  <div className="col-8">
                    <Form.Control
                      type="text"
                      placeholder="Número de teléfono*"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="auth-modal-input"
                    />
                  </div>
                </div>
              </Form.Group>
            </>
          )}

          {/* Contraseña y confirmar contraseña (en login solo se muestra una) */}
          <Form.Group className="mb-3">
            <div className="row">
              <div className="col">
                <Form.Control
                  type="password"
                  placeholder="Contraseña*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-modal-input"
                />
              </div>
              {mode === "register" && (
                <div className="col">
                  <Form.Control
                    type="password"
                    placeholder="Repetir contraseña*"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="auth-modal-input"
                  />
                </div>
              )}
            </div>
          </Form.Group>

          {/* Botón principal */}
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#f0320a", borderColor: "#f0320a" }}
          >
            {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
          </Button>

          {/* Botón para cambiar entre login y registro */}
          {mode === "login" ? (
            <Button
              variant="outline-secondary"
              type="button"
              className="w-100 mt-2"
              onClick={switchToRegister}
            >
              Crear Cuenta
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              type="button"
              className="w-100 mt-2"
              onClick={switchToLogin}
            >
              Volver al Login
            </Button>
          )}
        </Form>

        {/* Video y ayuda */}
        <div className="text-center mt-3">
          <RiVideoFill />
          <a
            href="https://www.youtube.com/watch?v=Fy37FKC_kS8&ab_channel=CompraGamer"
            style={{ color: "#007bff", display: "block" }}
          >
            Ver video instructivo de ingreso a la página
          </a>
          <p className="problem">
            Si tenés problemas para iniciar sesión escribinos a<br />
            <strong>feedback_nuevapagina@compragamer.net</strong>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
