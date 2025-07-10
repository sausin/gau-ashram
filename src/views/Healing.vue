<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('healing.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('healing.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Healing Methods -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Naturopathy -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                </svg>
              </div>
              <h2 class="text-3xl font-serif font-bold text-primary-800">
                {{ t('healing.naturopathy.title') }}
              </h2>
            </div>
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ t('healing.naturopathy.description') }}
            </p>
            <img
              src="https://images.pexels.com/photos/8827680/pexels-photo-8827680.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Natural healing therapy"
              class="rounded-lg shadow-lg w-full"
              loading="lazy"
            />
            <div class="bg-primary-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-primary-800 mb-4">Treatment Methods</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Mud therapy and earth treatments</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Hydrotherapy and water healing</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Yoga and breathing exercises</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Dietary therapy and fasting</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Panchgavya -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h2 class="text-3xl font-serif font-bold text-primary-800">
                {{ t('healing.panchgavya.title') }}
              </h2>
            </div>
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ t('healing.panchgavya.description') }}
            </p>
            <img
              src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Panchgavya products and therapy"
              class="rounded-lg shadow-lg w-full"
              loading="lazy"
            />
            <div class="bg-secondary-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-primary-800 mb-4">Five Sacred Elements</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                    <span class="text-secondary-700 font-semibold text-sm">1</span>
                  </div>
                  <span class="text-gray-700">Cow Milk</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                    <span class="text-secondary-700 font-semibold text-sm">2</span>
                  </div>
                  <span class="text-gray-700">Cow Curd</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                    <span class="text-secondary-700 font-semibold text-sm">3</span>
                  </div>
                  <span class="text-gray-700">Cow Ghee</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                    <span class="text-secondary-700 font-semibold text-sm">4</span>
                  </div>
                  <span class="text-gray-700">Cow Urine</span>
                </div>
                <div class="flex items-center space-x-3 sm:col-span-2">
                  <div class="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                    <span class="text-secondary-700 font-semibold text-sm">5</span>
                  </div>
                  <span class="text-gray-700">Cow Dung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {{ t('healing.benefits') }}
          </h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            Experience the transformative power of natural healing methods
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(benefit, index) in benefits" :key="index" class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ benefit.title }}</h3>
            <p class="text-primary-100">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-6">
            Book Your Healing Consultation
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Experience personalized natural healing treatments guided by our experienced practitioners
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              class="bg-white text-primary-700 hover:bg-primary-50 border-white"
              @click="$router.push('/contact')"
            >
              Schedule Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="border-white text-white hover:bg-white hover:text-primary-700"
              @click="$router.push('/education')"
            >
              Learn Healing Techniques
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Training Programs -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            Healing Training Programs
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn traditional healing methods and become a certified practitioner
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="program in trainingPrograms"
            :key="program.title"
            :hover="true"
            class="h-full"
          >
            <div class="space-y-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-primary-800">{{ program.title }}</h3>
              <p class="text-gray-600">{{ program.description }}</p>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Duration:</span>
                  <span class="font-medium">{{ program.duration }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Level:</span>
                  <span class="font-medium">{{ program.level }}</span>
                </div>
              </div>
              <Button variant="primary" size="sm" class="w-full">
                Enroll Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'

const { t } = useI18n()

const benefits = computed(() => t('healing.benefitsList').map((benefit, index) => ({
  title: ['Chemical-Free', 'Natural Immunity', 'Root Cause', 'Overall Wellbeing', 'Cost-Effective'][index],
  description: benefit
})))

const trainingPrograms = [
  {
    title: 'Basic Naturopathy',
    description: 'Learn fundamental principles of natural healing using the five elements',
    duration: '3 months',
    level: 'Beginner'
  },
  {
    title: 'Panchgavya Therapy',
    description: 'Master the art of cow-based healing and wellness practices',
    duration: '6 months',
    level: 'Intermediate'
  },
  {
    title: 'Advanced Healing',
    description: 'Comprehensive training in traditional healing methods and consultation',
    duration: '1 year',
    level: 'Advanced'
  }
]
</script>