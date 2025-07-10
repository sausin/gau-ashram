<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
          First Name *
        </label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          required
          :class="inputClasses"
          placeholder="Enter your first name"
        />
        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
      </div>
      
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
          Last Name *
        </label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
          :class="inputClasses"
          placeholder="Enter your last name"
        />
        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          :class="inputClasses"
          placeholder="Enter your email address"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          required
          :class="inputClasses"
          placeholder="Enter your phone number"
        />
        <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700 mb-2">
          Age *
        </label>
        <input
          id="age"
          v-model="form.age"
          type="number"
          min="18"
          max="80"
          required
          :class="inputClasses"
          placeholder="Enter your age"
        />
        <p v-if="errors.age" class="mt-1 text-sm text-red-600">{{ errors.age }}</p>
      </div>

      <div>
        <label for="occupation" class="block text-sm font-medium text-gray-700 mb-2">
          Occupation
        </label>
        <input
          id="occupation"
          v-model="form.occupation"
          type="text"
          :class="inputClasses"
          placeholder="Enter your occupation"
        />
      </div>
    </div>

    <div>
      <label for="interests" class="block text-sm font-medium text-gray-700 mb-2">
        Areas of Interest *
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
        Preferred Duration *
      </label>
      <select
        id="duration"
        v-model="form.duration"
        required
        :class="inputClasses"
      >
        <option value="">Select duration</option>
        <option value="1-2weeks">1-2 weeks</option>
        <option value="1month">1 month</option>
        <option value="2-3months">2-3 months</option>
        <option value="6months">6 months</option>
        <option value="1year">1 year or more</option>
      </select>
      <p v-if="errors.duration" class="mt-1 text-sm text-red-600">{{ errors.duration }}</p>
    </div>

    <div>
      <label for="experience" class="block text-sm font-medium text-gray-700 mb-2">
        Relevant Experience
      </label>
      <textarea
        id="experience"
        v-model="form.experience"
        rows="3"
        :class="inputClasses + ' resize-none'"
        placeholder="Tell us about any relevant experience you have..."
      ></textarea>
    </div>

    <div>
      <label for="motivation" class="block text-sm font-medium text-gray-700 mb-2">
        Why do you want to volunteer with us? *
      </label>
      <textarea
        id="motivation"
        v-model="form.motivation"
        rows="4"
        required
        :class="inputClasses + ' resize-none'"
        placeholder="Share your motivation for volunteering..."
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
        I agree to the terms and conditions and privacy policy *
      </label>
    </div>

    <Button
      type="submit"
      :loading="isSubmitting"
      loading-text="Submitting..."
      size="lg"
      class="w-full"
    >
      Submit Application
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
          <p class="text-green-800 font-medium">Thank you! Your volunteer application has been submitted successfully. We'll contact you soon.</p>
        </div>
      </div>
    </transition>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Button from '../ui/Button.vue'

const isSubmitting = ref(false)
const showSuccess = ref(false)

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
  motivation: ''
})

const interestOptions = [
  { value: 'cow-care', label: 'Cow Care & Animal Welfare' },
  { value: 'healing', label: 'Natural Healing & Therapy' },
  { value: 'farming', label: 'Sustainable Farming' },
  { value: 'education', label: 'Education & Teaching' },
  { value: 'construction', label: 'Construction & Maintenance' },
  { value: 'administration', label: 'Administration & Management' }
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
    errors.firstName = 'First name is required'
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
    isValid = false
  }

  if (!form.age || form.age < 18 || form.age > 80) {
    errors.age = 'Age must be between 18 and 80'
    isValid = false
  }

  if (form.interests.length === 0) {
    errors.interests = 'Please select at least one area of interest'
    isValid = false
  }

  if (!form.duration) {
    errors.duration = 'Please select your preferred duration'
    isValid = false
  }

  if (!form.motivation.trim()) {
    errors.motivation = 'Please share your motivation for volunteering'
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
      } else if (key === 'interests') {
        form[key] = []
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