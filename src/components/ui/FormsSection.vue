<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-primary-800 mb-4">
          {{ t('education.forms.title') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ t('education.forms.subtitle') }}
        </p>
      </div>

      <!-- Forms Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="form in forms"
          :key="form.id"
          class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <!-- Form Preview -->
          <div class="relative group cursor-pointer" @click="openPreview(form)">
            <div class="aspect-w-3 aspect-h-4 bg-white m-4 rounded-lg overflow-hidden shadow-md">
              <img
                :src="form.image"
                :alt="form.title"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <!-- Preview Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="bg-white rounded-full p-3 shadow-lg">
                    <EyeIcon class="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Details -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-primary-800 mb-3">
              {{ form.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 leading-relaxed">
              {{ form.description }}
            </p>
            
            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button
                @click="openPreview(form)"
                class="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <EyeIcon class="h-4 w-4" />
                {{ t('education.forms.preview') }}
              </button>
              <button
                @click="downloadForm(form)"
                class="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ArrowDownTrayIcon class="h-4 w-4" />
                {{ t('education.forms.download') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div
      v-if="selectedForm"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click="closePreview"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-primary-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 class="text-xl font-semibold">
            {{ selectedForm.title }}
          </h3>
          <div class="flex gap-2">
            <button
              @click="downloadForm(selectedForm)"
              class="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowDownTrayIcon class="h-4 w-4" />
              {{ t('education.forms.download') }}
            </button>
            <button
              @click="closePreview"
              class="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <!-- Modal Content -->
        <div class="flex-1 overflow-auto p-6 bg-gray-50">
          <div class="bg-white rounded-lg shadow-md max-w-full mx-auto">
            <img
              :src="selectedForm.image"
              :alt="selectedForm.title"
              class="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

interface Form {
  id: string
  title: string
  description: string
  image: string
  filename: string
}

const forms: Form[] = [
  {
    id: 'foundation-course',
    title: t('education.forms.foundationCourse.title'),
    description: t('education.forms.foundationCourse.description'),
    image: '/form-foundation-course.png',
    filename: 'form-foundation-course.png'
  },
  {
    id: 'one-year',
    title: t('education.forms.oneYear.title'),
    description: t('education.forms.oneYear.description'),
    image: '/form-1-year.png',
    filename: 'form-1-year.png'
  },
  {
    id: 'pg-diploma',
    title: t('education.forms.pgDiploma.title'),
    description: t('education.forms.pgDiploma.description'),
    image: '/form-2-year-pg-diploma.png',
    filename: 'form-2-year-pg-diploma.png'
  }
]

const selectedForm = ref<Form | null>(null)

const openPreview = (form: Form) => {
  selectedForm.value = form
  document.body.style.overflow = 'hidden'
}

const closePreview = () => {
  selectedForm.value = null
  document.body.style.overflow = 'auto'
}

const downloadForm = (form: Form) => {
  // Create a temporary link element to trigger download
  const link = document.createElement('a')
  link.href = form.image
  link.download = form.filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Close modal on escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closePreview()
  }
}

document.addEventListener('keydown', handleEscape)
</script>