import { createStore } from 'vuex'
import { StoreState } from '../types'
import persistPlugin from './persistPlugin'

export default createStore<StoreState>({
  state: {
    tickets: [],
    cart: [],
  },
  mutations: {
    initialiseStore(state, persistedState: StoreState) {
      state.tickets = persistedState.tickets
      state.cart = persistedState.cart
    },
    addTickets(state, ticket) {
      state.tickets.unshift(ticket)
    },
    addToCart(state, ticket) {
      const existingTicket = state.cart.find((item) => item.id === ticket.id)
      if (existingTicket) {
        existingTicket.quantity = Math.max(
          0,
          existingTicket.quantity + ticket.quantity
        )
      } else {
        state.cart.push(ticket)
      }
    },
    removeFromCart(state, ticketID) {
      const ticket = state.cart.find((item) => item.id === ticketID)
      if (ticket) {
        state.cart = state.cart.filter((item) => item.id !== ticketID)
      }
    },
    updateTicket(state, updatedTicket) {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === updatedTicket.id
      )
      if (index !== -1) {
        state.tickets[index] = updatedTicket
      }

      const cartItem = state.cart.find((item) => item.id === updatedTicket.id)
      if (cartItem && cartItem.quantity > updatedTicket.quantity) {
        cartItem.quantity = updatedTicket.quantity
      }
    },
    deleteTicket(state, ticketId) {
      state.tickets = state.tickets.filter((ticket) => ticket.id !== ticketId)
      state.cart = state.cart.filter((ticket) => ticket.id !== ticketId)
    },
  },
  actions: {
    createTicket({ commit }, ticket) {
      ticket.id = crypto.randomUUID()
      commit('addTickets', ticket)
    },
    updateTicket({ commit, state }, ticket) {
      const index = state.tickets.findIndex((tick) => tick.id === ticket.id)

      if (index !== -1) {
        delete ticket.quantityToAdd
        delete ticket.availableQuantity
        commit('updateTicket', ticket)
      }
    },
    deleteTicket({ commit }, ticketID) {
      commit('deleteTicket', ticketID)
    },
    addToCart({ commit }, ticket) {
      const { quantity, id } = ticket

      commit('addToCart', { quantity: Math.max(0, quantity), id })
    },
    removeFromCart({ commit }, ticketID) {
      commit('removeFromCart', ticketID)
    },
  },
  getters: {
    tickets: (state) => state.tickets,
    cart: (state) => state.cart,
  },
  plugins: [persistPlugin],
})
