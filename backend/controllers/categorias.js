const { connection } = require("../config/database")

// Obtener todas las categorías
const getAllCategorias = (req, res) => {
  const query = "SELECT * FROM categorias"
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener categorías" })
    }
    res.json(results)
  })
}

// Obtener todas las marcas
const getAllMarcas = (req, res) => {
  const query = "SELECT * FROM marcas"
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener marcas" })
    }
    res.json(results)
  })
}

module.exports = {
  getAllCategorias,
  getAllMarcas
}
