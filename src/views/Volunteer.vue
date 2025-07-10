<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('volunteer.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('volunteer.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Volunteer Description -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-serif font-bold text-primary-800 mb-6">
              Join Our Mission
            </h2>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              {{ t('volunteer.description') }}
            </p>
            <div class="bg-primary-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-primary-800 mb-4">Why Volunteer?</h3>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Make a meaningful impact on rural communities</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Learn traditional wisdom and sustainable practices</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Experience spiritual growth and inner peace</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">Connect with like-minded individuals</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Volunteers working together"
              class="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer Opportunities -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            {{ t('volunteer.opportunities') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from various volunteer opportunities that match your interests and skills
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="opportunity in opportunities"
            :key="opportunity.title"
            :hover="true"
            class="h-full"
          >
            <div class="space-y-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <component :is="opportunity.icon" class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="text-xl font-semibold text-primary-800">{{ opportunity.title }}</h3>
              <p class="text-gray-600">{{ opportunity.description }}</p>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Duration:</span>
                  <span class="font-medium">{{ opportunity.duration }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Commitment:</span>
                  <span class="font-medium">{{ opportunity.commitment }}</span>
                </div>
              </div>
              <Button variant="primary" size="sm" class="w-full">
                Apply Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- How to Join -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            {{ t('volunteer.howToJoin') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to begin your volunteer journey with us
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, index) in joinSteps" :key="step.title" class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-primary-600">{{ index + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold text-primary-800 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600 text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer Application Form -->
    <section class="py-20 bg-primary-800 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Start Your Volunteer Journey
          </h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            Fill out the application form below and we'll get in touch with you soon
          </p>
        </div>

        <div class="bg-white rounded-xl p-8">
          <VolunteerForm />
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            Volunteer Stories
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our volunteers about their transformative experiences
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white rounded-lg shadow-lg p-6">
            <blockquote class="text-gray-600 italic mb-4">
              "{{ testimonial.quote }}"
            </blockquote>
            <div class="flex items-center">
              <img
                :src="testimonial.image"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p class="font-semibold text-primary-800">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import VolunteerForm from '../components/forms/VolunteerForm.vue'

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

const BookIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
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

const UsersIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z'
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

const opportunities = computed(() => t('volunteer.opportunitiesList').map((opportunity, index) => ({
  title: ['Cow Care', 'Natural Healing', 'Sustainable Farming', 'Rural Development', 'Education'][index],
  description: opportunity,
  duration: ['2-4 weeks', '1-3 months', '3-6 months', '1-6 months', '2-8 weeks'][index],
  commitment: ['Full-time', 'Part-time', 'Flexible', 'Project-based', 'Seasonal'][index],
  icon: [HeartIcon, BookIcon, SeedlingIcon, UsersIcon, AcademicCapIcon][index]
})))

const joinSteps = computed(() => t('volunteer.joinSteps').map((step, index) => ({
  title: ['Apply', 'Interview', 'Orientation', 'Start'][index],
  description: step
})))

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Healthcare Volunteer',
    quote: 'Working with the natural healing programs has been life-changing. I learned so much about traditional medicine and helped many people.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Agriculture Volunteer',
    quote: 'The sustainable farming techniques I learned here have transformed my understanding of agriculture. It\'s amazing what we can achieve naturally.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    name: 'Anita Patel',
    role: 'Education Volunteer',
    quote: 'Teaching rural children and sharing knowledge has been incredibly rewarding. The community here is so welcoming and eager to learn.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
]
</script>