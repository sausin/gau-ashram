<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('programs.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('programs.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Detailed Programs -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-20">
          <div v-for="(program, index) in detailedPrograms" :key="program.key" 
               class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
               :class="{ 'lg:grid-flow-col-dense': index % 2 === 1 }">
            <div :class="{ 'lg:col-start-2': index % 2 === 1 }">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <component :is="program.icon" class="w-6 h-6 text-primary-600" />
                </div>
                <h2 class="text-3xl font-serif font-bold text-primary-800">
                  {{ t(`programs.${program.key}.title`) }}
                </h2>
              </div>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                {{ t(`programs.${program.key}.description`) }}
              </p>
              <ul class="space-y-3">
                <li v-for="feature in program.features" :key="feature" class="flex items-start">
                  <svg class="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ feature }}</span>
                </li>
              </ul>
              <button class="mt-8 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                {{ t('common.learnMore') }}
              </button>
            </div>
            <div :class="{ 'lg:col-start-1 lg:row-start-1': index % 2 === 1 }">
              <img
                :src="program.image"
                :alt="t(`programs.${program.key}.title`)"
                class="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Program Stats -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-center mb-16">Program Impact</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in programStats" :key="stat.label" class="text-center">
            <div class="text-4xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-primary-200">{{ stat.label }}</div>
            <div class="text-sm text-primary-300 mt-1">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enrollment CTA -->
    <section class="py-20 bg-gradient-to-r from-secondary-500 to-secondary-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
          Ready to Join Our Programs?
        </h2>
        <p class="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
          Take the first step towards becoming part of India's premier Gir cattle conservation community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/contact"
            class="bg-white text-secondary-700 hover:bg-secondary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Get Information
          </router-link>
          <a
            href="#"
            class="border-2 border-white text-white hover:bg-white hover:text-secondary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            {{ t('programs.downloadBrochure') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

// Icon components
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

const BeakerIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
  })
])

const AcademicCapIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 14l9-5-9-5-9 5 9 5z'
  }),
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
  })
])

const ShieldCheckIcon = () => h('svg', {
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

const detailedPrograms = [
  {
    key: 'breeding',
    icon: HeartIcon,
    image: 'https://images.pexels.com/photos/8827680/pexels-photo-8827680.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: [
      'Genetic analysis and lineage tracking',
      'Advanced artificial insemination techniques',
      'Selective breeding consultation',
      'Fertility enhancement programs'
    ]
  },
  {
    key: 'research',
    icon: BeakerIcon,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: [
      'Nutritional optimization studies',
      'Disease resistance research',
      'Milk quality enhancement',
      'Climate adaptation studies'
    ]
  },
  {
    key: 'education',
    icon: AcademicCapIcon,
    image: 'https://images.pexels.com/photos/8828756/pexels-photo-8828756.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: [
      'Hands-on farm management training',
      'Traditional knowledge workshops',
      'Modern technology integration',
      'Certification programs'
    ]
  },
  {
    key: 'conservation',    
    icon: ShieldCheckIcon,
    image: 'https://images.pexels.com/photos/12892080/pexels-photo-12892080.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: [
      'Genetic diversity preservation',
      'Heritage documentation',
      'Community-based conservation',
      'Policy advocacy and development'
    ]
  }
]

const programStats = [
  {
    value: '1,200+',
    label: 'Students Trained',
    description: 'Across all programs'
  },
  {
    value: '85%',
    label: 'Success Rate',
    description: 'In breeding programs'
  },
  {
    value: '40+',
    label: 'Research Papers',
    description: 'Published annually'
  },
  {
    value: '15',
    label: 'Partner Institutions',
    description: 'Worldwide network'
  }
]
</script>