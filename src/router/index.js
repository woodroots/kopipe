import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'


import home from '@/components/home'
import regexp from '@/components/regexp'
import tatsuya from '@/components/tatsuya'
import delexif from '@/components/delexif'
import urltotitle from '@/components/urltotitle'
import pref from '@/components/pref'
import number from '@/components/number'
import replace from '@/components/replace'
import voice from '@/components/voice'
import presen from '@/components/presen'
import matrix from '@/components/matrix'
import easing from '@/components/easing'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/regexp',
      name: 'regexp',
      component: regexp
    },
    {
      path: '/tatsuya',
      name: 'tatsuya',
      component: tatsuya
    },
    {
      path: '/delexif',
      name: 'delexif',
      component: delexif
    },
    {
      path: '/urltotitle',
      name: 'urltotitle',
      component: urltotitle
    },
    {
      path: '/pref',
      name: 'pref',
      component: pref
    },
    {
      path: '/number',
      name: 'number',
      component: number
    },
    {
      path: '/replace',
      name: 'replace',
      component: replace
    },
    {
      path: '/voice',
      name: 'voice',
      component: voice
    },
    {
      path: '/presen',
      name: 'presen',
      component: presen
    },
    {
      path: '/matrix',
      name: 'matrix',
      component: matrix
    }, {
      path: '/easing',
      name: 'easing',
      component: easing
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
