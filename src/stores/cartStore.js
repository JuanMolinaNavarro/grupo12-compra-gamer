import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  // Estado inicial
  items: JSON.parse(localStorage.getItem('cart-items') || '[]'),
  total: 0,

  // Agregar producto al carrito
  addToCart: (producto) => {
    const { items } = get()
    const existingItem = items.find(item => item.id_producto === producto.id_producto)
    
    let newItems;
    if (existingItem) {
      // Si ya existe, aumentar cantidad
      newItems = items.map(item =>
        item.id_producto === producto.id_producto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    } else {
      // Si no existe, agregar nuevo
      newItems = [...items, { ...producto, cantidad: 1 }]
    }
    
    set({ items: newItems })
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    
    // Actualizar total
    get().updateTotal()
  },

  // Remover producto del carrito
  removeFromCart: (id_producto) => {
    const newItems = get().items.filter(item => item.id_producto !== id_producto)
    set({ items: newItems })
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    get().updateTotal()
  },

  // Actualizar cantidad de un producto
  updateQuantity: (id_producto, cantidad) => {
    if (cantidad <= 0) {
      get().removeFromCart(id_producto)
      return
    }
    
    const newItems = get().items.map(item =>
      item.id_producto === id_producto
        ? { ...item, cantidad }
        : item
    )
    
    set({ items: newItems })
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    get().updateTotal()
  },

  // Actualizar total
  updateTotal: () => {
    const { items } = get()
    const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    set({ total })
  },

  // Limpiar carrito
  clearCart: () => {
    set({ items: [], total: 0 })
    localStorage.removeItem('cart-items')
  },

  // Obtener cantidad total de items
  getTotalItems: () => {
    const { items } = get()
    return items.reduce((sum, item) => sum + item.cantidad, 0)
  },

  // Inicializar el total cuando se carga el store
  initializeTotal: () => {
    get().updateTotal()
  }
}))

export default useCartStore
