import { create } from 'zustand'
import axios from 'axios'

const useAuthStore = create((set, get) => ({
  // Estado inicial
  usuario: null,
  isLoggedIn: false,
  loading: false,
  error: null,

  // Función para iniciar sesión
  login: async (email, contraseña) => {
    set({ loading: true, error: null })
    
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        contraseña
      })
      
      if (response.data.success) {
        set({ 
          usuario: response.data.usuario,
          isLoggedIn: true,
          loading: false,
          error: null
        })
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
      set({ 
        loading: false, 
        error: errorMessage,
        usuario: null,
        isLoggedIn: false
      })
      return { success: false, message: errorMessage }
    }
  },

  // Función para registrar usuario
  register: async (nombre, apellido, email, contraseña, telefono) => {
    set({ loading: true, error: null })
    
    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        nombre,
        apellido,
        email,
        contraseña,
        telefono
      })
      
      if (response.data.success) {
        set({ 
          usuario: response.data.usuario,
          isLoggedIn: true,
          loading: false,
          error: null
        })
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario'
      set({ 
        loading: false, 
        error: errorMessage,
        usuario: null,
        isLoggedIn: false
      })
      return { success: false, message: errorMessage }
    }
  },

  // Función para cerrar sesión
  logout: async () => {
    set({ loading: true })
    
    try {
      await axios.post('http://localhost:8000/auth/logout')
      set({ 
        usuario: null,
        isLoggedIn: false,
        loading: false,
        error: null
      })
      return { success: true, message: 'Sesión cerrada exitosamente' }
    } catch (error) {
      set({ loading: false })
      return { success: false, message: 'Error al cerrar sesión' }
    }
  },

  // Función para limpiar errores
  clearError: () => set({ error: null })
}))

export default useAuthStore
