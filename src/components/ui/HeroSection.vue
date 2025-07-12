<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/gau-background.webp"
        alt="Indigenous cows in natural setting"
        class="w-full h-full object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          {{ t('hero.title') }}
        </h1>
        <p class="text-xl sm:text-2xl text-accent-200 font-light mb-4">
          {{ t('hero.subtitle') }}
        </p>
        <p class="text-lg text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          {{ t('hero.description') }}
        </p>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div class="text-2xl font-bold text-white">100+</div>
            <div class="text-sm text-gray-200">Acres Revived</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div class="text-2xl font-bold text-white">197+</div>
            <div class="text-sm text-gray-200">Bulls Distributed</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div class="text-2xl font-bold text-white">1000+</div>
            <div class="text-sm text-gray-200">Women Trained</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div class="text-2xl font-bold text-white">290ft</div>
            <div class="text-sm text-gray-200">Water Table Rise</div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24 sm:mb-0">
          <router-link
            to="/volunteer"
            class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            {{ t('hero.cta') }}
          </router-link>
          <router-link
            to="/about"
            class="border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            {{ t('hero.ctaSecondary') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()
</script>