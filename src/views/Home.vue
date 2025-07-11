<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- About Preview -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-6">
              {{ t('about.title') }}
            </h2>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              {{ t('about.description') }}
            </p>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <p class="text-gray-700">{{ t('about.visionText') }}</p>
              </div>
            </div>
            <router-link
              to="/about"
              class="inline-flex items-center mt-8 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            >
              {{ t('common.learnMore') }}
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/12892080/pexels-photo-12892080.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              :alt="t('home.sustainableFarmingAlt')"
              class="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center shadow-xl">
              <span class="text-white font-bold text-2xl">{{ t('home.yearsOfService') }}</span>
            </div>
            <div class="absolute -bottom-2 -right-2 text-primary-700 font-semibold text-sm">
              {{ t('home.yearsOfServiceLabel') }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Initiatives Preview -->
    <section class="py-20 bg-primary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            {{ t('initiatives.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('initiatives.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="initiative in initiatives"
            :key="initiative.key"
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <component :is="initiative.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-primary-800 mb-3">
              {{ t(`initiatives.${initiative.key}.title`) }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t(`initiatives.${initiative.key}.description`) }}
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link
            to="/initiatives"
            class="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            {{ t('common.viewAll') }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Impact Section with Content -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Always show the styled stats display -->
        <div>
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-4">
              {{ t('impact.title') }}
            </h2>
            <p class="text-xl text-primary-100 max-w-2xl mx-auto">
              {{ t('impact.subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
            <div class="transform hover:scale-105 transition-transform duration-300">
              <div class="text-4xl font-bold mb-2">{{ t('stats.waterTableValue') }}</div>
              <div class="text-primary-200">{{ t('stats.waterTableLabel') }}</div>
            </div>
            <div class="transform hover:scale-105 transition-transform duration-300">
              <div class="text-4xl font-bold mb-2">{{ t('stats.bullsValue') }}</div>
              <div class="text-primary-200">{{ t('stats.bullsLabel') }}</div>
            </div>
            <div class="transform hover:scale-105 transition-transform duration-300">
              <div class="text-4xl font-bold mb-2">{{ t('stats.womenValue') }}</div>
              <div class="text-primary-200">{{ t('stats.womenLabel') }}</div>
            </div>
            <div class="transform hover:scale-105 transition-transform duration-300">
              <div class="text-4xl font-bold mb-2">{{ t('stats.acresValue') }}</div>
              <div class="text-primary-200">{{ t('stats.acresLabel') }}</div>
            </div>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-primary-700 rounded-lg p-6">
            <blockquote class="text-lg italic mb-4">
              "{{ t('impact.testimonial1') }}"
            </blockquote>
            <div class="flex items-center">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                :alt="t('home.villageRepresentativeAlt')"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p class="font-semibold">{{ t('home.villageRepresentative') }}</p>
                <p class="text-primary-200 text-sm">{{ t('home.ruralRajasthan') }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-primary-700 rounded-lg p-6">
            <blockquote class="text-lg italic mb-4">
              "{{ t('impact.testimonial2') }}"
            </blockquote>
            <div class="flex items-center">
              <img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                :alt="t('home.communityMemberAlt')"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p class="font-semibold">{{ t('home.communityMember') }}</p>
                <p class="text-primary-200 text-sm">{{ t('home.goMandirBeneficiary') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-secondary-500 to-secondary-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
          {{ t('home.joinMission') }}
        </h2>
        <p class="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
          {{ t('home.joinMissionDescription') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/volunteer"
            class="bg-white text-secondary-700 hover:bg-secondary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            {{ t('hero.ctaVolunteer') }}
          </router-link>
          <router-link
            to="/contact"
            class="border-2 border-white text-white hover:bg-white hover:text-secondary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            {{ t('common.getStarted') }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import HeroSection from '../components/ui/HeroSection.vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

// Simple icon components using raw SVG
const HomeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  })
])

const HeartIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  })
])

const SeedlingIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 3v1m0 3v1m0 3v1m0 3v1m0 3v1M9 21h6m-7-5a7 7 0 1114 0'
  })
])

const ShieldIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  })
])

const DropletIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M7.5 14.25c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3z'
  }),
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 2.25c-1.5 0-3 1.5-3 3v6c0 1.5 1.5 3 3 3s3-1.5 3-3v-6c0-1.5-1.5-3-3-3z'
  })
])

const initiatives = [
  { key: 'goMandir', icon: HomeIcon },
  { key: 'healthcare', icon: HeartIcon },
  { key: 'agriculture', icon: SeedlingIcon },
  { key: 'conservation', icon: ShieldIcon },
  { key: 'water', icon: DropletIcon }
]
</script>