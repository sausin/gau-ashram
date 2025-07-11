import { computed } from 'vue'
import { useI18n } from './useI18n'

// Import all markdown files at build time (processed by our Vite plugin)
const contentModules = import.meta.glob('/src/content/**/*.md', { 
  eager: true,
  import: 'default'
})

interface ContentMetadata {
  title?: string
  description?: string
  excerpt?: string
  titleImage?: string
  author?: string | {
    name: string
    title: string
    image: string
  }
  date?: string
  readTime?: number
  category?: string
  tags?: string[]
  filename?: string
  [key: string]: any
}

interface Content {
  html: string
  metadata: ContentMetadata
  raw: string
}

// Cache for processed content
const contentCache = new Map<string, Content>()

// Initialize content cache with pre-processed content
for (const [path, content] of Object.entries(contentModules)) {
  const key = path.replace('/src/content/', '').replace('.md', '')
  const contentWithMeta = content as Content
  
  // Extract filename for blog posts to enable cross-language matching
  if (key.includes('/blog/posts/')) {
    const filename = path.split('/').pop()?.replace('.md', '') || ''
    contentWithMeta.metadata.filename = filename
  }
  
  contentCache.set(key, contentWithMeta)
}

export const useContent = () => {
  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value)
  
  // Get content by path
  const getContent = (path: string, locale?: string): Content | null => {
    const targetLocale = locale || currentLocale.value
    const fullPath = `${targetLocale}/${path}`
    
    return contentCache.get(fullPath) || null
  }
  
  // Get all content for a section
  const getContentBySection = (section: string, locale?: string): Map<string, Content> => {
    const targetLocale = locale || currentLocale.value
    const sectionPath = `${targetLocale}/${section}/`
    const results = new Map<string, Content>()
    
    for (const [path, content] of contentCache.entries()) {
      if (path.startsWith(sectionPath)) {
        const key = path.replace(sectionPath, '')
        results.set(key, content)
      }
    }
    
    return results
  }
  
  // Get all blog posts sorted by date
  const getBlogPosts = (locale?: string): Content[] => {
    const targetLocale = locale || currentLocale.value
    const postsPath = `${targetLocale}/blog/posts/`
    const posts: Content[] = []
    
    for (const [path, content] of contentCache.entries()) {
      if (path.startsWith(postsPath)) {
        posts.push(content)
      }
    }
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata.date || 0).getTime()
      const dateB = new Date(b.metadata.date || 0).getTime()
      return dateB - dateA // Sort descending (newest first)
    })
  }
  
  // Get a blog post by slug
  const getBlogPostBySlug = (slug: string, locale?: string): Content | null => {
    const targetLocale = locale || currentLocale.value
    const fullPath = `${targetLocale}/blog/posts/${slug}`
    
    return contentCache.get(fullPath) || null
  }
  
  // Get a blog post by filename (works across languages)
  const getBlogPostByFilename = (filename: string, locale?: string): Content | null => {
    const targetLocale = locale || currentLocale.value
    const posts = getBlogPosts(targetLocale)
    
    return posts.find(post => post.metadata.filename === filename) || null
  }
  
  // Extract slug from filename
  const createSlugFromFilename = (filename: string): string => {
    // Remove date prefix and extension, keep the rest as slug
    return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
  }
  
  // Check if content exists
  const hasContent = (path: string, locale?: string): boolean => {
    const targetLocale = locale || currentLocale.value
    const fullPath = `${targetLocale}/${path}`
    return contentCache.has(fullPath)
  }
  
  return {
    getContent,
    getContentBySection,
    getBlogPosts,
    getBlogPostBySlug,
    getBlogPostByFilename,
    createSlugFromFilename,
    hasContent,
    currentLocale
  }
}