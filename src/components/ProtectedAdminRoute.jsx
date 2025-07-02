import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedAdminRoute = ({ children }) => {
  const { isLoggedIn, usuario } = useAuthStore();

  // Si no está logueado, redirigir al home
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Si está logueado pero no es admin, redirigir a página de acceso denegado
  if (!usuario?.is_adm) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // Si está logueado y es admin, mostrar el contenido
  return children;
};

export default ProtectedAdminRoute;
