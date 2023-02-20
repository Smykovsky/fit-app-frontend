import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App.vue'

import login from '@/pages/auth/login.vue'
import register from '@/pages/auth/register.vue'

import dashboard from '@/pages/dashboard.vue'
import diet from '@/pages/diet.vue'
import progress from '@/pages/progress.vue'
import help from '@/pages/help.vue'
import contact from '@/pages/contact.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'nav-active',
    scrollBehavior(to) {
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: 'smooth'
        };
      }
    },
    routes: [
      {
        path: '/login',
        component: login,
        name: 'login'
      },
      {
        path: '/register',
        component: register,
        name: 'register'
      },
      {
        path: '',
        component: App,
        children: [
          {
            path: '',
            component: dashboard,
            name: 'dashboard'
          },
          {
            path: '/diet',
            component: diet,
            name: 'diet'
          },
          {
            path: '/progress',
            component: progress,
            name: 'progress'
          },
          {
            path: '/help',
            component: help,
            name: 'help'
          },
          {
            path: '/contact',
            component: contact,
            name: 'contact'
          },

        ]
      }
    ]
  })
}





