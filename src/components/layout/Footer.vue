<template>
  <footer class="bg-primary-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo & Description -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img 
              src="/logo.webp" 
              alt="Gau Samwardhan Ashram - Go Mandir"
              class="h-16 w-auto bg-white rounded-lg p-2"
            />
          </div>
          <p class="text-primary-100 leading-relaxed mb-6 max-w-md">
            {{ t('footer.description') }}
          </p>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/people/गौ-संवर्द्धन-आश्रम-मोकलावास/100057634471392" class="text-primary-200 hover:text-white transition-colors duration-300" aria-label="Facebook">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/gau_mandir_jodhpur" class="text-primary-200 hover:text-white transition-colors duration-300" aria-label="Instagram">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.323 17.49c-.49-.875-.49-2.448-.49-3.323V8.833c0-1.297.49-2.448 1.297-3.323.875-.49 2.026-.49 3.323-.49h6.62c1.297 0 2.448.49 3.323 1.297.49.875.49 2.026.49 3.323v6.62c0 1.297-.49 2.448-1.297 3.323-.875.49-2.026.49-3.323.49H8.449z"/>
              </svg>
            </a>
            <a href="http://www.youtube.com/@rakeshnihaljodhpur3637" class="text-primary-200 hover:text-white transition-colors duration-300" aria-label="YouTube">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="text-primary-200 hover:text-white transition-colors duration-300">
                {{ t('navigation.about') }}
              </router-link>
            </li>
            <li>
              <router-link to="/initiatives" class="text-primary-200 hover:text-white transition-colors duration-300">
                {{ t('footer.initiatives') }}
              </router-link>
            </li>
            <li>
              <router-link to="/healing" class="text-primary-200 hover:text-white transition-colors duration-300">
                {{ t('navigation.healing') }}
              </router-link>
            </li>
            <li>
              <router-link to="/volunteer" class="text-primary-200 hover:text-white transition-colors duration-300">
                {{ t('navigation.volunteer') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info & Newsletter -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.contact') }}</h4>
          <div class="space-y-3 text-primary-200 mb-6">
            <div class="flex items-start space-x-2">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div class="text-sm">
                <p>{{ t('contact.addressText').split('\n')[0] }}</p>
                <p>{{ t('contact.addressText').split('\n')[1] }}</p>
                <p>{{ t('contact.addressText').split('\n')[2] }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span class="text-sm">{{ t('footer.email') }}</span>
            </div>
          </div>

          <!-- Newsletter Signup -->
          <div>
            <h5 class="font-semibold mb-2">{{ t('footer.newsletter') }}</h5>
            <p class="text-sm text-primary-200 mb-3">{{ t('footer.newsletterText') }}</p>
            <div class="flex">
              <input
                type="email"
:placeholder="t('footer.emailPlaceholder')"
                class="flex-1 px-3 py-2 text-sm bg-primary-800 border border-primary-700 rounded-l-md text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button class="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white text-sm rounded-r-md transition-colors duration-300">
                {{ t('footer.subscribe') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-primary-800 text-center">
        <p class="text-primary-200 text-sm">{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()
</script>