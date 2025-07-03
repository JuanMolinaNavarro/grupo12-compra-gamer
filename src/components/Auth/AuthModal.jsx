import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import useAuthStore from "../../stores/authStore";
import "../../styles/AuthModal.css";

/**
 * AuthModal - Modal de autenticación para login y registro de usuarios
 *
 * Este componente proporciona una interfaz unificada para que los usuarios puedan
 * iniciar sesión o registrarse. Utiliza el store de autenticación para manejar
 * el estado global del usuario.
 *
 * @param {boolean} show - Controla si el modal está visible
 * @param {function} handleClose - Función para cerrar el modal
 */
const AuthModal = ({ show, handleClose }) => {
  // Estado local para controlar entre modos de login y registro
  const [mode, setMode] = useState("login"); // "login" o "register"

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para los campos del formulario de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados adicionales para el formulario de registro
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneCode, setPhoneCode] = useState("54"); // Código de país por defecto
  const [phoneNumber, setPhoneNumber] = useState("");

  // Estados para feedback visual
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Función de login del store global
  const login = useAuthStore((state) => state.login);

  /**
   * Limpia todos los campos del formulario y resetea el estado
   * Se ejecuta al cerrar el modal o cambiar de modo
   */
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setNombre("");
    setApellido("");
    setConfirmPassword("");
    setPhoneCode("54");
    setPhoneNumber("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  /**
   * Maneja el cierre del modal
   * Limpia el formulario y ejecuta la función de cierre del padre
   */
  const handleModalClose = () => {
    clearForm();
    handleClose();
  };

  /**
   * Cambia entre modo login y registro
   * @param {string} newMode - "login" o "register"
   */
  const handleModeChange = (newMode) => {
    clearForm();
    setMode(newMode);
  };

  /**
   * Maneja el envío del formulario
   * Ejecuta login o registro según el modo actual
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      console.error("Error en autenticación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Procesa el login del usuario
   * Envía credenciales al backend y actualiza el store global
   */
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Actualiza el store global con los datos del usuario
        login(response.data.user);
        handleModalClose();
      } else {
        setError(response.data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Email o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  /**
   * Procesa el registro de un nuevo usuario
   * Valida datos y envía la información al backend
   */
  const handleRegister = async () => {
    // Validaciones del lado cliente
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 8) {
      setError("Ingrese un número de teléfono válido");
      return;
    }

    try {
      // Combina código de área y número de teléfono
      const fullPhone = `+${phoneCode}${phoneNumber}`;

      const response = await axios.post("http://localhost:8000/auth/register", {
        nombre,
        apellido,
        email,
        password,
        telefono: fullPhone,
      });

      if (response.data.success) {
        // Auto-login después del registro exitoso
        await handleLogin();
      } else {
        setError(response.data.message || "Error al registrar usuario");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("Ya existe un usuario con este email");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered className="auth-modal">
      <Modal.Header closeButton className="auth-modal-header">
        <Modal.Title>
          {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="auth-modal-body">
        {/* Botones para cambiar entre login y registro */}
        <div className="auth-mode-toggle">
          <Button
            variant={mode === "login" ? "danger" : "outline-danger"}
            onClick={() => handleModeChange("login")}
            className="auth-mode-button"
          >
            Iniciar Sesión
          </Button>
          <Button
            variant={mode === "register" ? "danger" : "outline-danger"}
            onClick={() => handleModeChange("register")}
            className="auth-mode-button"
          >
            Registrarse
          </Button>
        </div>

        {/* Mostrar errores si los hay */}
        {error && (
          <div className="alert alert-danger auth-error" role="alert">
            {error}
          </div>
        )}

        {/* Formulario principal */}
        <Form onSubmit={handleSubmit}>
          {/* Campos adicionales para registro */}
          {mode === "register" && (
            <>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nombre*"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="auth-modal-input"
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Apellido*"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      required
                      className="auth-modal-input"
                    />
                  </Form.Group>
                </div>
              </div>
            </>
          )}

          {/* Campo de email (común para ambos modos) */}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-modal-input"
            />
          </Form.Group>

          {/* Campos de teléfono solo para registro */}
          {mode === "register" && (
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
          )}

          {/* Campo de contraseña con opción de mostrar/ocultar */}
          <Form.Group className="mb-3">
            <div className="row">
              <div className="col">
                <div className="password-input-container">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-modal-input"
                  />
                  <Button
                    variant="link"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </div>
            </div>
          </Form.Group>

          {/* Campo de confirmación de contraseña solo para registro */}
          {mode === "register" && (
            <Form.Group className="mb-3">
              <div className="password-input-container">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="auth-modal-input"
                />
                <Button
                  variant="link"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>
          )}

          {/* Botón de envío del formulario */}
          <Button
            variant="danger"
            type="submit"
            disabled={isLoading}
            className="auth-submit-button w-100"
          >
            {isLoading
              ? "Procesando..."
              : mode === "login"
              ? "Iniciar Sesión"
              : "Crear Cuenta"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
