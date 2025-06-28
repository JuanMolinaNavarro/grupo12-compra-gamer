const { connection } = require("../config/database");

const getAllProducts = (req, res) => {
  const query = "SELECT * FROM productos";

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getOneProduct = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM productos WHERE id_producto=?";

  connection.query(query, [id], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      res.status(404).send({ message: "Producto inexistente." });
    } else {
      res.json(results);
    }
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM productos WHERE id_producto=?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar el producto", details: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.status(200).send({ message: "Producto eliminado con exito." });
  });
};

const updateProduct = (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const precio = req.body.precio;
  const stock = req.body.stock;
  const imagen_url = req.body.imagen_url;
  const id = req.params.id;

  const query =
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ? WHERE id_producto = ?";

  connection.query(
    query,
    [nombre, descripcion, precio, stock, imagen_url, id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({
            error: "Error al actualizar el producto",
            details: err.message,
          });
      }

      res.status(200).send({ message: "Producto actualizado correctamente." });
    }
  );
};

const createProduct = (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria,
    id_marca,
    imagen_url,
  } = req.body;

  const query =
    "INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, id_marca, imagen_url) VALUES (?,?,?,?,?,?,?)";

  connection.query(
    query,
    [nombre, descripcion, precio, stock, id_categoria, id_marca, imagen_url],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al crear el producto", details: err.message });
      }

      res.status(201).send({ message: "Producto creado correctamente." });
    }
  );
};

const getProductosConCategoria = (req, res) => {
  const { id_categoria } = req.params;

  const query = `
        SELECT p.*, c.nombre AS categoria
        FROM productos p
        JOIN categorias c ON p.id_categoria = c.id_categoria
        WHERE p.id_categoria = ?;
    `;

  connection.query(query, [id_categoria], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getProductosConCategoria,
};
