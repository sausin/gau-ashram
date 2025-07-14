<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
        {{ t('volunteer.form.name') }} *
      </label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        :disabled="isSubmitting"
        :class="inputClasses"
        :placeholder="t('volunteer.form.placeholders.name')"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('volunteer.form.email') }} *
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          :disabled="isSubmitting"
          :class="inputClasses"
          :placeholder="t('volunteer.form.placeholders.email')"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('volunteer.form.phone') }} *
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          required
          :disabled="isSubmitting"
          :class="inputClasses"
          :placeholder="t('volunteer.form.placeholders.phone')"
        />
        <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('volunteer.form.age') }} *
        </label>
        <input
          id="age"
          v-model="form.age"
          type="number"
          min="18"
          max="80"
          required
          :disabled="isSubmitting"
          :class="inputClasses"
          :placeholder="t('volunteer.form.placeholders.age')"
        />
        <p v-if="errors.age" class="mt-1 text-sm text-red-600">{{ errors.age }}</p>
      </div>

      <div>
        <label for="occupation" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('volunteer.form.occupation') }}
        </label>
        <input
          id="occupation"
          v-model="form.occupation"
          type="text"
          :disabled="isSubmitting"
          :class="inputClasses"
          :placeholder="t('volunteer.form.placeholders.occupation')"
        />
      </div>
    </div>

    <div>
      <label for="interests" class="block text-sm font-medium text-gray-700 mb-2">
        {{ t('volunteer.form.interests') }} *
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label v-for="interest in interestOptions" :key="interest.value" class="flex items-center">
          <input
            v-model="form.interests"
            type="checkbox"
            :value="interest.value"
            :disabled="isSubmitting"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-700">{{ interest.label }}</span>
        </label>
      </div>
      <p v-if="errors.interests" class="mt-1 text-sm text-red-600">{{ errors.interests }}</p>
    </div>

    <div>
      <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
        {{ t('volunteer.form.duration') }} *
      </label>
      <select
        id="duration"
        v-model="form.duration"
        required
        :disabled="isSubmitting"
        :class="inputClasses"
      >
        <option v-for="(option, index) in durationOptions" :key="index" :value="durationValues[index] || ''">
          {{ option }}
        </option>
      </select>
      <p v-if="errors.duration" class="mt-1 text-sm text-red-600">{{ errors.duration }}</p>
    </div>

    <div>
      <label for="experience" class="block text-sm font-medium text-gray-700 mb-2">
        {{ t('volunteer.form.experience') }}
      </label>
      <textarea
        id="experience"
        v-model="form.experience"
        rows="3"
        :disabled="isSubmitting"
        :class="inputClasses + ' resize-none'"
        :placeholder="t('volunteer.form.placeholders.experience')"
      ></textarea>
    </div>

    <div>
      <label for="motivation" class="block text-sm font-medium text-gray-700 mb-2">
        {{ t('volunteer.form.motivation') }} *
      </label>
      <textarea
        id="motivation"
        v-model="form.motivation"
        rows="4"
        required
        :disabled="isSubmitting"
        :class="inputClasses + ' resize-none'"
        :placeholder="t('volunteer.form.placeholders.motivation')"
      ></textarea>
      <p v-if="errors.motivation" class="mt-1 text-sm text-red-600">{{ errors.motivation }}</p>
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
        {{ t('volunteer.form.consent') }} *
      </label>
    </div>

    <!-- Turnstile CAPTCHA -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ t('volunteer.form.captcha') }} *
        </label>
        <TurnstileWidget
          v-if="turnstileSiteKey"
          ref="turnstileWidget"
          :site-key="turnstileSiteKey"
          @success="(token) => turnstileToken = token"
          @error="(error) => turnstileError = error"
          @expired="() => turnstileToken = null"
        />
        <p v-if="turnstileError" class="text-sm text-red-600">{{ turnstileError }}</p>
        <p v-if="errors.turnstile" class="text-sm text-red-600">{{ errors.turnstile }}</p>
      </div>

    <Button
      type="submit"
      :disabled="!isFormValid || isSubmitting"
      :loading="isSubmitting"
      :loading-text="t('volunteer.form.submitting')"
      size="lg"
      class="w-full"
      :class="{ 'opacity-50 cursor-not-allowed': !isFormValid && !isSubmitting }"
    >
      {{ t('volunteer.form.submit') }}
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t('volunteer.form.successTitle') }}</h3>
          <p class="text-gray-600 mb-6">{{ t('volunteer.form.success') }}</p>
        </div>

        <!-- Error State -->
        <div v-else class="mb-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t('volunteer.form.errorTitle') }}</h3>
          <p class="text-gray-600 mb-6">{{ submitError || t('volunteer.form.errorMessage') }}</p>
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
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Button from '../ui/Button.vue'
import { useI18n } from '../../composables/useI18n'
import TurnstileWidget from '../ui/TurnstileWidget.vue'

const { t } = useI18n()

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
const turnstileToken = ref<string | null>(null)
const turnstileError = ref<string | null>(null)

const isSubmitting = ref(false)
const showModal = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  age: '',
  occupation: '',
  interests: [],
  duration: '',
  experience: '',
  motivation: '',
  consent: false
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  age: '',
  interests: '',
  duration: '',
  motivation: '',
  turnstile: ''
})

const interestOptions = computed(() => {
  const labels = t('volunteer.form.interestOptions')
  const values = ['cow-care', 'healing', 'farming', 'education', 'construction', 'administration']
  
  // Check if labels is an array
  if (Array.isArray(labels)) {
    return labels.map((label, index) => ({ value: values[index], label }))
  }
  
  // Fallback if translation is not found or not an array
  return values.map(value => ({ value, label: value }))
})

const durationOptions = computed(() => {
  const options = t('volunteer.form.durationOptions')
  return Array.isArray(options) ? options : []
})
const durationValues = ['', '1-2weeks', '1month', '2-3months', '6months', '1year']

const inputClasses = computed(() => 
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300'
)

const isFormValid = computed(() => {
  return form.name.trim() &&
         form.email.trim() &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
         form.phone.trim() &&
         form.age &&
         Number(form.age) >= 18 &&
         Number(form.age) <= 80 &&
         form.interests.length > 0 &&
         form.duration &&
         form.motivation.trim() &&
         form.consent &&
         turnstileToken.value
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    (errors as any)[key] = ''
  })

  let isValid = true

  if (!form.name.trim()) {
    errors.name = t('volunteer.form.validation.nameRequired')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('volunteer.form.validation.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('volunteer.form.validation.emailInvalid')
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = t('volunteer.form.validation.phoneRequired')
    isValid = false
  }

  if (!form.age || Number(form.age) < 18 || Number(form.age) > 80) {
    errors.age = t('volunteer.form.validation.ageRange')
    isValid = false
  }

  if (form.interests.length === 0) {
    errors.interests = t('volunteer.form.validation.interestsRequired')
    isValid = false
  }

  if (!form.duration) {
    errors.duration = t('volunteer.form.validation.durationRequired')
    isValid = false
  }

  if (!form.motivation.trim()) {
    errors.motivation = t('volunteer.form.validation.motivationRequired')
    isValid = false
  }

  if (!turnstileToken.value) {
    errors.turnstile = t('volunteer.form.validation.captchaRequired')
    isValid = false
  }

  return isValid
}

const turnstileWidget = ref<InstanceType<typeof TurnstileWidget> | null>(null)

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const response = await fetch('https://volunteer-contact.gauashram.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        age: form.age,
        occupation: form.occupation,
        interests: form.interests,
        duration: form.duration,
        experience: form.experience,
        motivation: form.motivation,
        turnstileToken: turnstileToken.value
      })
    })

    if (response.ok) {
      // Success - reset form and show success modal
      Object.keys(form).forEach(key => {
        if (key === 'consent') {
          (form as any)[key] = false
        } else if (key === 'interests') {
          (form as any)[key] = []
        } else {
          (form as any)[key] = ''
        }
      })
      
      // Reset Turnstile
      turnstileWidget.value?.reset()
      
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


// Expose form data to parent component
defineExpose({
  form
})
</script>