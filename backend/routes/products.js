const express = require("express")
const { getAllProducts, getOneProduct, deleteProduct, updateProduct, createProduct, getProductosConCategoria, searchProducts } = require("../controllers/products")

const router = express.Router()

router.get("/productos/search", searchProducts)
router.get("/productos",getAllProducts)
router.get("/productos/:id",getOneProduct)
router.get("/productos/categoria/:id_categoria",getProductosConCategoria)
router.delete("/productos/eliminar/:id",deleteProduct)
router.put("/productos/editar/:id",updateProduct)
router.post("/productos/crear",createProduct)

module.exports = router