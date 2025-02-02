<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">
      Create or Edit Ticket
    </h1>
    <TicketForm
      :initialTicket="ticket"
      :isEditing="isEditing"
      @submit="submitForm"
      @clear="clearForm"
    />

    <div class="mt-24">
      <h2 class="text-xl font-semibold text-gray-700">Existing Tickets</h2>
      <ul class="space-y-4 mt-4">
        <TicketItem
          v-for="existingTicket in tickets"
          :key="existingTicket.id"
          :ticket="existingTicket"
          mode="admin"
          @edit-ticket="editTicket"
          @delete-ticket="deleteTicket"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import TicketForm from '../components/TicketForm.vue'
import TicketItem from '../components/TicketItem.vue'
import { Ticket, Tickets } from '../types'

const store = useStore()
const tickets = computed<Tickets>(() => store.getters.tickets)

const ticket = ref<Ticket>({
  id: '',
  name: '',
  price: '',
  description: '',
  isVIP: false,
  quantity: 0,
})

const isEditing = ref(false)

const submitForm = (newTicket: Ticket) => {
  if (isEditing.value) {
    store.dispatch('updateTicket', newTicket)
  } else {
    store.dispatch('createTicket', newTicket)
  }
  clearForm()
}

const clearForm = () => {
  ticket.value = {
    id: '',
    name: '',
    price: '',
    description: '',
    isVIP: false,
    quantity: 0,
  }
  isEditing.value = false
}

const editTicket = (existingTicket: Ticket) => {
  ticket.value = { ...existingTicket }
  isEditing.value = true
}

const deleteTicket = (ticketID: string) => {
  store.dispatch('deleteTicket', ticketID)
}
</script>
