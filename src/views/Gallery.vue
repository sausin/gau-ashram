<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-accent-50 to-primary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('gallery.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('gallery.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="category in categories"
            :key="category.key"
            @click="activeCategory = category.key"
            class="px-6 py-3 rounded-full font-semibold transition-all duration-300"
            :class="activeCategory === category.key 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(image, index) in filteredImages"
            :key="index"
            class="group cursor-pointer"
            @click="openModal(image, index)"
          >
            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 right-4">
                  <h3 class="text-white font-semibold text-lg mb-1">{{ image.title }}</h3>
                  <p class="text-gray-200 text-sm">{{ image.description }}</p>
                </div>
              </div>
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalImage"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click="closeModal"
      >
        <div class="relative max-w-4xl max-h-full" @click.stop>
          <img
            :src="modalImage.src"
            :alt="modalImage.alt"
            class="max-w-full max-h-full object-contain rounded-lg"
          />
          
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Navigation -->
          <button
            v-if="modalIndex > 0"
            @click="previousImage"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button
            v-if="modalIndex < filteredImages.length - 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Image Info -->
          <div class="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg">
            <h3 class="font-semibold text-lg mb-1">{{ modalImage.title }}</h3>
            <p class="text-gray-200">{{ modalImage.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const activeCategory = ref('all')
const modalImage = ref(null)
const modalIndex = ref(0)

const categories = [
  { key: 'all', name: 'All' },
  { key: 'cows', name: 'Gir Cows' },
  { key: 'research', name: 'Research' },
  { key: 'facility', name: 'Facilities' },
  { key: 'heritage', name: 'Heritage' }
]

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Gir cows grazing',
    title: 'Gir Cows in Natural Habitat',
    description: 'Our prized Gir cattle enjoying the open pastures',
    category: 'cows'
  },
  {
    src: 'https://images.pexels.com/photos/8827680/pexels-photo-8827680.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Research laboratory',
    title: 'Advanced Research Laboratory',
    description: 'State-of-the-art facilities for genetic research',
    category: 'research'
  },
  {
    src: 'https://images.pexels.com/photos/12892080/pexels-photo-12892080.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Traditional farming',
    title: 'Traditional Farming Practices',
    description: 'Preserving ancient agricultural wisdom',
    category: 'heritage'
  },
  {
    src: 'https://images.pexels.com/photos/8828756/pexels-photo-8828756.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Institute building',
    title: 'Heritage Institute Campus',
    description: 'Our beautiful campus in Jodhpur',
    category: 'facility'
  },
  {
    src: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Milk testing',
    title: 'Quality Testing Laboratory',
    description: 'Ensuring the highest standards in dairy products',
    category: 'research'
  },
  {
    src: 'https://images.pexels.com/photos/4466492/pexels-photo-4466492.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Cow feeding',
    title: 'Nutritional Care Program',
    description: 'Specialized feeding programs for optimal health',
    category: 'cows'
  },
  {
    src: 'https://images.pexels.com/photos/8828754/pexels-photo-8828754.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Traditional architecture',
    title: 'Rajasthani Heritage Architecture',
    description: 'Blending tradition with modern functionality',
    category: 'heritage'
  },
  {
    src: 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Training session',
    title: 'Farmer Training Workshop',
    description: 'Educating local farmers on modern techniques',
    category: 'facility'
  },
  {
    src: 'https://images.pexels.com/photos/4466497/pexels-photo-4466497.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Veterinary care',
    title: 'Veterinary Care Unit',
    description: 'Comprehensive healthcare for our cattle',
    category: 'research'
  }
]

const filteredImages = computed(() => {
  if (activeCategory.value === 'all') {
    return galleryImages
  }
  return galleryImages.filter(image => image.category === activeCategory.value)
})

const openModal = (image: any, index: number) => {
  modalImage.value = image
  modalIndex.value = index
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  modalImage.value = null
  modalIndex.value = 0
  document.body.style.overflow = 'auto'
}

const previousImage = () => {
  if (modalIndex.value > 0) {
    modalIndex.value--
    modalImage.value = filteredImages.value[modalIndex.value]
  }
}

const nextImage = () => {
  if (modalIndex.value < filteredImages.value.length - 1) {
    modalIndex.value++
    modalImage.value = filteredImages.value[modalIndex.value]
  }
}
</script>