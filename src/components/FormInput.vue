<template>
  <div class="flex flex-col">
    <label :for="id" class="text-sm font-medium text-gray-700">{{
      label
    }}</label>

    <template v-if="type === 'textarea'">
      <textarea
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        required
      ></textarea>
    </template>

    <template v-else-if="type === 'checkbox'">
      <div class="flex items-center space-x-2">
        <input
          :id="id"
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          class="form-checkbox text-blue-500"
        />
      </div>
    </template>

    <template v-else>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :min="type === 'number' ? min : null"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        required
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    id: string
    type: string
    modelValue: string | number | boolean
    placeholder: string,
    min?: number
  }>(),
  {
    type: 'text',
  }
)

const emit = defineEmits(['update:modelValue'])
</script>
