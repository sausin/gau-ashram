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
              <h3 class="text-xl font-semibold text-primary-800 mb-4">University Partnership</h3>
              <p class="text-gray-700 mb-4">
                Dr. Sarvapalli Radhakrishnan Rajasthan Ayurved University
              </p>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Certified course curriculum</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Academic recognition</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Research opportunities</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/8828756/pexels-photo-8828756.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
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
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            Courses Offered
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive programs designed to preserve and share traditional knowledge
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="course in courses"
            :key="course.key"
            :hover="true"
            class="h-full"
          >
            <div class="space-y-6">
              <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                <component :is="course.icon" class="w-8 h-8 text-primary-600" />
              </div>
              
              <div>
                <h3 class="text-xl font-semibold text-primary-800 mb-3">
                  {{ t(`education.courses.${course.key}`) }}
                </h3>
                <p class="text-gray-600 mb-4">{{ course.description }}</p>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Duration:</span>
                  <span class="font-medium">{{ course.duration }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Mode:</span>
                  <span class="font-medium">{{ course.mode }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Certification:</span>
                  <span class="font-medium">{{ course.certification }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">Course Highlights:</h4>
                <ul class="space-y-1">
                  <li v-for="highlight in course.highlights" :key="highlight" class="flex items-start">
                    <svg class="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-600">{{ highlight }}</span>
                  </li>
                </ul>
              </div>

              <Button variant="primary" size="md" class="w-full">
                Enroll Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Learning Approach -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            Our Learning Approach
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Combining traditional wisdom with modern teaching methodologies
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="approach in learningApproaches" :key="approach.title" class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <component :is="approach.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-lg font-semibold text-primary-800 mb-3">{{ approach.title }}</h3>
            <p class="text-gray-600 text-sm">{{ approach.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Admission Process -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Admission Process
          </h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            Simple steps to begin your journey in traditional knowledge
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, index) in admissionSteps" :key="step.title" class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold">{{ index + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">{{ step.title }}</h3>
            <p class="text-primary-100 text-sm">{{ step.description }}</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            class="bg-white text-primary-700 hover:bg-primary-50 border-white"
            @click="$router.push('/contact')"
          >
            Start Application
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useI18n } from '../composables/useI18n'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'

const { t } = useI18n()

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

const HeartIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  })
])

const BriefcaseIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2'
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
    d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z'
  })
])

const courses = [
  {
    key: 'panchgavya',
    icon: HeartIcon,
    description: 'Comprehensive training in cow-based healing and wellness practices',
    duration: '6 months',
    mode: 'Residential',
    certification: 'University Certified',
    highlights: [
      'Traditional Panchgavya preparation',
      'Therapeutic applications',
      'Clinical practice sessions',
      'Research methodology'
    ]
  },
  {
    key: 'naturopathy',
    icon: BookIcon,
    description: 'Learn natural healing methods and sustainable living practices',
    duration: '1 year',
    mode: 'Hybrid',
    certification: 'Diploma',
    highlights: [
      'Five element therapy',
      'Yoga and meditation',
      'Herbal medicine',
      'Lifestyle counseling'
    ]
  },
  {
    key: 'entrepreneurship',
    icon: BriefcaseIcon,
    description: 'Develop cow-based business models and rural enterprises',
    duration: '3 months',
    mode: 'Online/Offline',
    certification: 'Certificate',
    highlights: [
      'Business planning',
      'Marketing strategies',
      'Financial management',
      'Cooperative development'
    ]
  }
]

const learningApproaches = [
  {
    title: 'Hands-on Practice',
    description: 'Direct experience with traditional methods and techniques',
    icon: HandIcon
  },
  {
    title: 'Observation',
    description: 'Learning through careful observation of natural processes',
    icon: EyeIcon
  },
  {
    title: 'Community Learning',
    description: 'Collaborative learning with peers and experienced practitioners',
    icon: UsersIcon
  },
  {
    title: 'Mentorship',
    description: 'Guidance from experienced teachers and traditional healers',
    icon: BookIcon
  }
]

const admissionSteps = [
  {
    title: 'Application',
    description: 'Submit online application form with required documents'
  },
  {
    title: 'Interview',
    description: 'Personal interview to assess motivation and commitment'
  },
  {
    title: 'Orientation',
    description: 'Attend orientation program to understand course structure'
  },
  {
    title: 'Enrollment',
    description: 'Complete enrollment process and begin your learning journey'
  }
]
</script>