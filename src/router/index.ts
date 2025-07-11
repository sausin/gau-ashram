import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Initiatives from '../views/Initiatives.vue'
import Healing from '../views/Healing.vue'
import Education from '../views/Education.vue'
import CourseDetail from '../views/CourseDetail.vue'
import Volunteer from '../views/Volunteer.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'
import Contact from '../views/Contact.vue'
import Donate from '../views/Donate.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Gau Samwardhan Ashram and Jankalyan Sanstha - Reviving India\'s Heritage'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Us - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/initiatives',
    name: 'Initiatives',
    component: Initiatives,
    meta: {
      title: 'Our Initiatives - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/healing',
    name: 'Healing',
    component: Healing,
    meta: {
      title: 'Natural Healing - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/education',
    name: 'Education',
    component: Education,
    meta: {
      title: 'Education & Courses - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/education/courses/:slug',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: {
      title: 'Course Details - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/volunteer',
    name: 'Volunteer',
    component: Volunteer,
    meta: {
      title: 'Volunteer - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: {
      title: 'Blog - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPost,
    meta: {
      title: 'Blog Post - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/donate',
    name: 'Donate',
    component: Donate,
    meta: {
      title: 'Donate - Gau Samwardhan Ashram and Jankalyan Sanstha'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
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