<template>
  <div>
    <h2 class="text-2xl font-serif font-bold text-primary-800 mb-6">
      {{ t('contact.form.title') }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('contact.form.firstName') }} *
          </label>
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            required
            :class="inputClasses"
            :placeholder="t('contact.form.firstNamePlaceholder')"
          />
          <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
        </div>
        
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('contact.form.lastName') }} *
          </label>
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            required
            :class="inputClasses"
            :placeholder="t('contact.form.lastNamePlaceholder')"
          />
          <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.email') }} *
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          :class="inputClasses"
          :placeholder="t('contact.form.emailPlaceholder')"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.phone') }}
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          :class="inputClasses"
          :placeholder="t('contact.form.phonePlaceholder')"
        />
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.subject') }} *
        </label>
        <select
          id="subject"
          v-model="form.subject"
          required
          :class="inputClasses"
        >
          <option value="">{{ t('contact.form.selectSubject') }}</option>
          <option v-for="option in subjectOptions" :key="option.value" :value="option.value">
            {{ t(option.label) }}
          </option>
        </select>
        <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.message') }} *
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          required
          :class="inputClasses + ' resize-none'"
          :placeholder="t('contact.form.messagePlaceholder')"
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
      </div>

      <div class="flex items-center">
        <input
          id="consent"
          v-model="form.consent"
          type="checkbox"
          required
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="consent" class="ml-2 block text-sm text-gray-700">
          {{ t('contact.form.consent') }} *
        </label>
      </div>

      <Button
        type="submit"
        :loading="isSubmitting"
        :loading-text="t('contact.form.sending')"
        size="lg"
        class="w-full"
      >
        {{ t('contact.form.submit') }}
      </Button>

      <!-- Success Message -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-2"
      >
        <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <p class="text-green-800 font-medium">{{ t('contact.form.successMessage') }}</p>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from '../../composables/useI18n'
import Button from '../ui/Button.vue'

const { t } = useI18n()

const isSubmitting = ref(false)
const showSuccess = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const subjectOptions = [
  { value: 'volunteer', label: 'contact.form.subjects.volunteer' },
  { value: 'healing', label: 'contact.form.subjects.healing' },
  { value: 'education', label: 'contact.form.subjects.education' },
  { value: 'partnership', label: 'contact.form.subjects.partnership' },
  { value: 'products', label: 'contact.form.subjects.products' },
  { value: 'other', label: 'contact.form.subjects.other' }
]

const inputClasses = computed(() => 
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300'
)

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (!form.firstName.trim()) {
    errors.firstName = t('contact.form.errors.firstNameRequired')
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = t('contact.form.errors.lastNameRequired')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('contact.form.errors.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('contact.form.errors.emailInvalid')
    isValid = false
  }

  if (!form.subject) {
    errors.subject = t('contact.form.errors.subjectRequired')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t('contact.form.errors.messageRequired')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (key === 'consent') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
    
    showSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>