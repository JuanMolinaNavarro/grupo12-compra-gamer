import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "../../styles/AuthModal.css";
import { RiVideoFill } from "react-icons/ri";
import useAuthStore from "../../stores/authStore";

const AuthModal = ({ show, handleClose }) => {
  //en esta parte utilizo show en el caso de que sea true, se me muestra el modal en el caso que sea false no se me lo muestra y el handleClose se ejecuta cuando cera el modal
  const [mode, setMode] = useState("login"); // el mode lo usamos para saber en que modo estamos si  en el login o register

  // Estados de los inputs para el useState
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados del store de autenticación
  const { login, register, loading, error, clearError } = useAuthStore();

  //esto lo hacemos para cuando tenemos llenos lo inputs los reseteamos
  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneCode("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    clearError(); // Limpiar errores al resetear campos
  };

  // el switchToregister y el login sirven poder cambiar de login y register y ademas limpia el input
  const switchToRegister = () => {
    resetFields();
    setMode("register");
  };

  const switchToLogin = () => {
    resetFields();
    setMode("login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // en este apartado realizamos la logica del inicio de sesion
    if (mode === "login") {
      const result = await login(email, password);
      if (result.success) {
        resetFields();
        handleClose();
      }
    } else {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      
      // Combinar código de área y número de teléfono
      const telefono = phoneCode && phoneNumber ? `${phoneCode}${phoneNumber}` : null;
      
      const result = await register(firstName, lastName, email, password, telefono);
      if (result.success) {
        resetFields();
        handleClose();
      }
    }
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

        {/* Mostrar errores si existen */}
        {error && (
          <Alert variant="danger" onClose={clearError} dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
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
          {/*boton principal*/}
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#f0320a", borderColor: "#f0320a" }}
            disabled={loading}
          >
            {loading ? "Cargando..." : (mode === "login" ? "Iniciar Sesión" : "Registrarse")}
          </Button>
          {/* este es el btn para cambiar de login a register */}
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
