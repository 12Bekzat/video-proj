import AddPerson from '@/components/AddPerson.vue'
import Login from '@/components/Login.vue'
import Profile from '@/components/Profile.vue'
import VideoComponent from '@/components/VideoComponent.vue'
import { useMainStore } from '@/stores/useMainStore'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => AddPerson
    },
    {
      path: '/video',
      name: 'Video',
      component: () => VideoComponent
    },
    {
      path: '/login',
      name: 'Login',
      component: () => Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => Profile
    },
  ],
})

function isAuthenticated() {
  const store = useMainStore()
  const { current } = storeToRefs(store)
  return !!current.value
}

// router.beforeEach((to, from, next) => {
//   if (!isAuthenticated()) {
//     return next({ name: 'Login' })
//   }
//   next()
// })

export default router
