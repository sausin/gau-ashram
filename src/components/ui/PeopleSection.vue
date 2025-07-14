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
          <div class="aspect-[3/4] overflow-hidden">
            <img
              :src="getImageUrl(person.image, 'original')"
              :srcset="getImageUrl(person.image, 'srcset')"
              sizes="(max-width: 768px) 480px, 800px"
              :alt="person.name"
              class="w-full h-full object-cover object-center"
              @error="handleImageError"
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
                :src="getImageUrl(selectedPerson.image, 'original')"
                :srcset="getImageUrl(selectedPerson.image, 'srcset')"
                sizes="(max-width: 768px) 480px, 800px"
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
import { ref, computed, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useI18n } from '../../composables/useI18n'
import { useContent } from '../../composables/useContent'

const { t } = useI18n()
const { getContent } = useContent()

interface Person {
  name: string
  role: string
  image: string
  summary: string
  bio: string
  achievements?: string[]
  contact?: string
}

const selectedPerson = ref<Person | null>(null)

// Generic person icon as SVG data URL with gray background
const genericPersonIcon = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
  <rect width="256" height="256" fill="#f3f4f6"/>
  <g transform="translate(128,128)">
    <circle cx="0" cy="-20" r="32" fill="#9ca3af"/>
    <path d="M-48 60 Q-48 20 -32 20 L32 20 Q48 20 48 60 L48 80 L-48 80 Z" fill="#9ca3af"/>
  </g>
</svg>
`)

const openModal = (person: Person) => {
  selectedPerson.value = person
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedPerson.value = null
  document.body.style.overflow = 'auto'
}

const getImageUrl = (imagePath: string, type: 'original' | 'srcset'): string => {
  if (!imagePath) {
    return genericPersonIcon;
  }

  const baseName = imagePath.substring(0, imagePath.lastIndexOf('.'));
  const ext = '.webp'; // Assuming all processed images are webp

  if (type === 'srcset') {
    return [
      `${baseName}_small${ext} 480w`,
      `${baseName}_medium${ext} 800w`,
      `${baseName}_large${ext} 1024w`,
    ].join(', ');
  } else {
    return `${baseName}${ext}`; // Return the original .webp version
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src !== genericPersonIcon) {
    console.warn(`Failed to load image: ${img.src}`)
    img.src = genericPersonIcon
    // Also clear srcset to prevent conflicts
    img.srcset = ''
  }
}

const parsePeopleContent = (content: string): Person[] => {
  const people: Person[] = []
  const sections = content.split('## ').filter(section => section.trim())
  
  sections.forEach((section) => {
    const lines = section.split('\n').filter(line => line.trim())
    if (lines.length === 0) return
    
    const name = lines[0].trim()
    const person: Partial<Person> = { name }
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      // Support both English and Hindi field names
      if (trimmedLine.startsWith('- **Role**:') || trimmedLine.startsWith('- **भूमिका**:')) {
        person.role = trimmedLine.replace(/- \*\*(Role|भूमिका)\*\*:\s*/, '').trim()
      } else if (trimmedLine.startsWith('- **Image**:') || trimmedLine.startsWith('- **छवि**:')) {
        person.image = trimmedLine.replace(/- \*\*(Image|छवि)\*\*:\s*/, '').trim()
      } else if (trimmedLine.startsWith('- **Summary**:') || trimmedLine.startsWith('- **सारांश**:')) {
        person.summary = trimmedLine.replace(/- \*\*(Summary|सारांश)\*\*:\s*/, '').trim()
      } else if (trimmedLine.startsWith('- **Bio**:') || trimmedLine.startsWith('- **जीवनी**:')) {
        person.bio = trimmedLine.replace(/- \*\*(Bio|जीवनी)\*\*:\s*/, '').trim()
      } else if (trimmedLine.startsWith('- **Contact**:') || trimmedLine.startsWith('- **संपर्क**:')) {
        person.contact = trimmedLine.replace(/- \*\*(Contact|संपर्क)\*\*:\s*/, '').trim()
      } else if (trimmedLine.startsWith('- **Achievements**:') || trimmedLine.startsWith('- **उपलब्धियां**:')) {
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
    
    if (person.name && person.role && person.summary && person.bio) {
      // Make image optional - use fallback if not provided
      if (!person.image) {
        person.image = ''
      }
      people.push(person as Person)
    }
  })
  
  return people
}

// Load people content reactively using computed (follows same pattern as courses)
const people = computed(() => {
  try {
    const content = getContent('about/people')
    if (content && content.raw) {
      return parsePeopleContent(content.raw)
    }
    return []
  } catch (error) {
    console.warn('People content not found or could not be loaded:', error)
    return []
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