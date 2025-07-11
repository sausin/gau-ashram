<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section v-if="article" class="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
            <router-link to="/blog" class="hover:text-primary-600 transition-colors duration-300">
              {{ t('navigation.blog') }}
            </router-link>
            <span>•</span>
            <span>{{ article.category }}</span>
            <span>•</span>
            <span>{{ article.date }}</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ article.title }}
          </h1>
          
          <div v-if="article.author" class="flex items-center justify-center space-x-4">
            <img
              v-if="article.author.image"
              :src="article.author.image"
              :alt="article.author.name"
              class="w-12 h-12 rounded-full"
            />
            <div class="text-left">
              <p class="font-semibold text-gray-800">{{ article.author.name }}</p>
              <p v-if="article.author.title" class="text-sm text-gray-600">{{ article.author.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <article class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Featured Image -->
        <div v-if="article" class="mb-12">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-96 object-cover rounded-xl shadow-lg"
            loading="eager"
          />
        </div>

        <!-- Article Body -->
        <div class="prose prose-lg max-w-none">
          <div v-if="articleContent" v-html="articleContent.html"></div>
          <div v-else class="text-center py-12">
            <p class="text-gray-500">{{ t('blog.postNotFound') }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="article && article.tags && article.tags.length > 0" class="mt-12 pt-8 border-t border-gray-200">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Share Section -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ t('blog.share') }}</h3>
          <div class="flex space-x-4">
            <Button
              v-for="platform in sharePlatforms"
              :key="platform.name"
              :href="platform.url"
              variant="outline"
              size="sm"
            >
              {{ platform.name }}
            </Button>
          </div>
        </div>
      </div>
    </article>

    <!-- Related Articles Carousel -->
    <section v-if="relatedArticles.length > 1" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-primary-800 mb-12 text-center">
          {{ t('blog.relatedArticles') }}
        </h2>
        
        <div class="relative">
          <!-- Carousel Container -->
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                class="w-full flex-shrink-0 px-4 md:w-1/3"
              >
                <Card
                  :hover="true"
                  :image="relatedArticle.image"
                  :image-alt="relatedArticle.title"
                  @click="$router.push(`/blog/${relatedArticle.slug}`)"
                >
                  <div class="space-y-3">
                    <div class="flex items-center text-sm text-gray-500">
                      <span>{{ relatedArticle.date }}</span>
                      <span class="mx-2">•</span>
                      <span>{{ relatedArticle.readTime }} min</span>
                    </div>
                    
                    <h3 class="text-lg font-semibold text-primary-800 line-clamp-2">
                      {{ relatedArticle.title }}
                    </h3>
                    
                    <p class="text-gray-600 text-sm line-clamp-3">
                      {{ relatedArticle.excerpt }}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          <!-- Navigation Buttons -->
          <button
            v-if="relatedArticles.length > 3"
            @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors duration-300"
            aria-label="Previous articles"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            v-if="relatedArticles.length > 3"
            @click="nextSlide"
            class="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors duration-300"
            aria-label="Next articles"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <!-- Indicators -->
          <div v-if="relatedArticles.length > 3" class="flex justify-center space-x-2 mt-6">
            <button
              v-for="(_, index) in Math.ceil(relatedArticles.length / 3)"
              :key="index"
              @click="currentSlide = index * 3"
              class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="currentSlide >= index * 3 && currentSlide < (index + 1) * 3 ? 'bg-primary-600' : 'bg-gray-300'"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const { getBlogPosts, getBlogPostByFilename } = useContent()

const articleContent = ref<any>(null)
const article = ref<any>(null)
const currentFilename = ref<string>('')
const currentSlide = ref(0)
const carouselInterval = ref<number | null>(null)

// Get blog post content
const loadArticle = () => {
  const slug = route.params.slug as string
  let matchingPost = null
  
  // If we have a stored filename, try to get the post by filename first (for language changes)
  if (currentFilename.value) {
    matchingPost = getBlogPostByFilename(currentFilename.value)
  }
  
  // If no post found by filename, try to find by slug (for initial load)
  if (!matchingPost) {
    const allPosts = getBlogPosts()
    matchingPost = allPosts.find(post => {
      const postSlug = post.metadata.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return postSlug === slug
    })
    
    // Store the filename for future language changes
    if (matchingPost && matchingPost.metadata.filename) {
      currentFilename.value = matchingPost.metadata.filename
    }
  }
  
  if (matchingPost) {
    articleContent.value = matchingPost
    
    // Transform content metadata into article format
    const metadata = matchingPost.metadata
    article.value = {
      title: metadata.title || '',
      excerpt: metadata.excerpt || metadata.description || '',
      image: metadata.titleImage || 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      date: metadata.date ? new Date(metadata.date).toLocaleDateString() : '',
      readTime: metadata.readTime || 5,
      category: metadata.category || 'General',
      tags: metadata.tags || [],
      author: typeof metadata.author === 'string' 
        ? { name: metadata.author, title: '', image: '' }
        : metadata.author || { name: 'Author', title: '', image: '' }
    }
  } else {
    // Article not found, redirect to blog
    router.push('/blog')
  }
}

// Get related articles (other blog posts)
const relatedArticles = computed(() => {
  const allPosts = getBlogPosts()
  return allPosts
    .filter(post => post !== articleContent.value) // Exclude current post
    .slice(0, 3) // Take first 3
    .map((post, index) => ({
      id: index + 1,
      slug: post.metadata.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || '',
      title: post.metadata.title || '',
      excerpt: post.metadata.excerpt || post.metadata.description || '',
      image: post.metadata.titleImage || 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      date: post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : '',
      readTime: post.metadata.readTime || 5
    }))
})

const sharePlatforms = computed(() => [
  {
    name: 'Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  },
  {
    name: 'Twitter',
    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.value?.title || '')}`
  },
  {
    name: 'LinkedIn',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  }
])

// Carousel navigation functions
const nextSlide = () => {
  if (currentSlide.value < relatedArticles.value.length - 3) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = Math.max(0, relatedArticles.value.length - 3)
  }
}

// Auto-play carousel
const startCarousel = () => {
  if (relatedArticles.value.length > 3) {
    carouselInterval.value = window.setInterval(() => {
      nextSlide()
    }, 5000)
  }
}

const stopCarousel = () => {
  if (carouselInterval.value) {
    clearInterval(carouselInterval.value)
    carouselInterval.value = null
  }
}

onMounted(() => {
  loadArticle()
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})

// Watch for locale changes and reload the article
watch(locale, () => {
  loadArticle()
})

// Restart carousel when related articles change
watch(relatedArticles, () => {
  stopCarousel()
  currentSlide.value = 0
  startCarousel()
})
</script>

<style scoped>
.prose {
  @apply text-gray-700 leading-relaxed;
}

.prose h2 {
  @apply text-2xl font-serif font-bold text-primary-800 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-serif font-bold text-primary-800 mt-6 mb-3;
}

.prose p {
  @apply mb-4;
}

.prose ul {
  @apply list-disc list-inside mb-4 space-y-2;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 pl-6 italic text-lg text-gray-600 my-6;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>