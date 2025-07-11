<template>
  <section class="py-16 bg-gradient-to-b from-green-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          {{ t('about.people.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ t('about.people.subtitle') }}
        </p>
      </div>

      <!-- People Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="person in people"
          :key="person.name"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          @click="openModal(person)"
        >
          <div class="aspect-w-3 aspect-h-4">
            <img
              :src="person.image"
              :alt="person.name"
              class="w-full h-64 object-cover object-center"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ person.name }}
            </h3>
            <p class="text-primary-600 font-medium mb-3">
              {{ person.role }}
            </p>
            <p class="text-gray-600 text-sm">
              {{ person.summary }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedPerson"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-gray-900">
            {{ selectedPerson.name }}
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <img
                :src="selectedPerson.image"
                :alt="selectedPerson.name"
                class="w-full rounded-lg shadow-md"
              />
            </div>
            <div class="md:w-2/3">
              <p class="text-primary-600 font-semibold text-lg mb-4">
                {{ selectedPerson.role }}
              </p>
              <div class="prose prose-sm max-w-none">
                <p class="text-gray-700 mb-4">{{ selectedPerson.bio }}</p>
                
                <div v-if="selectedPerson.achievements && selectedPerson.achievements.length > 0">
                  <h4 class="font-semibold text-gray-900 mb-2">
                    {{ t('about.people.achievements') }}
                  </h4>
                  <ul class="list-disc list-inside text-gray-700 mb-4">
                    <li v-for="achievement in selectedPerson.achievements" :key="achievement">
                      {{ achievement }}
                    </li>
                  </ul>
                </div>

                <!-- Contact details temporarily hidden -->
                <!-- <div v-if="selectedPerson.contact" class="mt-4">
                  <p class="text-sm text-gray-600">
                    <strong>{{ t('about.people.contact') }}:</strong> 
                    <a 
                      :href="selectedPerson.contact.startsWith('http') ? selectedPerson.contact : `mailto:${selectedPerson.contact}`"
                      class="text-primary-600 hover:text-primary-700 ml-1"
                    >
                      {{ selectedPerson.contact }}
                    </a>
                  </p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useI18n } from '../../composables/useI18n'
import { useContent } from '../../composables/useContent'

const { t } = useI18n()

interface Person {
  name: string
  role: string
  image: string
  summary: string
  bio: string
  achievements?: string[]
  contact?: string
}

const people = ref<Person[]>([])
const selectedPerson = ref<Person | null>(null)

const openModal = (person: Person) => {
  selectedPerson.value = person
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedPerson.value = null
  document.body.style.overflow = 'auto'
}

const parsePeopleContent = (content: string): Person[] => {
  const people: Person[] = []
  const sections = content.split('## ').filter(section => section.trim())
  
  sections.forEach(section => {
    const lines = section.split('\n').filter(line => line.trim())
    if (lines.length === 0) return
    
    const name = lines[0].trim()
    const person: Partial<Person> = { name }
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('- **Role**:')) {
        person.role = trimmedLine.replace('- **Role**:', '').trim()
      } else if (trimmedLine.startsWith('- **Image**:')) {
        person.image = trimmedLine.replace('- **Image**:', '').trim()
      } else if (trimmedLine.startsWith('- **Summary**:')) {
        person.summary = trimmedLine.replace('- **Summary**:', '').trim()
      } else if (trimmedLine.startsWith('- **Bio**:')) {
        person.bio = trimmedLine.replace('- **Bio**:', '').trim()
      } else if (trimmedLine.startsWith('- **Contact**:')) {
        person.contact = trimmedLine.replace('- **Contact**:', '').trim()
      } else if (trimmedLine.startsWith('- **Achievements**:')) {
        // Start collecting achievements
        const achievementIndex = lines.indexOf(line)
        const achievements: string[] = []
        for (let i = achievementIndex + 1; i < lines.length; i++) {
          const achLine = lines[i].trim()
          if (achLine.startsWith('  - ')) {
            achievements.push(achLine.replace('  - ', '').trim())
          } else if (achLine.startsWith('- **')) {
            break
          }
        }
        person.achievements = achievements
      }
    })
    
    if (person.name && person.role && person.image && person.summary && person.bio) {
      people.push(person as Person)
    }
  })
  
  return people
}

onMounted(async () => {
  try {
    const content = await useContent('about/people')
    if (content) {
      people.value = parsePeopleContent(content)
    }
  } catch (error) {
    console.warn('People content not found or could not be loaded')
  }
})

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  return () => {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>