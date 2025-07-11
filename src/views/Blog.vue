<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-primary-800 mb-6">
            {{ t('blog.title') }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('blog.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Article -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="featuredArticle" class="mb-16">
          <h2 class="text-2xl font-semibold text-primary-800 mb-8">{{ t('blog.featuredArticle') }}</h2>
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="md:flex">
              <div class="md:w-1/2">
                <img
                  :src="featuredArticle.image"
                  :alt="featuredArticle.title"
                  class="w-full h-64 md:h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="md:w-1/2 p-8">
                <div class="flex items-center text-sm text-gray-500 mb-4">
                  <span>{{ featuredArticle.date }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ featuredArticle.readTime }} min read</span>
                  <span class="mx-2">•</span>
                  <span class="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {{ featuredArticle.category }}
                  </span>
                </div>
                <h3 class="text-2xl font-serif font-bold text-primary-800 mb-4">
                  {{ featuredArticle.title }}
                </h3>
                <p class="text-gray-600 mb-6 leading-relaxed">
                  {{ featuredArticle.excerpt }}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      :src="featuredArticle.author.image"
                      :alt="featuredArticle.author.name"
                      class="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p class="font-semibold text-gray-800">{{ featuredArticle.author.name }}</p>
                      <p class="text-sm text-gray-500">{{ featuredArticle.author.title }}</p>
                    </div>
                  </div>
                  <router-link
                    :to="`/blog/${featuredArticle.slug}`"
                    class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
                  >
                    {{ t('blog.readMore') }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div>
          <h2 class="text-2xl font-semibold text-primary-800 mb-8">{{ t('blog.recentArticles') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="article in articles"
              :key="article.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-48 object-cover"
                loading="lazy"
              />
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <span>{{ article.date }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ article.readTime }} min</span>
                </div>
                <div class="mb-3">
                  <span class="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {{ article.category }}
                  </span>
                </div>
                <h3 class="text-xl font-serif font-bold text-primary-800 mb-3">
                  {{ article.title }}
                </h3>
                <p class="text-gray-600 mb-4 leading-relaxed">
                  {{ article.excerpt }}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      :src="article.author.image"
                      :alt="article.author.name"
                      class="w-8 h-8 rounded-full mr-2"
                    />
                    <span class="text-sm font-medium text-gray-700">{{ article.author.name }}</span>
                  </div>
                  <router-link
                    :to="`/blog/${article.slug}`"
                    class="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors duration-300"
                  >
                    {{ t('blog.readMore') }}
                  </router-link>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
          <h3 class="text-2xl font-serif font-bold mb-4">{{ t('blog.stayUpdated') }}</h3>
          <p class="mb-6 max-w-2xl mx-auto">
            {{ t('blog.newsletterDescription') }}
          </p>
          <div class="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              :placeholder="t('blog.emailPlaceholder')"
              class="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button class="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
              {{ t('blog.subscribe') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useContent } from '../composables/useContent'

const { t } = useI18n()
const { getBlogPosts } = useContent()

// Get all blog posts sorted by date (newest first)
const allPosts = computed(() => {
  const posts = getBlogPosts()
  return posts.map((post, index) => {
    // Create slug from title for routing
    const slug = post.metadata.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `post-${index + 1}`
    
    return {
      id: index + 1,
      slug,
      title: post.metadata.title || '',
      excerpt: post.metadata.excerpt || post.metadata.description || '',
      image: post.metadata.titleImage || 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      date: post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : '',
      readTime: post.metadata.readTime || 5,
      category: post.metadata.category || 'General',
      author: typeof post.metadata.author === 'string' 
        ? { name: post.metadata.author, title: '', image: '' }
        : post.metadata.author || { name: 'Author', title: '', image: '' }
    }
  })
})

// Featured article is the first (newest) post
const featuredArticle = computed(() => allPosts.value[0] || null)

// Recent articles are the rest (excluding featured)
const articles = computed(() => allPosts.value.slice(1))
</script>