import { Route, Routes } from "react-router-dom";
import "./App.css";
import ArmaTuPC from "./pages/ArmaTuPC";
import Home from "./pages/Home";
import Notebooks from "./pages/Notebooks";
import Productos from "./pages/Productos";
import Ayuda from "./pages/Ayuda";
import ProductosCategoria from "./pages/ProductosCategoria";
import ProductoMostrar from "./pages/ProductoMostrar";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/productos" element={<Productos/>}/>

        <Route path="/armarpc" element={<ArmaTuPC/>} />

        <Route path="/ayuda" element={<Ayuda/>} />

        <Route path="/productos/categoria/:id_categoria" element={<ProductosCategoria/>} />

        <Route path="/productos/mostrar/:id_producto" element={<ProductoMostrar/>} />

      </Routes>
    </>
  );
}

export default App;
