<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('contact.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('contact.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-serif font-bold text-primary-800 mb-8">Get in Touch</h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              We'd love to hear from you. Whether you're interested in our programs, research, or partnership opportunities, our team is here to help.
            </p>

            <!-- Contact Details -->
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-primary-800 mb-1">{{ t('contact.address') }}</h3>
                  <p class="text-gray-600 whitespace-pre-line">{{ t('contact.addressText') }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-primary-800 mb-1">{{ t('contact.phone') }}</h3>
                  <p class="text-gray-600">+91 291 XXX XXXX</p>
                  <p class="text-sm text-gray-500">Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-primary-800 mb-1">{{ t('contact.email') }}</h3>
                  <p class="text-gray-600">info@gauashram.org</p>
                  <p class="text-gray-600">research@gauashram.org</p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="mt-12">
              <h3 class="font-semibold text-primary-800 mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.323 17.49c-.49-.875-.49-2.448-.49-3.323V8.833c0-1.297.49-2.448 1.297-3.323.875-.49 2.026-.49 3.323-.49h6.62c1.297 0 2.448.49 3.323 1.297.49.875.49 2.026.49 3.323v6.62c0 1.297-.49 2.448-1.297 3.323-.875.49-2.026.49-3.323.49H8.449z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif font-bold text-primary-800 mb-4">Visit Our Campus</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the historic city of Jodhpur, our campus welcomes visitors, researchers, and students from around the world.
          </p>
        </div>
        
        <!-- Placeholder for map -->
        <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p class="text-gray-500">Interactive map coming soon</p>
            <p class="text-sm text-gray-400 mt-2">Gir Cow Heritage Institute, Jodhpur, Rajasthan</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import ContactForm from '../components/forms/ContactForm.vue'

const { t } = useI18n()
</script>