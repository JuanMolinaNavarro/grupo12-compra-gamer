// Importaciones necesarias para el store de autenticación
import { create } from 'zustand' // Librería para manejo de estado global
import axios from 'axios' // Cliente HTTP para llamadas a la API

/**
 * Store global de autenticación usando Zustand
 * Maneja el estado del usuario logueado, login, registro y logout
 * Proporciona funciones y estado accesibles desde cualquier componente
 */
const useAuthStore = create((set, get) => ({
  // ============ ESTADO INICIAL ============
  
  // Información del usuario logueado (null si no está logueado)
  usuario: null,
  
  // Boolean que indica si el usuario está autenticado
  isLoggedIn: false,
  
  // Estado de carga para mostrar spinners durante operaciones asíncronas
  loading: false,
  
  // Mensajes de error para mostrar al usuario
  error: null,

  // ============ FUNCIONES DE AUTENTICACIÓN ============

  /**
   * Función para iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} contraseña - Contraseña del usuario
   * @returns {Object} - Objeto con success y message
   */
  login: async (email, contraseña) => {
    // Activar estado de carga y limpiar errores previos
    set({ loading: true, error: null })
    
    try {
      // Realizar llamada POST al endpoint de login
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        contraseña
      })
      
      // Si el login fue exitoso
      if (response.data.success) {
        // Actualizar estado global con datos del usuario
        set({ 
          usuario: response.data.usuario, // Datos del usuario desde el backend
          isLoggedIn: true, // Marcar como logueado
          loading: false, // Desactivar carga
          error: null // Limpiar errores
        })
        // Retornar respuesta exitosa
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      // Manejar errores de la API o de red
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
      
      // Actualizar estado con error y resetear datos de usuario
      set({ 
        loading: false, // Desactivar carga
        error: errorMessage, // Guardar mensaje de error
        usuario: null, // Limpiar datos de usuario
        isLoggedIn: false // Marcar como no logueado
      })
      
      // Retornar respuesta de error
      return { success: false, message: errorMessage }
    }
  },

  /**
   * Función para registrar un nuevo usuario
   * @param {string} nombre - Nombre del usuario
   * @param {string} apellido - Apellido del usuario
   * @param {string} email - Email del usuario
   * @param {string} contraseña - Contraseña del usuario
   * @param {string} telefono - Teléfono del usuario
   * @returns {Object} - Objeto con success y message
   */
  register: async (nombre, apellido, email, contraseña, telefono) => {
    // Activar estado de carga y limpiar errores previos
    set({ loading: true, error: null })
    
    try {
      // Realizar llamada POST al endpoint de registro
      const response = await axios.post('http://localhost:8000/auth/register', {
        nombre,
        apellido,
        email,
        contraseña,
        telefono
      })
      
      // Si el registro fue exitoso
      if (response.data.success) {
        // Actualizar estado global con datos del nuevo usuario
        set({ 
          usuario: response.data.usuario, // Datos del usuario registrado
          isLoggedIn: true, // Marcar como logueado automáticamente
          loading: false, // Desactivar carga
          error: null // Limpiar errores
        })
        // Retornar respuesta exitosa
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      // Manejar errores de registro
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario'
      
      // Actualizar estado con error
      set({ 
        loading: false, // Desactivar carga
        error: errorMessage, // Guardar mensaje de error
        usuario: null, // Limpiar datos de usuario
        isLoggedIn: false // Marcar como no logueado
      })
      
      // Retornar respuesta de error
      return { success: false, message: errorMessage }
    }
  },

  /**
   * Función para cerrar sesión del usuario
   * Limpia todos los datos del usuario del estado global
   */
  logout: async () => {
    // Activar estado de carga
    set({ loading: true })
    
    try {
      // Intentar llamar al endpoint de logout (opcional)
      await axios.post('http://localhost:8000/auth/logout')
      
      // Limpiar completamente el estado de autenticación
      set({ 
        usuario: null, // Eliminar datos del usuario
        isLoggedIn: false, // Marcar como no logueado
        loading: false, // Desactivar carga
        error: null // Limpiar errores
      })
      
      // Retornar respuesta exitosa
      return { success: true, message: 'Sesión cerrada exitosamente' }
    } catch (error) {
      // Incluso si falla la llamada al servidor, limpiar estado local
      set({ loading: false })
      return { success: false, message: 'Error al cerrar sesión' }
    }
  },

  /**
   * Función para limpiar mensajes de error del estado
   * Útil para limpiar errores después de mostrarlos al usuario
   */
  clearError: () => set({ error: null })
}))

// Exportar el store para uso en componentes
export default useAuthStore
