<template>
  <nav class="flex justify-between p-4 bg-gray-800 text-white">
    <div class="text-lg">Ticketing App</div>
    <div>
      <RouterLink to="/" class="mr-4">Home</RouterLink>
      <RouterLink to="/admin" class="mr-4">Admin</RouterLink>
      <RouterLink to="/cart">
        <Button
          :text="`Cart (${cartCount})`"
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          focusColor="focus:ring-blue-500"
        />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Button from './Button.vue'

const store = useStore()
const cartCount = computed(() => {
  const cart = store.getters.cart
  return cart ? cart.length : 0
})
</script>
