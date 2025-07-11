<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('initiatives.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('initiatives.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Detailed Initiatives -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-20">
          <div v-for="(initiative, index) in detailedInitiatives" :key="initiative.key" 
               class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
               :class="{ 'lg:grid-flow-col-dense': index % 2 === 1 }">
            <div :class="{ 'lg:col-start-2': index % 2 === 1 }">
              <!-- Use ContentRenderer for detailed initiative content -->
              <div v-if="getContent(`initiatives/${initiative.key}`)" class="prose prose-lg max-w-none">
                <ContentRenderer :content-path="`initiatives/${initiative.key}`" />
              </div>
              
              <!-- Fallback to original content if markdown not available -->
              <div v-else>
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <component :is="initiative.icon" class="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 class="text-3xl font-serif font-bold text-primary-800">
                    {{ t(`initiatives.${initiative.key}.title`) }}
                  </h2>
                </div>
                <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                  {{ t(`initiatives.${initiative.key}.description`) }}
                </p>
                <ul class="space-y-3">
                  <li v-for="feature in initiative.features" :key="feature" class="flex items-start">
                    <svg class="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-gray-700">{{ feature }}</span>
                  </li>
                </ul>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                class="mt-8"
                @click="$router.push('/contact')"
              >
                {{ t('common.learnMore') }}
              </Button>
            </div>
            <div :class="{ 'lg:col-start-1 lg:row-start-1': index % 2 === 1 }">
              <img
                :src="initiative.image"
                :alt="t(`initiatives.${initiative.key}.title`)"
                class="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Statistics -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-center mb-16">{{ t('initiatives.impactTitle') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in impactStats" :key="stat.label" class="text-center">
            <div class="text-4xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-primary-200 mb-1">{{ stat.label }}</div>
            <div class="text-sm text-primary-300">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-secondary-500 to-secondary-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
          {{ t('initiatives.supportTitle') }}
        </h2>
        <p class="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
          {{ t('initiatives.supportDescription') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            class="bg-white text-secondary-700 hover:bg-secondary-50 border-white"
            @click="$router.push('/volunteer')"
          >
{{ t('initiatives.volunteerWithUs') }}
          </Button>
          <Button
            variant="outline"
            size="lg"
            class="border-white text-white hover:bg-white hover:text-secondary-700"
            @click="$router.push('/contact')"
          >
{{ t('initiatives.partnerWithUs') }}
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'
import Button from '../components/ui/Button.vue'
import ContentRenderer from '../components/ui/ContentRenderer.vue'

const { t } = useI18n()
const { getContent } = useContent()

// Icon components
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

const detailedInitiatives = computed(() => [
  {
    key: 'goMandir',
    icon: HomeIcon,
    image: 'gau-background.jpg',
    features: [
      'Sanctuary for 500+ indigenous cows',
      'Water table raised from 410ft to 120ft',
      'Hundreds of acres of land restored',
      'Chemical-free agriculture practices',
      'Women empowerment programs'
    ]
  },
  {
    key: 'healthcare',
    icon: HeartIcon,
    image: 'medical-camp.jpeg',
    features: [
      'Acupressure training for rural families',
      'Naturopathy workshops and consultations',
      'Panchgavya therapy certification',
      'Community health camps',
      'Traditional healing knowledge preservation'
    ]
  },
  {
    key: 'agriculture',
    icon: SeedlingIcon,
    image: 'plantation2.jpeg',
    features: [
      'Zero-cost farming techniques',
      'Cow-based organic fertilizers',
      'Soil microbe enhancement',
      'Crop rotation and companion planting',
      'Farmer training and support'
    ]
  },
  {
    key: 'conservation',
    icon: ShieldIcon,
    image: 'seed-distribution.jpeg',
    features: [
      'Habitat restoration projects',
      'Wildlife corridor development',
      'Native species protection',
      'Biodiversity monitoring',
      'Community conservation education'
    ]
  },
  {
    key: 'water',
    icon: DropletIcon,
    image: 'rainwater-harvesting.jpeg',
    features: [
      'Traditional water harvesting',
      'Groundwater recharge systems',
      'Watershed management',
      'Drought-resistant landscaping',
      'Community water stewardship'
    ]
  }
])

const impactStats = computed(() => [
  {
    value: t('stats.waterTableValue'),
    label: t('initiatives.impact.waterTableLabel'),
    description: t('initiatives.impact.waterTableDesc')
  },
  {
    value: t('stats.acresValue'),
    label: t('initiatives.impact.acresLabel'),
    description: t('initiatives.impact.acresDesc')
  },
  {
    value: t('stats.bullsValue'),
    label: t('initiatives.impact.bullsLabel'),
    description: t('initiatives.impact.bullsDesc')
  },
  {
    value: t('stats.womenValue'),
    label: t('initiatives.impact.womenLabel'),
    description: t('initiatives.impact.womenDesc')
  }
])
</script>