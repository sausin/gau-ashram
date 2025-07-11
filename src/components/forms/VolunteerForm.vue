<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('volunteer.form.firstName') }} *
        </label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          required
          :class="inputClasses"
          :placeholder="t('volunteer.form.placeholders.firstName')"
        />
        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
      </div>
      
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('volunteer.form.lastName') }} *
        </label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
          :class="inputClasses"
          :placeholder="t('volunteer.form.placeholders.lastName')"
        />
        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
      </div>
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
      <!-- Reserved space to prevent layout jump -->
      <div class="min-h-[65px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <div ref="turnstileContainer" class="max-w-full flex justify-center"></div>
        <div v-if="turnstile.isLoading" class="text-sm text-gray-500">
          {{ t('volunteer.form.loadingCaptcha') }}
        </div>
      </div>
      <p v-if="turnstile.error.value" class="text-sm text-red-600">{{ turnstile.error.value }}</p>
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
          <p class="text-green-800 font-medium">{{ t('volunteer.form.success') }}</p>
        </div>
      </div>
    </transition>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import Button from '../ui/Button.vue'
import { useI18n } from '../../composables/useI18n'
import { useTurnstile } from '../../composables/useTurnstile'

const { t } = useI18n()
const turnstile = useTurnstile()

const isSubmitting = ref(false)
const showSuccess = ref(false)
const turnstileContainer = ref<HTMLElement>()

const form = reactive({
  firstName: '',
  lastName: '',
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
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  interests: '',
  duration: '',
  motivation: '',
  turnstile: ''
})

const interestOptions = computed(() => {
  const labels = t('volunteer.form.interestOptions') as unknown as string[]
  const values = ['cow-care', 'healing', 'farming', 'education', 'construction', 'administration']
  return labels.map((label, index) => ({ value: values[index], label }))
})

const durationOptions = computed(() => t('volunteer.form.durationOptions') as unknown as string[])
const durationValues = ['', '1-2weeks', '1month', '2-3months', '6months', '1year']

const inputClasses = computed(() => 
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300'
)

const isFormValid = computed(() => {
  return form.firstName.trim() &&
         form.lastName.trim() &&
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
         turnstile.token.value
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    (errors as any)[key] = ''
  })

  let isValid = true

  if (!form.firstName.trim()) {
    errors.firstName = t('volunteer.form.validation.firstNameRequired')
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = t('volunteer.form.validation.lastNameRequired')
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

  if (!turnstile.token.value) {
    errors.turnstile = t('volunteer.form.validation.captchaRequired')
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
        (form as any)[key] = false
      } else if (key === 'interests') {
        (form as any)[key] = []
      } else {
        (form as any)[key] = ''
      }
    })
    
    // Reset Turnstile
    turnstile.reset()
    
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

// Initialize Turnstile when component is mounted
onMounted(async () => {
  if (turnstileContainer.value) {
    await turnstile.render(turnstileContainer.value)
  }
})
</script>