<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <FormInput
      label="Ticket Name"
      id="name"
      v-model="localTicket.name"
      placeholder="Enter ticket name"
    />

    <FormInput
      label="Price"
      id="price"
      type="number"
      min="0"
      v-model="localTicket.price"
      placeholder="Enter ticket price"
    />

    <FormInput
      label="Description"
      id="description"
      type="textarea"
      v-model="localTicket.description"
      placeholder="Describe the ticket"
    />

    <FormInput
      label="Quantity Available"
      id="quantity"
      type="number"
      min="0"
      v-model="localTicket.quantity"
      placeholder="Enter available quantity"
    />

    <FormInput
      label="VIP Ticket"
      id="vip"
      type="checkbox"
      v-model="localTicket.isVIP"
    />

    <div class="flex justify-between items-center">
      <Button
        type="submit"
        :text="isEditing ? 'Update Ticket' : 'Create Ticket'"
        bgColor="bg-blue-500"
        hoverColor="hover:bg-blue-600"
        focusColor="focus:ring-blue-500"
      />
      <Button
        text="Clear"
        bgColor="bg-gray-300"
        hoverColor="hover:bg-gray-400"
        focusColor="focus:ring-gray-500"
        @click="handleClear"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FormInput from './FormInput.vue'
import Button from './Button.vue'
import { Ticket } from '../types'

const props = defineProps<{
  initialTicket: Ticket
  isEditing: boolean
}>()

const emit = defineEmits<{
  (event: 'submit', ticket: Ticket): void
  (event: 'clear'): void
}>()

const localTicket = ref<Ticket>({ ...props.initialTicket })

const updateModelValue = (key: string | number) => (value: string | number) => {
  localTicket.value = { ...localTicket.value, [key]: value }
}
watch(
  () => props.initialTicket,
  (newTicket) => {
    localTicket.value = { ...newTicket }
  },
  { deep: true }
)

const handleSubmit = () => {
  emit('submit', localTicket.value)
}

const handleClear = () => {
  emit('clear')
}
</script>
