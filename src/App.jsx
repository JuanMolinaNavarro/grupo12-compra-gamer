import { Route, Routes } from "react-router-dom";
import "./App.css";
import ArmaTuPC from "./pages/ArmaTuPC";
import Home from "./pages/Home";
import Notebooks from "./pages/Notebooks";
import Productos from "./pages/Productos";
import Ayuda from "./pages/Ayuda";
import ProductosCategoria from "./pages/ProductosCategoria";
import ProductoMostrar from "./pages/ProductoMostrar";
import Admin from "./pages/Admin";
import AdminPagos from "./pages/AdminPagos";
import AdminMarcas from "./pages/AdminMarcas";
import AdminCategorias from "./pages/AdminCategorias";
import Carrito from "./pages/Carrito";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AccesoDenegado from "./pages/AccesoDenegado";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/productos" element={<Productos />} />

        <Route path="/armarpc" element={<ArmaTuPC />} />

        <Route path="/ayuda" element={<Ayuda />} />

        <Route path="/carrito" element={<Carrito />} />

        <Route
          path="/productos/categoria/:id_categoria"
          element={<ProductosCategoria />}
        />

        <Route
          path="/productos/mostrar/:id_producto"
          element={<ProductoMostrar />}
        />

        {/* Rutas protegidas de administración */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/pagos"
          element={
            <ProtectedAdminRoute>
              <AdminPagos />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/marcas"
          element={
            <ProtectedAdminRoute>
              <AdminMarcas />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/categorias"
          element={
            <ProtectedAdminRoute>
              <AdminCategorias />
            </ProtectedAdminRoute>
          }
        />

        {/* Página de acceso denegado */}
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />

        {/* Página 404 para rutas no encontradas */}
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
    </>
  );
}

export default App;
