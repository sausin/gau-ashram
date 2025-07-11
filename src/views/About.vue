<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-earth-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('about.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('about.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Story Content from Markdown -->
        <div v-if="storyContent" class="mb-20">
          <ContentRenderer content-path="about/story" />
        </div>
        
        <!-- Original grid layout with vision -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div class="bg-primary-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-primary-800 mb-4">{{ t('about.vision') }}</h3>
              <p class="text-gray-700 leading-relaxed">{{ t('about.visionText') }}</p>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/8828756/pexels-photo-8828756.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              :alt="t('about.architectureAlt')"
              class="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Mission Content from Markdown -->
        <div v-if="missionContent" class="bg-white rounded-xl shadow-lg p-8">
          <ContentRenderer content-path="about/mission" />
        </div>
        
        <!-- Fallback to JSON mission points if markdown not available -->
        <div v-else class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-2xl font-serif font-bold text-primary-800 mb-8 text-center">
            {{ t('about.mission') }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(point, index) in missionPoints"
              :key="index"
              class="flex items-start space-x-3"
            >
              <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ point }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gradient-to-r from-primary-800 to-primary-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {{ t('about.coreValues') }}
          </h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            {{ t('about.coreValuesDescription') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ t('about.traditionalWisdom') }}</h3>
            <p class="text-primary-100">{{ t('about.traditionalWisdomDesc') }}</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ t('about.compassionateService') }}</h3>
            <p class="text-primary-100">{{ t('about.compassionateServiceDesc') }}</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ t('about.sustainableInnovation') }}</h3>
            <p class="text-primary-100">{{ t('about.sustainableInnovationDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Team -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
            {{ t('about.ourLeadership') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('about.leadershipDescription') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="member in teamMembers" :key="member.name" class="text-center">
            <div class="relative mb-6">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                loading="lazy"
              />
            </div>
            <h3 class="text-xl font-semibold text-primary-800 mb-2">{{ member.name }}</h3>
            <p class="text-primary-600 mb-3">{{ member.position }}</p>
            <p class="text-gray-600 text-sm">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'
import ContentRenderer from '../components/ui/ContentRenderer.vue'

const { t } = useI18n()
const { getContent } = useContent()

const storyContent = computed(() => getContent('about/story'))
const missionContent = computed(() => getContent('about/mission'))

const missionPoints = computed(() => t('about.missionPoints'))

const teamMembers = computed(() => [
  {
    name: t('about.team.founder.name'),
    position: t('about.team.founder.position'),
    description: t('about.team.founder.description'),
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  },
  {
    name: t('about.team.priya.name'),
    position: t('about.team.priya.position'),
    description: t('about.team.priya.description'),
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  },
  {
    name: t('about.team.ramesh.name'),
    position: t('about.team.ramesh.position'),
    description: t('about.team.ramesh.description'),
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  }
])
</script>