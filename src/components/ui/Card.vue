<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>
    
    <div v-if="image" class="relative">
      <img
        :src="image"
        :alt="imageAlt"
        class="w-full h-48 object-cover"
        :class="{ 'rounded-t-lg': !$slots.header }"
        loading="lazy"
      />
      <div v-if="$slots.overlay" class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        <div class="absolute bottom-4 left-4 right-4">
          <slot name="overlay" />
        </div>
      </div>
    </div>
    
    <div class="p-6">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hover?: boolean
  shadow?: 'sm' | 'md' | 'lg' | 'xl'
  image?: string
  imageAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  shadow: 'md'
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 overflow-hidden'
  
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
  
  const hoverClasses = props.hover 
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer'
    : ''
  
  return [
    baseClasses,
    shadowClasses[props.shadow],
    hoverClasses
  ].join(' ')
})
</script>