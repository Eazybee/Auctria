<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="container mx-auto p-4">
    <Navigation />
    <main>
      <RouterView />
    </main>
  </div>
</template>
