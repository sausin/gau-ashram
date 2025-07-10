import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Initiatives from '../views/Initiatives.vue'
import Healing from '../views/Healing.vue'
import Education from '../views/Education.vue'
import Volunteer from '../views/Volunteer.vue'
import Shop from '../views/Shop.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Lakshya Paryawaran and Jankalyan Sanstha - Reviving India\'s Heritage'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Us - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/initiatives',
    name: 'Initiatives',
    component: Initiatives,
    meta: {
      title: 'Our Initiatives - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/healing',
    name: 'Healing',
    component: Healing,
    meta: {
      title: 'Natural Healing - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/education',
    name: 'Education',
    component: Education,
    meta: {
      title: 'Education & Courses - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/volunteer',
    name: 'Volunteer',
    component: Volunteer,
    meta: {
      title: 'Volunteer - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      title: 'Products - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: {
      title: 'Blog - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPost,
    meta: {
      title: 'Blog Post - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact Us - Lakshya Paryawaran and Jankalyan Sanstha'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router