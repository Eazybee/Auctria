import { MutationPayload, Store } from 'vuex'
import { StoreState } from '../types'
import mockData from './mockData'

const persistPlugin = (store: Store<StoreState>) => {
  // Load persisted state from localStorage when Vuex initializes
  const localTickets = localStorage.getItem('tickets')
  const localCart = localStorage.getItem('cart')

  const storedTickets = localTickets ? JSON.parse(localTickets) : mockData
  const storedCart = localCart ? JSON.parse(localCart) : []

  // Commit mutations to update state on reload
  store.commit('initialiseStore', { tickets: storedTickets, cart: storedCart })

  // Watch for state changes and persist them automatically
  store.subscribe((mutation: MutationPayload, state) => {
    localStorage.setItem('tickets', JSON.stringify(state.tickets))
    localStorage.setItem('cart', JSON.stringify(state.cart))
  })
}

export default persistPlugin
