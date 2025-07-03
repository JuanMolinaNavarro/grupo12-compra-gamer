// Importación de Zustand para manejo de estado global
import { create } from 'zustand'

/**
 * Store global del carrito de compras usando Zustand
 * Maneja la lista de productos, cantidades, totales y persistencia en localStorage
 * Proporciona funciones para agregar, eliminar y modificar productos del carrito
 */
const useCartStore = create((set, get) => ({
  // ============ ESTADO INICIAL ============
  
  // Array de productos en el carrito, inicializado desde localStorage si existe
  items: JSON.parse(localStorage.getItem('cart-items') || '[]'),
  
  // Total monetario del carrito
  total: 0,

  // ============ FUNCIONES DEL CARRITO ============

  /**
   * Función para agregar un producto al carrito
   * Si el producto ya existe, aumenta la cantidad en 1
   * Si no existe, lo agrega con cantidad 1
   * @param {Object} producto - Objeto producto con id_producto, precio, nombre, etc.
   */
  addToCart: (producto) => {
    const { items } = get() // Obtener items actuales del estado
    
    // Buscar si el producto ya existe en el carrito
    const existingItem = items.find(item => item.id_producto === producto.id_producto)
    
    let newItems;
    if (existingItem) {
      // Si ya existe, aumentar cantidad en 1
      newItems = items.map(item =>
        item.id_producto === producto.id_producto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    } else {
      // Si no existe, agregar nuevo producto con cantidad 1
      newItems = [...items, { ...producto, cantidad: 1 }]
    }
    
    // Actualizar estado del store
    set({ items: newItems })
    
    // Persistir en localStorage para mantener carrito entre sesiones
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    
    // Recalcular total después de agregar
    get().updateTotal()
  },

  /**
   * Función para remover completamente un producto del carrito
   * @param {number} id_producto - ID del producto a eliminar
   */
  removeFromCart: (id_producto) => {
    // Filtrar items removiendo el producto especificado
    const newItems = get().items.filter(item => item.id_producto !== id_producto)
    
    // Actualizar estado
    set({ items: newItems })
    
    // Actualizar localStorage
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    
    // Recalcular total
    get().updateTotal()
  },

  /**
   * Función para actualizar la cantidad de un producto específico
   * Si la cantidad es 0 o menor, elimina el producto del carrito
   * @param {number} id_producto - ID del producto a modificar
   * @param {number} cantidad - Nueva cantidad
   */
  updateQuantity: (id_producto, cantidad) => {
    // Si la cantidad es 0 o negativa, eliminar producto
    if (cantidad <= 0) {
      get().removeFromCart(id_producto)
      return
    }
    
    // Actualizar cantidad del producto específico
    const newItems = get().items.map(item =>
      item.id_producto === id_producto
        ? { ...item, cantidad }
        : item
    )
    
    // Actualizar estado
    set({ items: newItems })
    
    // Actualizar localStorage
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    
    // Recalcular total
    get().updateTotal()
  },

  /**
   * Función para recalcular el total monetario del carrito
   * Suma el precio por cantidad de todos los productos
   * Se ejecuta automáticamente después de cada modificación del carrito
   */
  updateTotal: () => {
    const { items } = get() // Obtener items actuales
    
    // Calcular total: suma de (precio × cantidad) de todos los items
    const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    
    // Actualizar estado con el nuevo total
    set({ total })
  },

  /**
   * Función para vaciar completamente el carrito
   * Elimina todos los productos y resetea el total a 0
   * También limpia el localStorage
   */
  clearCart: () => {
    // Resetear estado a valores iniciales
    set({ items: [], total: 0 })
    
    // Eliminar datos del localStorage
    localStorage.removeItem('cart-items')
  },

  /**
   * Función para obtener la cantidad total de productos en el carrito
   * Suma todas las cantidades individuales de todos los productos
   * @returns {number} - Número total de items en el carrito
   */
  getTotalItems: () => {
    const { items } = get() // Obtener items actuales
    
    // Sumar todas las cantidades de todos los productos
    return items.reduce((sum, item) => sum + item.cantidad, 0)
  },

  /**
   * Función para inicializar el total cuando se carga el store
   * Útil para recalcular el total cuando se carga la aplicación
   * y los items vienen del localStorage
   */
  initializeTotal: () => {
    get().updateTotal() // Llamar a updateTotal para calcular el total inicial
  }
}))

// Exportar el store para uso en componentes
export default useCartStore
