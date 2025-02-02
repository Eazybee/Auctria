<template>
  <li
    class="flex justify-between items-center p-4 rounded-md shadow-sm bg-gray-100"
  >
    <div class="pr- max-w-3/4">
      <div class="flex flex-row items-center space-x-2">
        <div
          v-if="ticket.isVIP"
          class="mt-2 text-xs font-semibold text-white bg-yellow-500 rounded-full px-2 py-1"
        >
          VIP
        </div>
        <strong
          class="text-lg font-semibold"
          :class="{ 'text-yellow-600': ticket.isVIP }"
        >
          {{ ticket.name }}
        </strong>
      </div>
      <p class="text-sm text-gray-600">{{ ticket.description }}</p>
      <p class="text-sm mt-1 text-gray-800 font-semibold">
        Price: ${{ ticket.price }}
      </p>
    </div>

    <div class="flex space-x-2 flex-col min-w-30">
      <p
        v-if="mode === 'home'"
        class="text-sm mb-1 text-gray-800 font-semibold"
      >
        Available: {{ ticket.availableQuantity }}
      </p>
      <p
        v-if="mode === 'cart'"
        class="text-sm mb-1 text-gray-800 font-semibold"
      >
        Quantity: {{ ticket.quantity }}
      </p>

      <div class="mr-0 flex flex-col" v-if="mode === 'home'">
        <input
          v-model.number="quantityToAdd"
          v-if="ticket.availableQuantity > 0"
          type="number"
          min="0"
          :max="ticket.availableQuantity"
          class="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          :disabled="ticket.availableQuantity === 0"
        />

        <Button
          text="Add to Cart"
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          focusColor="focus:ring-blue-500"
          @click="addToCart(ticket)"
          :disabled="
            quantityToAdd < 1 || quantityToAdd > ticket.availableQuantity
          "
          extraClass="mr-2"
        />
      </div>

      <p
        class="text-sm mb-1 text-gray-800 font-semibold"
        v-if="mode === 'admin'"
      >
        Available: {{ ticket.quantity }}
      </p>
      <div class="mr-0" v-if="mode === 'admin'">
        <Button
          text="Edit"
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          focusColor="focus:ring-blue-500"
          @click="$emit('edit-ticket', ticket)"
          extraClass="mr-2"
        />
        <Button
          text="Delete"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-600"
          focusColor="focus:ring-red-500"
          @click="$emit('delete-ticket', ticket.id)"
        />
      </div>

      <Button
        v-if="mode === 'cart'"
        text="Remove"
        bgColor="bg-red-500"
        hoverColor="hover:bg-red-600"
        focusColor="focus:ring-red-500"
        @click="$emit('remove-from-cart', ticket.id)"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Ticket } from '../types'
import Button from './Button.vue'

const props = defineProps<{
  ticket: Ticket
  mode: 'home' | 'admin' | 'cart'
}>()

const emit = defineEmits<{
  (event: 'add-to-cart', ticket: Ticket): void
  (event: 'edit-ticket', ticket: Ticket): void
  (event: 'delete-ticket', ticketId: string): void
  (event: 'remove-from-cart', ticketId: string): void
}>()

const addToCart = (ticket: Ticket) => {
  emit('add-to-cart', { ...ticket, quantity: quantityToAdd.value })
  quantityToAdd.value = 0
}

const quantityToAdd = ref(0)
</script>
