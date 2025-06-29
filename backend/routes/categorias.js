const express = require("express")
const { 
  getAllCategorias, 
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getAllMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  getProductosBySubcategoria,
  deleteMarca
} = require("../controllers/categorias")

const router = express.Router()

// ============ RUTAS CATEGORÍAS ============
router.get("/categorias", getAllCategorias)
router.get("/categorias/:id", getCategoriaById)
router.post("/categorias", createCategoria)
router.put("/categorias/:id", updateCategoria)
router.delete("/categorias/:id", deleteCategoria)

// ============ RUTAS MARCAS ============
router.get("/marcas", getAllMarcas)
router.get("/marcas/:id", getMarcaById)
router.post("/marcas", createMarca)
router.put("/marcas/:id", updateMarca)
router.delete("/marcas/:id", deleteMarca)

module.exports = router
