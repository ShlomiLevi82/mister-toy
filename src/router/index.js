import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import activityApp from '../views/ActivityIndex.vue'
import activityDetails from '../views/ActivityDetails.vue'
import activityEdit from '../views/ActivityEdit.vue'
import dashboard from '../views/dashboard.vue'
import join from '../views/Join.vue'
import UserPage from '../views/UserPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/activity',
      name: 'activityApp',
      component: activityApp,
    },
    {
      path: '/activity/:id',
      name: 'activityDetails',
      component: activityDetails,
    },
    {
      path: '/activity/edit/:id?',
      name: 'activityEdit',
      component: activityEdit,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/join',
      name: 'join',
      component: join,
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: UserPage,
    },
  ],
})

export default router
