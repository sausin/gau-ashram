import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Gau Samwardhan Ashram and Jankalyan Sanstha - Reviving India\'s Heritage'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About Us - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/initiatives',
    name: 'Initiatives',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Our Initiatives - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/healing',
    name: 'Healing',
    component: () => import('../views/Healing.vue'),
    meta: {
      title: 'Natural Healing - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('../views/Education.vue'),
    meta: {
      title: 'Education & Courses - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/education/courses/:slug',
    name: 'CourseDetail',
    component: () => import('../views/CourseDetail.vue'),
    meta: {
      title: 'Course Details - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/volunteer',
    name: 'Volunteer',
    component: () => import('../views/Volunteer.vue'),
    meta: {
      title: 'Volunteer - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
    meta: {
      title: 'Blog - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue'),
    meta: {
      title: 'Blog Post - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/donate',
    name: 'Donate',
    component: () => import('../views/Donate.vue'),
    meta: {
      title: 'Donate - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: 'Contact Us - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router