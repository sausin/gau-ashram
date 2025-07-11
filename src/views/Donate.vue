<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('donate.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('donate.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Why Donate Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-serif font-bold text-primary-800 mb-6">
              {{ t('donate.whyDonate') }}
            </h2>
            <div class="space-y-6 text-lg text-gray-700">
              <p>{{ t('donate.impact.intro') }}</p>
              
              <div class="space-y-4">
                <div v-for="impact in impacts" :key="impact.title" class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <component :is="impact.icon" class="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-primary-800 mb-1">{{ impact.title }}</h3>
                    <p class="text-gray-600">{{ impact.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <img
              src="/felicitation.webp"
              alt="Our impact in action"
              class="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
            <div class="absolute -bottom-6 -right-6 bg-secondary-500 text-white p-6 rounded-lg shadow-xl">
              <div class="text-3xl font-bold">{{ t('donate.stats.lives') }}</div>
              <div class="text-sm">{{ t('donate.stats.livesText') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Achievements Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-primary-800 mb-12 text-center">
          {{ t('donate.achievements.title') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="achievement in achievements" :key="achievement.label" class="bg-white rounded-lg shadow-lg p-6 text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ achievement.value }}</div>
            <div class="text-gray-700 font-medium">{{ achievement.label }}</div>
            <div class="text-sm text-gray-500 mt-1">{{ achievement.sublabel }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation Sections -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif font-bold text-primary-800 mb-4">
            {{ t('donate.sections.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('donate.sections.subtitle') }}
          </p>
        </div>

        <div class="space-y-12">
          <div v-for="(section, index) in donationSections" :key="section.metadata.title" 
               class="bg-white rounded-xl shadow-lg overflow-hidden"
               :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'">
            <div class="lg:flex">
              <!-- Content -->
              <div class="lg:flex-1 p-8">
                <div class="flex items-center mb-4">
                  <span class="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
                    {{ index + 1 }}
                  </span>
                  <h3 class="text-2xl font-serif font-bold text-primary-800">
                    {{ section.metadata.title }}
                  </h3>
                </div>
                
                <div class="prose prose-primary max-w-none" v-html="section.html"></div>
                
                <!-- Special display for Corpus Fund -->
                <div v-if="section.metadata.target" class="mt-6 bg-primary-50 rounded-lg p-6">
                  <div class="flex justify-between items-center mb-4">
                    <div>
                      <p class="text-sm text-primary-600 font-medium">Target Corpus</p>
                      <p class="text-2xl font-bold text-primary-800">{{ section.metadata.target }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-primary-600 font-medium">Current Corpus</p>
                      <p class="text-2xl font-bold text-primary-800">{{ section.metadata.current }}</p>
                    </div>
                  </div>
                  <div class="w-full bg-primary-200 rounded-full h-3">
                    <div class="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500" 
                         style="width: 0%"></div>
                  </div>
                  <p class="text-sm text-primary-600 mt-2">0% of target achieved</p>
                </div>
              </div>
              
              <!-- Visual Element -->
              <div class="lg:w-1/3 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center p-8">
                <div class="text-center">
                  <div class="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 mx-auto">
                    <component :is="getSectionIcon(index)" class="w-12 h-12 text-primary-600" />
                  </div>
                  <p class="text-primary-800 font-semibold">{{ section.metadata.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation Options Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif font-bold text-primary-800 mb-4">
            {{ t('donate.howToDonate') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('donate.donateDescription') }}
          </p>
        </div>

        <div class="max-w-2xl mx-auto">
          <!-- UPI QR Code -->
          <div class="bg-white rounded-xl shadow-lg p-4 sm:p-8">
            <h3 class="text-2xl font-semibold text-primary-800 mb-6 text-center">
              {{ t('donate.upiTitle') }}
            </h3>
            
            <div class="flex justify-center mb-6">
              <div class="relative bg-white p-2 sm:p-4 rounded-lg shadow-inner max-w-xs w-full">
                <canvas ref="qrCanvas" class="w-full h-auto max-w-full"></canvas>
              </div>
            </div>
            
            <div class="text-center space-y-3 px-2 sm:px-0">
              <p class="text-sm text-gray-600">{{ t('donate.scanQR') }}</p>
              <p class="font-semibold text-primary-800">{{ t('donate.upiId') }}: 9571190094@sbi</p>
              <!-- Mobile-only UPI button -->
              <button 
                v-if="isMobile"
                @click="openUPIApp"
                class="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                {{ t('donate.openUPIApp') }}
              </button>
              <!-- Desktop instructions -->
              <p v-else class="mt-4 text-sm text-gray-600 italic px-4">
                {{ t('donate.desktopInstructions') }}
              </p>
            </div>
            
            <!-- Legal Details -->
            <div class="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
              <div class="mb-3">
                <h4 class="text-sm font-semibold text-primary-800 mb-2">{{ t('donate.legalDetails.organizationName') }}</h4>
                <p class="text-xs text-primary-700">{{ t('donate.legalDetails.parentOrganization') }}</p>
                <div class="mt-2 text-xs text-primary-600">
                  <p class="font-medium">{{ t('donate.legalDetails.registrationDetails') }}:</p>
                  <p>{{ t('donate.legalDetails.registrationNumber') }}</p>
                  <p>{{ t('donate.legalDetails.registrationAuthority') }}</p>
                </div>
              </div>
              <div class="border-t border-primary-200 pt-3">
                <p class="text-sm text-primary-800">
                  {{ t('donate.taxBenefit') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-primary-800 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-serif font-bold mb-6">
          {{ t('donate.cta.title') }}
        </h2>
        <p class="text-xl mb-8 text-primary-100">
          {{ t('donate.cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/contact"
            class="bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            {{ t('donate.cta.contact') }}
          </router-link>
          <router-link
            to="/volunteer"
            class="border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            {{ t('donate.cta.volunteer') }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'
import QRCode from 'qrcode'

const { t } = useI18n()
const { getDonationSections } = useContent()
const qrCanvas = ref<HTMLCanvasElement | null>(null)

// Load donation sections
const donationSections = computed(() => getDonationSections())

// Check if device is mobile
const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

// UPI Link from the provided string
const upiLink = 'upi://pay?pa=9571190094@sbi&pn=LAKSHYA%20PARIYAVARAN%20AND%20JAN%20KALYAN%20SANSTHA&mc=8398&tr=&tn=&am=&cu=INR&url=&mode=02&purpose=00&orgid=159002&sign=MEUCIQD05rL/KlucDqV9M6qk4fBB4h1ihW0iMXO73yL0rEbVOAIgapyOhnXpC4aghD1JIS3SLxLApXN+zqS6pq5wQsmQ+P0='

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

const WaterIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
  })
])

const TreeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M5 12l5-5 5 5M5 12l5 5 5-5M12 2v10'
  })
])

const HealingIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  })
])

const impacts = computed(() => [
  {
    icon: HeartIcon,
    title: t('donate.impact.cows.title'),
    description: t('donate.impact.cows.description')
  },
  {
    icon: WaterIcon,
    title: t('donate.impact.water.title'),
    description: t('donate.impact.water.description')
  },
  {
    icon: TreeIcon,
    title: t('donate.impact.environment.title'),
    description: t('donate.impact.environment.description')
  },
  {
    icon: HealingIcon,
    title: t('donate.impact.healing.title'),
    description: t('donate.impact.healing.description')
  }
])

const achievements = computed(() => [
  {
    value: '100+',
    label: t('donate.achievements.cows'),
    sublabel: t('donate.achievements.cowsSub')
  },
  {
    value: '290ft',
    label: t('donate.achievements.water'),
    sublabel: t('donate.achievements.waterSub')
  },
  {
    value: '81,000',
    label: t('donate.achievements.trees'),
    sublabel: t('donate.achievements.treesSub')
  },
  {
    value: '1000+',
    label: t('donate.achievements.people'),
    sublabel: t('donate.achievements.peopleSub')
  }
])

// Get appropriate icon for each donation section
const getSectionIcon = (index: number) => {
  const icons = [HeartIcon, TreeIcon, WaterIcon, HealingIcon]
  return icons[index % icons.length]
}

// Generate QR code with logo
const generateQRCode = async () => {
  if (!qrCanvas.value) return

  try {
    // Calculate responsive QR code size
    const containerWidth = qrCanvas.value.parentElement?.clientWidth || 300
    const qrSize = Math.min(300, Math.max(200, containerWidth - 40))
    
    // Generate QR code
    await QRCode.toCanvas(qrCanvas.value, upiLink, {
      width: qrSize,
      margin: 2,
      color: {
        dark: '#065f46',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H' // High error correction for logo overlay
    })

    // Add logo to center
    const ctx = qrCanvas.value.getContext('2d')
    if (ctx) {
      const logo = new Image()
      logo.src = '/logo.webp'
      logo.onload = () => {
        // Make logo size proportional to QR code size (20% of QR width)
        const logoSize = Math.floor(qrCanvas.value!.width * 0.2)
        const logoX = (qrCanvas.value!.width - logoSize) / 2
        const logoY = (qrCanvas.value!.height - logoSize) / 2
        const padding = Math.floor(logoSize * 0.1)
        
        // Draw white background for logo
        ctx.fillStyle = 'white'
        ctx.fillRect(logoX - padding, logoY - padding, logoSize + (padding * 2), logoSize + (padding * 2))
        
        // Draw logo
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
      }
    }
  } catch (error) {
    console.error('Error generating QR code:', error)
  }
}

const openUPIApp = () => {
  try {
    // On mobile, try to open UPI app directly
    window.location.href = upiLink
  } catch (error) {
    console.error('Error opening UPI app:', error)
  }
}

onMounted(() => {
  generateQRCode()
})
</script>

<style scoped>
.prose {
  @apply text-gray-700;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply text-primary-800 font-serif font-bold;
}

.prose h1 { @apply text-2xl mb-4; }
.prose h2 { @apply text-xl mb-3; }
.prose h3 { @apply text-lg mb-2; }

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul, .prose ol {
  @apply mb-4 pl-6;
}

.prose li {
  @apply mb-2;
}

.prose strong {
  @apply font-semibold text-primary-800;
}

.prose table {
  @apply w-full border-collapse mb-6;
}

.prose th, .prose td {
  @apply border border-gray-300 px-4 py-2 text-left;
}

.prose th {
  @apply bg-primary-50 font-semibold text-primary-800;
}

.prose tr:nth-child(even) {
  @apply bg-gray-50;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 pl-4 italic text-gray-600 mb-4;
}
</style>