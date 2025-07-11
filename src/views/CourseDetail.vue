<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ course?.title || t('courses.courseDetails') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ course?.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Course Content -->
    <section v-if="course" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Course Overview -->
            <div class="prose prose-lg max-w-none">
              <h2 class="text-2xl font-serif font-bold text-primary-800 mb-6">{{ t('courses.overview') }}</h2>
              <div v-html="courseContent" class="text-gray-700"></div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Course Info Card -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-8 sticky top-4">
              <h3 class="text-xl font-semibold text-primary-800 mb-4">Course Information</h3>
              
              <!-- Course Image -->
              <img
                :src="course.image"
                :alt="course.title"
                class="w-full h-48 object-cover rounded-lg mb-6"
                loading="lazy"
              />

              <div class="space-y-4">
                <!-- Duration -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">{{ t('courses.duration') }}</p>
                    <p class="font-medium">{{ course.duration }}</p>
                  </div>
                </div>

                <!-- Start Date -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">{{ t('courses.startDate') }}</p>
                    <p class="font-medium">{{ course.startDate }}</p>
                  </div>
                </div>

                <!-- Level -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">{{ t('courses.level') }}</p>
                    <p class="font-medium">{{ course.level }}</p>
                  </div>
                </div>

                <!-- Semesters -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">{{ t('courses.semesters') }}</p>
                    <p class="font-medium">{{ course.semesters }}</p>
                  </div>
                </div>

                <!-- Category -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">Category</p>
                    <p class="font-medium">{{ course.category }}</p>
                  </div>
                </div>
              </div>

              <!-- Instructor Info -->
              <div class="border-t pt-6 mt-6">
                <h4 class="text-lg font-semibold text-primary-800 mb-4">{{ t('courses.instructor') }}</h4>
                <div class="flex items-center">
                  <img
                    :src="course.instructor.image"
                    :alt="course.instructor.name"
                    class="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <p class="font-semibold text-gray-800">{{ course.instructor.name }}</p>
                    <p class="text-sm text-gray-600">{{ course.instructor.title }}</p>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="border-t pt-6 mt-6">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Related Topics</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in course.tags" 
                    :key="tag"
                    class="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Enroll Button -->
              <button class="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold mt-6 transition-colors duration-300">
                {{ t('courses.enrollNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Not Found -->
    <section v-else class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clip-rule="evenodd" />
        </svg>
        <h2 class="text-2xl font-serif font-bold text-gray-800 mb-4">Course Not Found</h2>
        <p class="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <router-link
          to="/education"
          class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Back to Education
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'

const { t } = useI18n()
const { getCourseByFilename } = useContent()
const route = useRoute()

// Get course by filename
const course = computed(() => {
  const filename = route.params.slug as string
  const courseData = getCourseByFilename(filename)
  
  if (!courseData) return null
  
  return {
    title: courseData.metadata.title || '',
    description: courseData.metadata.description || '',
    excerpt: courseData.metadata.excerpt || '',
    image: courseData.metadata.image || 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    duration: courseData.metadata.duration || '',
    startDate: courseData.metadata.startDate ? new Date(courseData.metadata.startDate).toLocaleDateString() : '',
    semesters: courseData.metadata.semesters || 1,
    level: courseData.metadata.level || '',
    category: courseData.metadata.category || 'General',
    tags: courseData.metadata.tags || [],
    instructor: typeof courseData.metadata.instructor === 'string' 
      ? { name: courseData.metadata.instructor, title: '', image: '' }
      : courseData.metadata.instructor || { name: 'Instructor', title: '', image: '' },
    content: courseData.html || ''
  }
})

// Get the course content HTML
const courseContent = computed(() => course.value?.content || '')
</script>