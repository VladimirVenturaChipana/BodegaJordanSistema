import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  // Al agregar, por defecto el producto está seleccionado (checked: true)
  addToCart: (product, quantity) => set((state) => {
    const existingProduct = state.cart.find(item => item.id === product.id);
    if (existingProduct) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity, checked: true }] };
  }),

  // Función para alternar el checkbox
  toggleItem: (id) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
  })),

  updateQuantity: (id, newQuantity) => set((state) => ({
    cart: state.cart
      .map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
      .filter(item => item.quantity > 0)
  })),

  // Los cálculos ahora filtran solo los marcados (checked === true)
  getSubtotal: () => get().cart
    .filter(item => item.checked)
    .reduce((acc, item) => acc + (Number(item.finalPrice) * item.quantity), 0),

  getTotalDescuentos: () => get().cart
    .filter(item => item.checked && item.discount)
    .reduce((acc, item) => {
      const desc = (Number(item.oldPrice) * (Number(item.discount) / 100)) * item.quantity;
      return acc + desc;
    }, 0),
}));