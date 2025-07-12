# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript + Vite web application for "Gau Samwardhan Ashram and Jankalyan Sanstha" - an environmental and public welfare organization focused on Gir cow heritage preservation in India. The site is multilingual (English and Hindi).

## Essential Commands

### Development
```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Type-check with vue-tsc and build for production
npm run preview  # Preview production build locally
```

### Installation
```bash
npm install      # Install dependencies
```

## Architecture Overview

### Technology Stack
- **Frontend Framework**: Vue 3 with Composition API (`<script setup>` syntax)
- **Language**: TypeScript
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS with custom theme configuration
- **UI Components**: Headless UI and Heroicons
- **Routing**: Vue Router
- **Internationalization**: Custom i18n implementation (no external library)

### Directory Structure
- `/src/components/` - Reusable Vue components organized by type:
  - `/forms/` - Form components (ContactForm, VolunteerForm)
  - `/layout/` - Layout components (Header, Footer)
  - `/ui/` - UI components (Button, Card, HeroSection, Modal)
- `/src/views/` - Page components mapped to routes
- `/src/i18n/` - Translation files (en.json, hi.json)
- `/src/composables/` - Vue composables (useI18n.ts for language switching)
- `/src/router/` - Vue Router configuration

### Key Architectural Patterns

1. **Component Organization**: Components are organized by type rather than feature, with clear separation between forms, layout, and UI components.

2. **Internationalization**: Custom i18n implementation in `composables/useI18n.ts` that:
   - Provides reactive language switching between English and Hindi
   - Uses JSON translation files in `/src/i18n/`
   - Returns `t()` function for translations and `currentLocale` for active language

3. **Styling**: 
   - Tailwind CSS with custom theme colors defined in `tailwind.config.js`:
     - primary (green shades)
     - secondary (orange shades)  
     - accent (yellow shades)
     - earth (brown shades)
   - Custom fonts: Playfair Display (serif), Inter (sans-serif)

4. **Routing**: Standard Vue Router setup with views mapped to routes in `/src/router/index.ts`

### Content Management System

The project uses a hybrid approach for managing multilingual content:

1. **UI Strings**: Stored in JSON files (`/src/i18n/en.json`, `/src/i18n/hi.json`)
   - Navigation labels, buttons, form fields
   - Short UI text and error messages
   - Accessed via `useI18n` composable

2. **Long-form Content**: Stored as Markdown files in `/src/content/{locale}/{section}/*.md`
   - Page content, blog posts, guides
   - Supports frontmatter for metadata
   - Processed at build time for optimal performance
   - Accessed via `useContent` composable

3. **Key Components**:
   - `useContent` composable: Loads and processes markdown content
   - `ContentRenderer` component: Displays markdown content with proper styling
   - Uses `gray-matter` for frontmatter parsing and `marked` for markdown rendering
   - Tailwind Typography plugin for content styling

Example markdown file structure:
```markdown
---
title: "Page Title"
description: "Page description"
author: "Author Name"
date: "2024-01-15"
---

# Content heading
Page content in markdown...
```

### Important Notes

- No testing framework is currently configured
- No linting tools (ESLint/Prettier) are set up
- The project uses TypeScript but with basic configuration
- Build process includes TypeScript type checking via `vue-tsc`
- All markdown content is processed at build time for static hosting

### Translation Guidelines

**CRITICAL**: This is a bilingual website with English and Hindi translations. When adding or editing any translation keys in `/src/i18n/en.json`, you MUST also update the corresponding Hindi translations in `/src/i18n/hi.json`. The Hindi translations should always be kept in complete parity with the English translations to maintain the bilingual functionality of the website.

### Reactive Content Translation Pattern

**IMPORTANT**: When creating components that load markdown content from `/src/content/{locale}/` directories, ALWAYS use computed properties to ensure content updates automatically when the language changes. Follow this pattern:

```typescript
// ✅ CORRECT - Use computed property for reactive content
const content = computed(() => {
  const result = getContent('path/to/content')
  return result ? processContent(result) : []
})

// ❌ INCORRECT - Loading content only once in onMounted
onMounted(() => {
  const result = getContent('path/to/content') // Won't update on language change
  someRef.value = processContent(result)
})
```

**Examples in codebase:**
- ✅ `Education.vue` - uses `computed(() => getCourses())` for reactive courses
- ✅ `Blog.vue` - uses `computed(() => getBlogPosts())` for reactive blog posts  
- ✅ `PeopleSection.vue` - uses `computed(() => getContent('about/people'))` for reactive people content

This pattern ensures that when users switch languages, the content automatically updates to show the correct translation without requiring page reload or manual content refresh.

### Course Implementation

The courses system follows the same pattern as blogs for consistency:

1. **Course Files**: Stored in `/src/content/{locale}/education/courses/*.md`
   - Each course requires frontmatter with metadata (title, description, instructor, duration, etc.)
   - **IMPORTANT**: Course filenames MUST be identical across languages (e.g., `2025-panchgavya.md` in both `en` and `hi` folders)
   
2. **Routing**: Courses are accessible at `/education/courses/{filename}`
   - The filename (without .md extension) is used as the slug
   - This ensures language switching works correctly

3. **Course Carousel**: Integrated into the Education page
   - Auto-plays every 5 seconds
   - Shows course metadata from frontmatter
   - Links to individual course detail pages

4. **Multi-language Support**: 
   - Uses filename-based routing like blogs
   - Language switching preserves the current course
   - Course content automatically switches based on selected language

Example course frontmatter:
```yaml
---
title: "Course Title"
description: "Course description"
excerpt: "Brief summary for carousel"
image: "https://example.com/course-image.jpg"
duration: "12 months"
semesters: 2
level: "Beginner to Intermediate"
type: "Therapeutic and Practical"
instructor: 
  name: "Dr. Name"
  title: "Expert Title"
  image: "https://example.com/instructor.jpg"
startDate: "2025-03-01"
category: "Health Therapy"
tags: ["tag1", "tag2", "tag3"]
---
```