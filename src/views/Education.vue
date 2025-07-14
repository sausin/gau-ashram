<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('education.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('education.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Academic Collaboration -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-serif font-bold text-primary-800 mb-6">
              {{ t('education.collaboration') }}
            </h2>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              {{ t('education.collaborationText') }}
            </p>
            <div class="bg-primary-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-primary-800 mb-4">{{ t('education.partnership.title') }}</h3>
              <p class="text-gray-700 mb-4">
                {{ t('education.partnership.university') }}
              </p>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ t('education.features.curriculum') }}</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ t('education.features.recognition') }}</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ t('education.features.research') }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <img
              src="/panchgavya-release.webp"
              alt="Traditional education and learning"
              class="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Offered -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="dynamicCourses.length > 0">
          <h2 class="text-3xl font-serif font-bold text-primary-800 mb-12 text-center">
            {{ t('courses.availableCourses') }}
          </h2>
          
          <!-- Carousel Container -->
          <div class="relative">
            <!-- Carousel Wrapper -->
            <div class="overflow-hidden">
              <div 
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              >
                <div 
                  v-for="(course, index) in dynamicCourses" 
                  :key="index"
                  class="w-full flex-shrink-0"
                >
                  <!-- Course Card -->
                  <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="md:flex">
                      <!-- Course Image -->
                      <div class="md:w-1/2">
                        <img
                          :src="course.image"
                          :alt="course.title"
                          class="w-full h-80 md:h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <!-- Course Details -->
                      <div class="md:w-1/2 p-8">
                        <!-- Course Header -->
                        <div class="flex items-center justify-between mb-4">
                          <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                            {{ course.category }}
                          </span>
                          <span class="text-sm text-gray-500">
                            {{ course.level }}
                          </span>
                        </div>
                        
                        <!-- Course Title -->
                        <h3 class="text-2xl font-serif font-bold text-primary-800 mb-4">
                          {{ course.title }}
                        </h3>
                        
                        <!-- Course Description -->
                        <p class="text-gray-600 mb-6 leading-relaxed">
                          {{ course.excerpt }}
                        </p>
                        
                        <!-- Course Meta Info -->
                        <div class="space-y-3 mb-6">
                          <div class="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd" />
                            </svg>
                            <span>{{ t('courses.duration') }}: {{ course.duration }}</span>
                          </div>
                          
                          <div class="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                            <span>{{ t('courses.startDate') }}: {{ course.startDate }}</span>
                          </div>
                          
                          <div class="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clip-rule="evenodd" />
                            </svg>
                            <span>{{ course.semesters }} {{ t('courses.semesters') }}</span>
                          </div>
                        </div>
                        
                        <!-- Instructor Info -->
                        <div class="flex items-center mb-6">
                          <img
                            :src="course.instructor.image"
                            :alt="course.instructor.name"
                            class="w-12 h-12 rounded-full mr-3"
                          />
                          <div>
                            <p class="font-semibold text-gray-800">{{ course.instructor.name }}</p>
                            <p class="text-sm text-gray-600">{{ course.instructor.title }}</p>
                          </div>
                        </div>
                        
                        <!-- Course Tags -->
                        <div class="flex flex-wrap gap-2 mb-6">
                          <span 
                            v-for="tag in course.tags" 
                            :key="tag"
                            class="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs"
                          >
                            {{ tag }}
                          </span>
                        </div>
                        
                        <!-- Action Button -->
                        <router-link
                          :to="`/education/courses/${course.slug}`"
                          class="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-300 inline-block"
                        >
                          {{ t('courses.viewDetails') }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Carousel Navigation -->
            <div v-if="dynamicCourses.length > 1" class="flex justify-center mt-8">
              <!-- Previous Button -->
              <button
                @click="previousSlide"
                class="mr-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                :disabled="currentSlide === 0"
                :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
              >
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dots Indicator -->
              <div class="flex items-center space-x-2">
                <button
                  v-for="(_, index) in dynamicCourses"
                  :key="index"
                  @click="goToSlide(index)"
                  class="w-3 h-3 rounded-full transition-colors duration-300"
                  :class="currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'"
                />
              </div>
              
              <!-- Next Button -->
              <button
                @click="nextSlide"
                class="ml-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                :disabled="currentSlide === dynamicCourses.length - 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentSlide === dynamicCourses.length - 1 }"
              >
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- No Courses Message -->
        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clip-rule="evenodd" />
          </svg>
          <h3 class="text-2xl font-serif font-bold text-gray-800 mb-4">{{ t('courses.noCourses') }}</h3>
          <p class="text-gray-600">{{ t('courses.noCoursesDescription') }}</p>
        </div>
      </div>
    </section>

    <!-- Learning Approach -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            {{ t('education.approach.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('education.approach.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="approach in learningApproaches" :key="approach.key" class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <component :is="approach.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-lg font-semibold text-primary-800 mb-3">{{ t(`education.approach.methods.${approach.key}.title`) }}</h3>
            <p class="text-gray-600 text-sm">{{ t(`education.approach.methods.${approach.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Forms -->
    <FormsSection />

    <!-- Admission Process -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {{ t('education.admission.title') }}
          </h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            {{ t('education.admission.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, index) in admissionSteps" :key="step.key" class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold">{{ index + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">{{ t(`education.admission.steps.${step.key}.title`) }}</h3>
            <p class="text-primary-100 text-sm">{{ t(`education.admission.steps.${step.key}.description`) }}</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            class="bg-white text-primary-700 hover:bg-primary-50 border-white"
            @click="$router.push('/contact')"
          >
            {{ t('education.admission.startApplication') }}
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h, computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'
import Button from '../components/ui/Button.vue'
import FormsSection from '../components/ui/FormsSection.vue'

const { t } = useI18n()
const { getCourses } = useContent()

// Icon components
const BookIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  })
])



const HandIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'
  })
])

const EyeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  }),
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
  })
])

const UsersIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197+m13.5-9a4 4 0 11-8 0 4 4 0 018 0z'
  })
])

// Carousel state
const currentSlide = ref(0)

// Get all courses from markdown files
const allCourses = computed(() => {
  const courses = getCourses()
  return courses.map((course, index) => {
    // Use filename as slug for consistent cross-language routing
    const slug = course.metadata.filename || `course-${index + 1}`
    
    return {
      id: index + 1,
      slug,
      title: course.metadata.title || '',
      excerpt: course.metadata.excerpt || course.metadata.description || '',
      image: course.metadata.image || 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      duration: course.metadata.duration || '',
      startDate: course.metadata.startDate ? new Date(course.metadata.startDate).toLocaleDateString() : '',
      semesters: course.metadata.semesters || 1,
      level: course.metadata.level || '',
      category: course.metadata.category || 'General',
      tags: course.metadata.tags || [],
      instructor: typeof course.metadata.instructor === 'string' 
        ? { name: course.metadata.instructor, title: '', image: '' }
        : course.metadata.instructor || { name: 'Instructor', title: '', image: '' }
    }
  })
})

const dynamicCourses = computed(() => allCourses.value)

// Carousel methods
const nextSlide = () => {
  if (currentSlide.value < dynamicCourses.value.length - 1) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Auto-play functionality
let autoPlayInterval: NodeJS.Timeout | null = null

const startAutoPlay = () => {
  if (dynamicCourses.value.length > 1) {
    autoPlayInterval = setInterval(() => {
      if (currentSlide.value < dynamicCourses.value.length - 1) {
        currentSlide.value++
      } else {
        currentSlide.value = 0
      }
    }, 5000) // Change slide every 5 seconds
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})


const learningApproaches = [
  {
    key: 'practice',
    icon: HandIcon
  },
  {
    key: 'observation',
    icon: EyeIcon
  },
  {
    key: 'community',
    icon: UsersIcon
  },
  {
    key: 'mentorship',
    icon: BookIcon
  }
]

const admissionSteps = [
  {
    key: 'application'
  },
  {
    key: 'interview'
  },
  {
    key: 'orientation'
  },
  {
    key: 'enrollment'
  }
]
</script>