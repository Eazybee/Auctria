<template>
  <div class="max-w-3xl mx-auto p-6 shadow-lg bg-white rounded-lg">
    <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>

    <ul v-if="cart.length" class="space-y-4">
      <TicketItem
        v-for="ticket in cart"
        :key="ticket.id"
        :ticket="ticket"
        mode="cart"
        @remove-from-cart="removeFromCart"
      />
      <div class="flex justify-start">
        <Button
          text="Checkout"
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          focusColor="focus:ring-blue-500"
          @click="checkout"
        />
      </div>
    </ul>
    

    <p v-else class="text-gray-500">Your cart is empty.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Tickets, StoreState } from '../types'
import TicketItem from '../components/TicketItem.vue'
import Button from '../components/Button.vue'

const store = useStore<StoreState>()
const tickets = computed<Tickets>(() => store.getters.tickets)
const storeCart = computed<Tickets>(() => store.getters.cart)

const cart = computed<Tickets>(() => {
  return storeCart.value
    .map((cartItem: any) => {
      const ticket = tickets.value.find(
        (ticket: any) => ticket.id === cartItem.id
      )
      if (!ticket) return null
      return {
        ...ticket,
        quantity: cartItem.quantity,
      }
    })
    .filter((ticket: any) => ticket !== null) as Tickets
})

const removeFromCart = (ticketId: string) => {
  store.dispatch('removeFromCart', ticketId)
}

const checkout = () => {
  alert('Proceeding to checkout...')
  // Add further checkout logic here
}
</script>
