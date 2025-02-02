<template>
  <div class="max-w-3xl mx-auto p-6 shadow-lg bg-white rounded-lg">
    <h1 class="text-2xl font-semibold mb-4">Available Tickets</h1>

    <ul v-if="availableTickets.length" class="space-y-4">
      <TicketItem
        v-for="ticket in availableTickets"
        :key="ticket.id"
        :ticket="ticket"
        mode="home"
        @add-to-cart="addToCart"
      />
    </ul>

    <p v-else class="text-gray-500">No tickets available.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import TicketItem from '../components/TicketItem.vue'
import { Ticket as StoreTicket } from '../types'

const store = useStore()
type Ticket = StoreTicket & {
  quantityToAdd: number
  availableQuantity: number
}

const tickets = computed<Ticket[]>(() => store.getters.tickets)
const cart = computed<Ticket[]>(() => store.getters.cart)

const availableTickets = computed(() => {
  return tickets.value.map((ticket) => {
    // Find the quantity already in the cart
    const cartItem = cart.value.find(
      (cartItem: Ticket) => cartItem.id === ticket.id
    )
    const quantityInCart = cartItem ? cartItem.quantity : 0

    // Calculate available quantity for the ticket
    return {
      ...ticket,
      availableQuantity: ticket.quantity - quantityInCart,
      quantity: 0,
    }
  })
})

const addToCart = (ticket: Ticket) => {
  if (ticket.quantity > 0 && ticket.quantity <= ticket.availableQuantity) {
    store.dispatch('addToCart', { ...ticket, quantity: ticket.quantity })
    ticket.availableQuantity -= ticket.quantity
    ticket.quantity = 0
    alert(`${ticket.isVIP ? 'VIP: ' : ''}${ticket.name} added to cart!`)
  } else {
    alert('Please select a valid quantity')
  }
}
</script>
