const { connection } = require("../config/database");

// Función para iniciar sesión
const login = (req, res) => {
  const { email, contraseña } = req.body;

  // Verificar que se enviaron email y contraseña
  if (!email || !contraseña) {
    return res.status(400).json({
      success: false,
      message: "Email y contraseña son requeridos",
    });
  }

  // Buscar usuario en la base de datos
  const query = "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?";

  connection.query(query, [email, contraseña], (err, results) => {
    if (err) {
      console.log("Error en la consulta:", err);
      return res.status(500).json({
        success: false,
        message: "Error en el servidor",
      });
    }

    // Verificar si se encontró el usuario
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email o contraseña incorrectos",
      });
    }

    // Usuario encontrado, devolver datos del usuario (incluyendo is_adm)
    const usuario = results[0];
    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        is_adm: usuario.is_adm, // Incluir campo de administrador
      },
    });
  });
};

// Función para registrar un nuevo usuario
const register = (req, res) => {
  const { nombre, apellido, email, contraseña, telefono } = req.body;

  // Verificar que se enviaron todos los datos requeridos
  if (!nombre || !apellido || !email || !contraseña) {
    return res.status(400).json({
      success: false,
      message: "Nombre, apellido, email y contraseña son requeridos",
    });
  }

  // Verificar si el email ya está registrado
  const checkEmailQuery = "SELECT * FROM usuarios WHERE email = ?";

  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.log("Error verificando email:", err);
      return res.status(500).json({
        success: false,
        message: "Error en el servidor",
      });
    }

    // Si el email ya existe
    if (results.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El email ya está registrado",
      });
    }

    // Insertar nuevo usuario
    const insertQuery =
      "INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono) VALUES (?, ?, ?, ?, ?)";

    connection.query(
      insertQuery,
      [nombre, apellido, email, contraseña, telefono],
      (err, results) => {
        if (err) {
          console.log("Error insertando usuario:", err);
          return res.status(500).json({
            success: false,
            message: "Error al registrar usuario",
          });
        }

        // Usuario registrado exitosamente
        res.status(201).json({
          success: true,
          message: "Usuario registrado exitosamente",
          usuario: {
            id_usuario: results.insertId,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            is_adm: 0, // Los usuarios registrados no son admin por defecto
          },
        });
      }
    );
  });
};

// Función para cerrar sesión (simplemente confirma el cierre)
const logout = (req, res) => {
  res.json({
    success: true,
    message: "Sesión cerrada exitosamente",
  });
};

module.exports = { login, register, logout };
