const express = require("express")
const { getAllCategorias, getAllMarcas } = require("../controllers/categorias")

const router = express.Router()

router.get("/categorias", getAllCategorias)
router.get("/marcas", getAllMarcas)

module.exports = router
