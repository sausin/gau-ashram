<template>
  <div>
    <h2 class="text-2xl font-serif font-bold text-primary-800 mb-6">
      {{ t('contact.form.title') }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.name') }} *
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          :disabled="isSubmitting"
          :class="inputClasses"
          :placeholder="t('contact.form.namePlaceholder')"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
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
          :disabled="isSubmitting"
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="consent" class="ml-2 block text-sm text-gray-700">
          {{ t('contact.form.consent') }} *
        </label>
      </div>

      <!-- Turnstile CAPTCHA -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ t('contact.form.captcha') }} *
        </label>
        <!-- Reserved space to prevent layout jump -->
        <div class="min-h-[65px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <div v-show="!turnstile.isLoading" ref="turnstileContainer" class="max-w-full flex justify-center"></div>
          <div v-show="turnstile.isLoading" class="text-sm text-gray-500">
            {{ t('contact.form.loadingCaptcha') }}
          </div>
        </div>
        <p v-if="turnstile.error" class="text-sm text-red-600">{{ turnstile.error }}</p>
        <p v-if="errors.turnstile" class="text-sm text-red-600">{{ errors.turnstile }}</p>
      </div>

      <Button
        type="submit"
        :disabled="!isFormValid || isSubmitting"
        :loading="isSubmitting"
        :loading-text="t('contact.form.sending')"
        size="lg"
        class="w-full"
        :class="{ 'opacity-50 cursor-not-allowed': !isFormValid && !isSubmitting }"
      >
        {{ t('contact.form.submit') }}
      </Button>

    </form>

    <!-- Success/Error Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full p-6"
        @click.stop
      >
        <div class="text-center">
          <!-- Success State -->
          <div v-if="submitSuccess" class="mb-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
            <p class="text-gray-600 mb-6">{{ t('contact.form.successMessage') }}</p>
          </div>

          <!-- Error State -->
          <div v-else class="mb-4">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Message Failed to Send</h3>
            <p class="text-gray-600 mb-6">{{ submitError || 'There was an error sending your message. Please try again.' }}</p>
          </div>

          <button
            @click="closeModal"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { useTurnstile } from '../../composables/useTurnstile'
import Button from '../ui/Button.vue'

const { t } = useI18n()
const turnstile = useTurnstile()

const isSubmitting = ref(false)
const showModal = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')
const turnstileContainer = ref<HTMLElement>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  turnstile: ''
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

const isFormValid = computed(() => {
  return form.name.trim() &&
         form.email.trim() &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
         form.subject &&
         form.message.trim() &&
         form.consent &&
         turnstile.token.value
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    (errors as any)[key] = ''
  })

  let isValid = true

  if (!form.name.trim()) {
    errors.name = t('contact.form.errors.nameRequired')
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

  if (!turnstile.token.value) {
    errors.turnstile = t('contact.form.errors.captchaRequired')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const response = await fetch('https://contact.gauashram.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        turnstileToken: turnstile.token.value
      })
    })

    if (response.ok) {
      // Success - reset form and show success modal
      Object.keys(form).forEach(key => {
        if (key === 'consent') {
          (form as any)[key] = false
        } else {
          (form as any)[key] = ''
        }
      })
      
      // Reset Turnstile
      turnstile.reset()
      
      submitSuccess.value = true
      showModal.value = true
    } else {
      // Error response
      const errorData = await response.text()
      submitError.value = `Server error: ${response.status}. ${errorData || 'Please try again later.'}`
      submitSuccess.value = false
      showModal.value = true
    }
    
  } catch (error) {
    console.error('Form submission error:', error)
    submitError.value = error instanceof Error ? error.message : 'Network error. Please check your connection and try again.'
    submitSuccess.value = false
    showModal.value = true
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  submitSuccess.value = false
  submitError.value = ''
}

// Initialize Turnstile when component is mounted
onMounted(async () => {
  if (turnstileContainer.value) {
    await turnstile.render(turnstileContainer.value)
  }
})
</script>