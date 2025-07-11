<template>
  <div class="relative">
    <div 
      ref="mapContainer" 
      class="w-full h-96 rounded-lg overflow-hidden shadow-lg"
      :class="{ 'opacity-50': loading }"
    >
    </div>
    
    <!-- Loading overlay -->
    <div 
      v-if="loading" 
      class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
        <p class="text-sm text-gray-600">{{ t('contact.map.loading') }}</p>
      </div>
    </div>

    <!-- Error state -->
    <div 
      v-if="error" 
      class="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg border border-red-200"
    >
      <div class="text-center text-red-700">
        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm">{{ t('contact.map.error') }}</p>
      </div>
    </div>

    <!-- Map attribution -->
    <div class="mt-2 text-xs text-gray-500 text-center">
      {{ t('contact.map.attribution') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const { t } = useI18n()

// Props
interface Props {
  latitude?: number
  longitude?: number
  zoom?: number
  markerTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  latitude: 26.276063884106673,
  longitude: 72.88897059273238,
  zoom: 15,
  markerTitle: 'Gau Samwardhan Ashram'
})

const mapContainer = ref<HTMLElement>()
const loading = ref(true)
const error = ref(false)
let map: L.Map | null = null

// Fix for default markers in Leaflet with Vite
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

const initializeMap = async () => {
  if (!mapContainer.value) return

  try {
    loading.value = true
    fixLeafletIcons()

    // Create map
    map = L.map(mapContainer.value, {
      center: [props.latitude, props.longitude],
      zoom: props.zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
      attributionControl: false // We'll add custom attribution
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Create custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    })

    // Add marker
    const marker = L.marker([props.latitude, props.longitude], {
      icon: customIcon
    }).addTo(map)

    // Add popup with location details
    const popupContent = `
      <div class="text-center p-2">
        <h3 class="font-semibold text-lg text-primary-800 mb-1">${props.markerTitle}</h3>
        <p class="text-sm text-gray-600 mb-2">${t('contact.addressText')}</p>
        <div class="space-y-1">
          <a 
            href="https://www.google.com/maps/search/?api=1&query=${props.latitude},${props.longitude}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-block bg-primary-600 text-white px-3 py-1 rounded text-xs hover:bg-primary-700 transition-colors"
          >
            ${t('contact.map.openInGoogleMaps')}
          </a>
          <br>
          <a 
            href="https://www.openstreetmap.org/?mlat=${props.latitude}&mlon=${props.longitude}&zoom=${props.zoom}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-block bg-secondary-600 text-white px-3 py-1 rounded text-xs hover:bg-secondary-700 transition-colors"
          >
            ${t('contact.map.openInOSM')}
          </a>
        </div>
      </div>
    `

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'custom-popup'
    })

    // Open popup by default
    marker.openPopup()

    loading.value = false

  } catch (err) {
    console.error('Map initialization error:', err)
    error.value = true
    loading.value = false
  }
}

onMounted(() => {
  // Small delay to ensure the container is properly mounted
  setTimeout(initializeMap, 100)
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
/* Custom marker styling */
:deep(.custom-marker) {
  background: transparent;
  border: none;
}

/* Custom popup styling */
:deep(.custom-popup .leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: white;
}

/* Map container */
:deep(.leaflet-container) {
  font-family: inherit;
}

/* Control styling */
:deep(.leaflet-control-zoom a) {
  background-color: white;
  color: #059669;
  border: 1px solid #d1d5db;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: #f3f4f6;
  color: #047857;
}
</style>