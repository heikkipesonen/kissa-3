import Vue from 'vue'
import Vuerouter from 'vue-router'
import Board from './components/board'

Vue.use(Vuerouter)
/* eslint-disable no-new */
const router = new Vuerouter({
  routes: [
    {
      path: '/',
      component: Board
    }
  ]
})

export default router
