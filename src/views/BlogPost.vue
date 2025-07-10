<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
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
          
          <div class="flex items-center justify-center space-x-4">
            <img
              :src="article.author.image"
              :alt="article.author.name"
              class="w-12 h-12 rounded-full"
            />
            <div class="text-left">
              <p class="font-semibold text-gray-800">{{ article.author.name }}</p>
              <p class="text-sm text-gray-600">{{ article.author.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <article class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Featured Image -->
        <div class="mb-12">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-96 object-cover rounded-xl shadow-lg"
            loading="eager"
          />
        </div>

        <!-- Article Body -->
        <div class="prose prose-lg max-w-none">
          <div v-html="article.content"></div>
        </div>

        <!-- Tags -->
        <div class="mt-12 pt-8 border-t border-gray-200">
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

    <!-- Related Articles -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-primary-800 mb-12 text-center">
          {{ t('blog.relatedArticles') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'

const { t } = useI18n()
const route = useRoute()

// Mock article data - in real app, this would come from API/CMS
const article = ref({
  id: 1,
  slug: 'gir-cattle-conservation-climate-change',
  title: 'The Future of Gir Cattle Conservation in Climate Change Era',
  excerpt: 'Exploring how traditional breeding practices combined with modern technology can help preserve our indigenous breeds while adapting to changing environmental conditions.',
  content: `
    <p>Climate change presents unprecedented challenges to livestock farming worldwide, and India's indigenous cattle breeds are no exception. The Gir cattle, renowned for their resilience and superior milk quality, face new environmental pressures that require innovative conservation strategies.</p>
    
    <h2>Understanding the Challenge</h2>
    <p>Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are affecting traditional grazing patterns and feed availability. Our research at the Gir Cow Heritage Institute has documented significant changes in cattle behavior and productivity over the past decade.</p>
    
    <h2>Traditional Wisdom Meets Modern Science</h2>
    <p>The key to successful adaptation lies in combining centuries-old breeding wisdom with cutting-edge genetic research. Our ancestors selected Gir cattle for their natural heat tolerance and disease resistance – traits that are now more valuable than ever.</p>
    
    <blockquote>
      <p>"The Gir breed's natural adaptation to harsh climatic conditions makes it a beacon of hope for sustainable dairy farming in the face of climate change." - Dr. Rajesh Sharma, Director</p>
    </blockquote>
    
    <h2>Innovative Conservation Strategies</h2>
    <p>Our institute has developed a comprehensive approach that includes:</p>
    <ul>
      <li>Genetic marker identification for climate resilience traits</li>
      <li>Improved nutrition programs adapted to changing feed availability</li>
      <li>Water conservation techniques for sustainable farming</li>
      <li>Community-based breeding programs</li>
    </ul>
    
    <h2>Looking Forward</h2>
    <p>The future of Gir cattle conservation depends on our ability to adapt while preserving the breed's essential characteristics. Through continued research and community engagement, we can ensure that these magnificent animals continue to thrive for generations to come.</p>
  `,
  image: 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  date: 'March 15, 2025',
  readTime: 8,
  category: 'Research',
  tags: ['Climate Change', 'Conservation', 'Research', 'Sustainability'],
  author: {
    name: 'Dr. Rajesh Sharma',
    title: 'Director & Chief Researcher',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
})

const relatedArticles = ref([
  {
    id: 2,
    slug: 'traditional-ayurvedic-cattle-care',
    title: 'Traditional Ayurvedic Practices in Modern Cattle Care',
    excerpt: 'How ancient wisdom continues to inform our approach to maintaining the health and well-being of our Gir cattle.',
    image: 'https://images.pexels.com/photos/8827680/pexels-photo-8827680.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'March 10, 2025',
    readTime: 6
  },
  {
    id: 3,
    slug: 'farmer-success-story-ramesh',
    title: 'Success Story: Farmer Ramesh\'s Journey with Gir Cattle',
    excerpt: 'A local farmer shares his experience of transitioning to Gir cattle farming and the positive impact on his livelihood.',
    image: 'https://images.pexels.com/photos/12892080/pexels-photo-12892080.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'March 5, 2025',
    readTime: 5
  },
  {
    id: 4,
    slug: 'a2-milk-nutritional-benefits',
    title: 'Nutritional Benefits of A2 Milk from Gir Cows',
    excerpt: 'Understanding the unique nutritional profile of A2 milk and its health benefits for consumers.',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'February 28, 2025',
    readTime: 7
  }
])

const sharePlatforms = computed(() => [
  {
    name: 'Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  },
  {
    name: 'Twitter',
    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.value.title)}`
  },
  {
    name: 'LinkedIn',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  }
])

onMounted(() => {
  // In a real app, fetch article based on route.params.slug
  console.log('Loading article:', route.params.slug)
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