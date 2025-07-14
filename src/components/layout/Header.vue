<template>
  <header class="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 header-container">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
      <div class="flex justify-between items-center h-16 header-content">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center group">
            <img 
              src="/logo.webp" 
              alt="Gau Samwardhan Ashram - Gau Mandir"
              class="h-12 w-auto group-hover:scale-105 transition-transform duration-300 logo-image"
              width="120"
              height="48"
              style="aspect-ratio: 120/48; object-fit: contain;"
              loading="eager"
              decoding="sync"
            />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md hover:bg-primary-50 hover:text-primary-700"
              :class="$route.path === item.path ? 'text-primary-700 bg-primary-50' : 'text-gray-700'"
            >
              {{ t(`navigation.${item.key}`) }}
            </router-link>
          </div>
        </div>

        <!-- Language Selector & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <select
              :value="locale"
              @change="handleLanguageChange"
              class="appearance-none bg-transparent border border-primary-200 rounded-md px-3 py-1 text-sm text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded="false"
            aria-label="Toggle mobile menu"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="block h-6 w-6" />
            <XMarkIcon v-else class="block h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-full opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-full opacity-0"
      >
        <div v-show="mobileMenuOpen" ref="mobileMenu" class="md:hidden bg-white border-t border-gray-200">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              :class="$route.path === item.path ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'"
            >
              {{ t(`navigation.${item.key}`) }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useI18n } from '../../composables/useI18n'

const { t, locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)
const mobileMenu = ref<HTMLElement | null>(null)

const navigationItems = [
  { key: 'initiatives', path: '/initiatives' },
  { key: 'healing', path: '/healing' },
  { key: 'education', path: '/education' },
  { key: 'volunteer', path: '/volunteer' },
  { key: 'blog', path: '/blog' },
  { key: 'donate', path: '/donate' }
]

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setLocale(target.value)
}

// Close mobile menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  const header = target.closest('header')
  
  // Don't close if clicking within the header or on the menu button
  if (header || target.closest('[aria-label="Toggle mobile menu"]')) {
    return
  }
  
  // Close menu if clicking outside
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
})
</script>