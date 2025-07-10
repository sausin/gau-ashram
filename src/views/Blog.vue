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
        <div class="mb-16">
          <h2 class="text-2xl font-semibold text-primary-800 mb-8">Featured Article</h2>
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
                  <a
                    href="#"
                    class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
                  >
                    {{ t('blog.readMore') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div>
          <h2 class="text-2xl font-semibold text-primary-800 mb-8">Recent Articles</h2>
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
                  <a
                    href="#"
                    class="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors duration-300"
                  >
                    {{ t('blog.readMore') }}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
          <h3 class="text-2xl font-serif font-bold mb-4">Stay Updated</h3>
          <p class="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest insights, research findings, and stories from the field.
          </p>
          <div class="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button class="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const featuredArticle = {
  id: 1,
  title: 'The Future of Gir Cattle Conservation in Climate Change Era',
  excerpt: 'Exploring how traditional breeding practices combined with modern technology can help preserve our indigenous breeds while adapting to changing environmental conditions.',
  image: 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  date: 'March 15, 2025',
  readTime: 8,
  category: 'Research',
  author: {
    name: 'Dr. Rajesh Sharma',
    title: 'Director & Chief Researcher',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
}

const articles = [
  {
    id: 2,
    title: 'Traditional Ayurvedic Practices in Modern Cattle Care',
    excerpt: 'How ancient wisdom continues to inform our approach to maintaining the health and well-being of our Gir cattle.',
    image: 'https://images.pexels.com/photos/8827680/pexels-photo-8827680.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'March 10, 2025',
    readTime: 6,
    category: 'Healthcare',
    author: {
      name: 'Dr. Priya Patel',
      title: 'Head of Conservation',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  },
  {
    id: 3,
    title: 'Success Story: Farmer Ramesh\'s Journey with Gir Cattle',
    excerpt: 'A local farmer shares his experience of transitioning to Gir cattle farming and the positive impact on his livelihood.',
    image: 'https://images.pexels.com/photos/12892080/pexels-photo-12892080.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'March 5, 2025',
    readTime: 5,
    category: 'Community',
    author: {
      name: 'Mr. Anil Kumar',
      title: 'Community Outreach',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  },
  {
    id: 4,
    title: 'Nutritional Benefits of A2 Milk from Gir Cows',
    excerpt: 'Understanding the unique nutritional profile of A2 milk and its health benefits for consumers.',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'February 28, 2025',
    readTime: 7,
    category: 'Nutrition',
    author: {
      name: 'Dr. Rajesh Sharma',
      title: 'Director & Chief Researcher',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  },
  {
    id: 5,
    title: 'Preserving Indigenous Knowledge: Oral Traditions in Cattle Farming',
    excerpt: 'Documenting and preserving the rich oral traditions and indigenous knowledge systems related to cattle care.',
    image: 'https://images.pexels.com/photos/8828756/pexels-photo-8828756.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'February 25, 2025',
    readTime: 6,
    category: 'Heritage',
    author: {
      name: 'Dr. Priya Patel',
      title: 'Head of Conservation',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  },
  {
    id: 6,
    title: 'Innovation in Breeding: Genetic Markers and Selection',
    excerpt: 'Latest advances in genetic marker technology and how they\'re revolutionizing our breeding programs.',
    image: 'https://images.pexels.com/photos/4466492/pexels-photo-4466492.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'February 20, 2025',
    readTime: 8,
    category: 'Research',
    author: {
      name: 'Dr. Rajesh Sharma',
      title: 'Director & Chief Researcher',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  },
  {
    id: 7,
    title: 'Building Sustainable Dairy Cooperatives in Rural Rajasthan',
    excerpt: 'How we\'re empowering local communities through cooperative dairy farming initiatives.',
    image: 'https://images.pexels.com/photos/4468081/pexels-photo-4468081.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: 'February 15, 2025',
    readTime: 5,
    category: 'Community',
    author: {
      name: 'Mr. Anil Kumar',
      title: 'Community Outreach',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  }
]
</script>