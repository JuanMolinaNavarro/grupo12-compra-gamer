const express = require("express")
const { login, register, logout } = require("../controllers/auth")

const router = express.Router()

// Ruta para iniciar sesión
router.post("/login", login)

// Ruta para registrar usuario
router.post("/register", register)

// Ruta para cerrar sesión
router.post("/logout", logout)

module.exports = router
