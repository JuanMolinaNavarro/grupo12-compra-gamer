import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set, get) => ({
  // Estados
  productos: [],
  searchQuery: '',
  isSearching: false,
  loading: false,
  error: null,

  // Acciones
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Buscar productos
  searchProducts: async (query) => {
    if (!query.trim()) {
      // Si no hay query, obtener todos los productos
      get().getAllProducts();
      return;
    }

    set({ loading: true, error: null, isSearching: true, searchQuery: query });
    
    try {
      const response = await axios.get(`http://localhost:8000/productos/search?q=${encodeURIComponent(query)}`);
      set({ 
        productos: response.data, 
        loading: false, 
        isSearching: true 
      });
    } catch (error) {
      set({ 
        error: 'Error al buscar productos', 
        loading: false,
        productos: []
      });
      console.error('Error al buscar productos:', error);
    }
  },

  // Obtener todos los productos
  getAllProducts: async () => {
    set({ loading: true, error: null, isSearching: false });
    
    try {
      const response = await axios.get('http://localhost:8000/productos');
      set({ 
        productos: response.data, 
        loading: false,
        searchQuery: ''
      });
    } catch (error) {
      set({ 
        error: 'Error al cargar productos', 
        loading: false,
        productos: []
      });
      console.error('Error al cargar productos:', error);
    }
  },

  // Limpiar búsqueda
  clearSearch: () => {
    set({ searchQuery: '', isSearching: false });
    get().getAllProducts();
  },
}));

export default useProductStore;
