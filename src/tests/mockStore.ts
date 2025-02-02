import { createStore } from 'vuex'
import { StoreState } from '../types'

export const createMockStore = (
  state: Partial<StoreState> = {},
  actions?: any
) => {
  return createStore({
    state() {
      return { tickets: [], cart: [], ...state }
    },
    getters: {
      tickets: (state) => state.tickets,
      cart: (state) => state.cart,
    },
    actions: {
      addToCart: jest.fn(),
      ...actions,
    },
  })
}
