import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// SEO and meta management
const updateSEOMeta = () => {
  const app = document.querySelector('#app')
  if (app) {
    // Set proper lang attribute
    document.documentElement.lang = 'en'
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Gir Cow Heritage Institute - Preserving India\'s indigenous cattle breeds through research, education, and sustainable farming practices in Jodhpur, Rajasthan.')

    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', 'Gir cows, indigenous cattle, Jodhpur, Rajasthan, dairy farming, sustainable agriculture, cattle breeding, A2 milk, heritage conservation')

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Gir Cow Heritage Institute - Preserving India\'s Bovine Legacy' },
      { property: 'og:description', content: 'Excellence in indigenous cattle research & education. Discover the ancient wisdom of Gir cattle breeding in Jodhpur, Rajasthan.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop' }
    ]

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`)
      if (!metaTag) {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', tag.property)
        document.head.appendChild(metaTag)
      }
      metaTag.setAttribute('content', tag.content)
    })
  }
}

// Initialize app
const app = createApp(App)
app.use(router)

// Update SEO meta on mount
updateSEOMeta()

app.mount('#app')