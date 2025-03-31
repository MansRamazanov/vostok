import { createRouter, createWebHistory } from 'vue-router'
import FormPage from '@/pages/form-page/FormPage.vue'
import ResultPage from '@/pages/result-page/ResultPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: FormPage
    },
    {
      path: '/result',
      component: ResultPage
    }
  ]
}) 