import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

export interface ICartState {
  items: IGood[]
  checkedIds: number[]
}

export const useCartStore = defineStore('cart', () => {
  const state = reactive({
    items: [],
    checkedIds: [],
  })
  const total = computed(() => state.items.reduce((p, v) => p + v.cartCount , 0 ))
  const totalPrice = computed(() => state.items.reduce((p, v) => p + v.price * v.cartCount , 0 ).toFixed(2))
  const totalOldPrice = computed(() => state.items.reduce((p, v) => p + v.oldPrice * v.cartCount , 0 ).toFixed(2))
  const isAllChecked = computed(() => state.items.length === state.checkedIds.length)

  const cartCountById = (id: number ) => {
    return state.items.find((v) => v.id === id)?.cartCount
  }

  const pushProductToCart = (item: IGood) => {
    const cartItem = state.items.find((v) => v.id === item.id)
    if (cartItem) {
      cartItem.cartCount ++
      return
    }
    item.cartCount = 1
    state.items.push(item)
  }
  return {
    state,
    totatl,
    totalPrice,
    totalOldPrice,
    isAllChecked,
    cartCountById,
    pushProductToCart,
    removeProductFromCart,
    setCartItems,
    setCheckedIds,
    toggleAllChecked,
  }
})
