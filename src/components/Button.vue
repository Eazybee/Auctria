<template>
  <button
    :type="type"
    :class="[
      'px-4 py-2 rounded-md focus:ring-2 transition-all',
      bgColor,
      textColor,
      hoverColor,
      focusColor,
      disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : '',
      extraClass,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string
    text: string
    bgColor?: string
    textColor?: string
    hoverColor?: string
    focusColor?: string
    disabled?: boolean
    extraClass?: string
  }>(),
  {
    type: 'button',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    hoverColor: 'hover:bg-blue-600',
    focusColor: 'focus:ring-blue-500',
    disabled: false,
    extraClass: '',
  }
)

defineEmits(['click'])
</script>
