// Importaciones necesarias para el store de productos
import { create } from 'zustand'; // Librería para manejo de estado global
import axios from 'axios'; // Cliente HTTP para llamadas a la API

/**
 * Store global de productos usando Zustand
 * Maneja la lista de productos, búsquedas, estados de carga y errores
 * Proporciona funciones para buscar productos y obtener el catálogo completo
 */
const useProductStore = create((set, get) => ({
  // ============ ESTADO INICIAL ============
  
  // Array de productos obtenidos de la API
  productos: [],
  
  // Término de búsqueda actual
  searchQuery: '',
  
  // Boolean que indica si estamos en modo búsqueda activa
  isSearching: false,
  
  // Estado de carga para mostrar spinners durante llamadas a la API
  loading: false,
  
  // Mensajes de error para mostrar al usuario
  error: null,

  // ============ FUNCIONES DE GESTIÓN ============

  /**
   * Función para establecer el término de búsqueda
   * @param {string} query - Término de búsqueda
   */
  setSearchQuery: (query) => set({ searchQuery: query }),

  /**
   * Función para buscar productos por nombre en la API
   * Si no hay query, obtiene todos los productos
   * @param {string} query - Término de búsqueda
   */
  searchProducts: async (query) => {
    // Si no hay término de búsqueda, obtener todos los productos
    if (!query.trim()) {
      get().getAllProducts();
      return;
    }

    // Activar estados de carga y búsqueda
    set({ loading: true, error: null, isSearching: true, searchQuery: query });
    
    try {
      // Realizar llamada GET al endpoint de búsqueda con query parameter
      const response = await axios.get(`http://localhost:8000/productos/search?q=${encodeURIComponent(query)}`);
      
      // Actualizar estado con resultados de búsqueda
      set({ 
        productos: response.data, // Productos encontrados
        loading: false, // Desactivar carga
        isSearching: true // Mantener modo búsqueda activo
      });
    } catch (error) {
      // Manejar errores de la API
      set({ 
        error: 'Error al buscar productos', // Mensaje de error genérico
        loading: false, // Desactivar carga
        productos: [] // Limpiar productos en caso de error
      });
      console.error('Error al buscar productos:', error);
    }
  },

  /**
   * Función para obtener todos los productos del catálogo
   * Desactiva el modo búsqueda y carga el catálogo completo
   */
  getAllProducts: async () => {
    // Activar carga y desactivar modo búsqueda
    set({ loading: true, error: null, isSearching: false });
    
    try {
      // Realizar llamada GET al endpoint de todos los productos
      const response = await axios.get('http://localhost:8000/productos');
      
      // Actualizar estado con todos los productos
      set({ 
        productos: response.data, // Catálogo completo
        loading: false, // Desactivar carga
        searchQuery: '' // Limpiar término de búsqueda
      });
    } catch (error) {
      // Manejar errores de la API
      set({ 
        error: 'Error al cargar productos', // Mensaje de error
        loading: false, // Desactivar carga
        productos: [] // Limpiar productos en caso de error
      });
      console.error('Error al cargar productos:', error);
    }
  },

  /**
   * Función para limpiar la búsqueda y volver al catálogo completo
   * Útil cuando se quiere salir del modo búsqueda
   */
  clearSearch: () => {
    // Limpiar estado de búsqueda
    set({ searchQuery: '', isSearching: false });
    
    // Cargar todos los productos
    get().getAllProducts();
  },
}));

// Exportar el store para uso en componentes
export default useProductStore;
