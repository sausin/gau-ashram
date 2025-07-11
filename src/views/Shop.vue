<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('products.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('products.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            v-for="category in categories"
            :key="category.key"
            @click="activeCategory = category.key"
            :variant="activeCategory === category.key ? 'primary' : 'outline'"
            size="md"
          >
            {{ category.name }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <Card
            v-for="product in filteredProducts"
            :key="product.id"
            :hover="true"
            :image="product.image"
            :image-alt="product.name"
            @click="openProductModal(product)"
          >
            <template #overlay>
              <div class="text-white">
                <span v-if="product.badge" class="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {{ product.badge }}
                </span>
              </div>
            </template>

            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-primary-800">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2">{{ product.description }}</p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl font-bold text-primary-700">₹{{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                    ₹{{ product.originalPrice }}
                  </span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                class="w-full"
                @click.stop="addToCart(product)"
              >
                Add to Cart
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Product Modal -->
    <Modal
      :is-open="!!selectedProduct"
      :title="selectedProduct?.name"
      @close="closeProductModal"
    >
      <div v-if="selectedProduct" class="space-y-4">
        <img
          :src="selectedProduct.image"
          :alt="selectedProduct.name"
          class="w-full h-64 object-cover rounded-lg"
        />
        
        <div class="space-y-3">
          <p class="text-gray-600">{{ selectedProduct.description }}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-3xl font-bold text-primary-700">₹{{ selectedProduct.price }}</span>
              <span v-if="selectedProduct.originalPrice" class="text-lg text-gray-500 line-through">
                ₹{{ selectedProduct.originalPrice }}
              </span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-lg text-gray-600 ml-1">{{ selectedProduct.rating }}</span>
            </div>
          </div>

          <div v-if="selectedProduct.features" class="space-y-2">
            <h4 class="font-semibold text-gray-800">Key Features</h4>
            <ul class="space-y-1">
              <li v-for="feature in selectedProduct.features" :key="feature" class="flex items-start">
                <svg class="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-gray-600">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex space-x-3">
          <Button variant="outline" @click="closeProductModal" class="flex-1">
            {{ t('common.close') }}
          </Button>
          <Button variant="primary" @click="selectedProduct && addToCart(selectedProduct)" class="flex-1">
            Add to Cart
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Cart Notification -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 transform translate-x-full"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform translate-x-full"
    >
      <div
        v-if="showCartNotification"
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Product added to cart successfully!
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Modal from '../components/ui/Modal.vue'

const { t } = useI18n()

type Product = {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  category: string
  badge?: string
  features?: string[]
}

const activeCategory = ref('all')
const selectedProduct = ref<Product | null>(null)
const showCartNotification = ref(false)

const categories = [
  { key: 'all', name: 'All Products' },
  { key: 'dairy', name: 'Dairy Products' },
  { key: 'herbal', name: 'Herbal Products' },
  { key: 'panchgavya', name: 'Panchgavya' }
]

const products = [
  {
    id: 1,
    name: 'Pure A2 Gir Cow Milk',
    description: 'Fresh, pure A2 milk from our indigenous Gir cows, delivered daily to your doorstep.',
    price: 80,
    originalPrice: 100,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'dairy',
    badge: 'Bestseller',
    features: [
      'Rich in A2 beta-casein protein',
      'No artificial additives',
      'Fresh daily delivery',
      'From grass-fed Gir cows'
    ]
  },
  {
    id: 2,
    name: 'Organic Gir Cow Ghee',
    description: 'Traditional bilona method ghee made from pure Gir cow milk, rich in nutrients.',
    price: 1200,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'dairy',
    badge: 'Organic',
    features: [
      'Made using traditional bilona method',
      'Rich in vitamins A, D, E, K',
      'High smoke point for cooking',
      '100% pure and natural'
    ]
  },
  {
    id: 3,
    name: 'Herbal Soap Collection',
    description: 'Handcrafted soaps using cow dung ash, neem, tulsi, and natural ingredients.',
    price: 150,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'herbal',
    badge: 'Eco-Friendly',
    features: [
      'Made with cow dung ash',
      'Natural herbs and oils',
      'Skin-friendly formula',
      'Supports local women groups'
    ]
  },
  {
    id: 4,
    name: 'Panchgavya Health Tonic',
    description: 'Traditional wellness tonic made from five sacred cow products for holistic health.',
    price: 500,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/8827680/pexels-photo-8827680.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'panchgavya',
    features: [
      'Made from five cow products',
      'Boosts natural immunity',
      'Traditional Ayurvedic formula',
      'Chemical-free preparation'
    ]
  },
  {
    id: 5,
    name: 'Fresh Paneer',
    description: 'Soft, fresh paneer made from pure Gir cow milk, perfect for traditional dishes.',
    price: 320,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'dairy',
    features: [
      'Made from pure A2 milk',
      'Soft and fresh texture',
      'High protein content',
      'No preservatives'
    ]
  },
  {
    id: 6,
    name: 'Cow Dung Cakes',
    description: 'Traditional fuel made from pure Gir cow dung, perfect for ceremonies and eco-friendly cooking.',
    price: 200,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/8828754/pexels-photo-8828754.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'herbal',
    badge: 'Traditional',
    features: [
      'Made from pure Gir cow dung',
      'Natural and eco-friendly',
      'Perfect for religious ceremonies',
      'Long burning duration'
    ]
  }
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products
  }
  return products.filter(product => product.category === activeCategory.value)
})

const openProductModal = (product: Product) => {
  selectedProduct.value = product
}

const closeProductModal = () => {
  selectedProduct.value = null
}

const addToCart = (product: Product) => {
  // Simulate adding to cart
  console.log('Added to cart:', product)
  
  showCartNotification.value = true
  setTimeout(() => {
    showCartNotification.value = false
  }, 3000)
  
  // Close modal if open
  if (selectedProduct.value) {
    closeProductModal()
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>