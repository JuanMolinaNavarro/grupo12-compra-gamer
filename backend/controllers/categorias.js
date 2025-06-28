const { connection } = require("../config/database")

// ============ CATEGORÍAS ============

// Obtener todas las categorías
const getAllCategorias = (req, res) => {
  const query = "SELECT * FROM categorias ORDER BY nombre"
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener categorías" })
    }
    res.json(results)
  })
}

// Obtener categoría por ID
const getCategoriaById = (req, res) => {
  const { id } = req.params
  const query = "SELECT * FROM categorias WHERE id = ?"
  
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener categoría" })
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }
    res.json(results[0])
  })
}

// Crear nueva categoría
const createCategoria = (req, res) => {
  const { nombre, descripcion } = req.body
  
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es requerido" })
  }
  
  const query = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)"
  
  connection.query(query, [nombre, descripcion || null], (err, results) => {
    if (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Ya existe una categoría con ese nombre" })
      }
      return res.status(500).json({ error: "Error al crear categoría" })
    }
    res.status(201).json({ 
      id: results.insertId, 
      nombre, 
      descripcion,
      message: "Categoría creada exitosamente" 
    })
  })
}

// Actualizar categoría
const updateCategoria = (req, res) => {
  const { id } = req.params
  const { nombre, descripcion } = req.body
  
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es requerido" })
  }
  
  const query = "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?"
  
  connection.query(query, [nombre, descripcion || null, id], (err, results) => {
    if (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Ya existe una categoría con ese nombre" })
      }
      return res.status(500).json({ error: "Error al actualizar categoría" })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }
    res.json({ message: "Categoría actualizada exitosamente" })
  })
}

// Eliminar categoría
const deleteCategoria = (req, res) => {
  const { id } = req.params
  
  // Verificar si hay productos usando esta categoría
  const checkQuery = "SELECT COUNT(*) as count FROM productos WHERE categoria_id = ?"
  
  connection.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al verificar categoría" })
    }
    
    if (results[0].count > 0) {
      return res.status(400).json({ 
        error: "No se puede eliminar la categoría porque tiene productos asociados" 
      })
    }
    
    const deleteQuery = "DELETE FROM categorias WHERE id = ?"
    
    connection.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: "Error al eliminar categoría" })
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Categoría no encontrada" })
      }
      res.json({ message: "Categoría eliminada exitosamente" })
    })
  })
}

// ============ MARCAS ============

// Obtener todas las marcas
const getAllMarcas = (req, res) => {
  const query = "SELECT * FROM marcas ORDER BY nombre"
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener marcas" })
    }
    res.json(results)
  })
}

// Obtener marca por ID
const getMarcaById = (req, res) => {
  const { id } = req.params
  const query = "SELECT * FROM marcas WHERE id = ?"
  
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al obtener marca" })
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Marca no encontrada" })
    }
    res.json(results[0])
  })
}

// Crear nueva marca
const createMarca = (req, res) => {
  const { nombre, descripcion } = req.body
  
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es requerido" })
  }
  
  const query = "INSERT INTO marcas (nombre, descripcion) VALUES (?, ?)"
  
  connection.query(query, [nombre, descripcion || null], (err, results) => {
    if (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Ya existe una marca con ese nombre" })
      }
      return res.status(500).json({ error: "Error al crear marca" })
    }
    res.status(201).json({ 
      id: results.insertId, 
      nombre, 
      descripcion,
      message: "Marca creada exitosamente" 
    })
  })
}

// Actualizar marca
const updateMarca = (req, res) => {
  const { id } = req.params
  const { nombre, descripcion } = req.body
  
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es requerido" })
  }
  
  const query = "UPDATE marcas SET nombre = ?, descripcion = ? WHERE id = ?"
  
  connection.query(query, [nombre, descripcion || null, id], (err, results) => {
    if (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Ya existe una marca con ese nombre" })
      }
      return res.status(500).json({ error: "Error al actualizar marca" })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Marca no encontrada" })
    }
    res.json({ message: "Marca actualizada exitosamente" })
  })
}

// Eliminar marca
const deleteMarca = (req, res) => {
  const { id } = req.params
  
  // Verificar si hay productos usando esta marca
  const checkQuery = "SELECT COUNT(*) as count FROM productos WHERE marca_id = ?"
  
  connection.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Error al verificar marca" })
    }
    
    if (results[0].count > 0) {
      return res.status(400).json({ 
        error: "No se puede eliminar la marca porque tiene productos asociados" 
      })
    }
    
    const deleteQuery = "DELETE FROM marcas WHERE id = ?"
    
    connection.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: "Error al eliminar marca" })
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Marca no encontrada" })
      }
      res.json({ message: "Marca eliminada exitosamente" })
    })
  })
}

module.exports = {
  // Categorías
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  // Marcas
  getAllMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca
}
