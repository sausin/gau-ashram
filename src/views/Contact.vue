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
                  <p class="text-gray-600">Sh. Rakesh Nihal : +91-96641-62094 / +91-98294-88058</p>
                  <p class="text-gray-600">Smt Vanita Agarwal : +91-99543-80312</p>
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
        
        <!-- Interactive Map -->
        <InteractiveMap 
          :latitude="26.276063884106673"
          :longitude="72.88897059273238"
          :zoom="15"
          :marker-title="t('contact.address')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import ContactForm from '../components/forms/ContactForm.vue'
import InteractiveMap from '../components/ui/InteractiveMap.vue'

const { t } = useI18n()
</script>