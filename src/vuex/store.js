import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  view: {
    x: 0,
    y: 0,
    scale: 1,
    size: {
      width: 0,
      height: 0
    }
  },

  editor: false,

  objects: []
}

const mutations = {
  setView (state, view) {
    state.view = view
  },

  addObject (state, shape) {
    state.objects.push(shape)
  },

  setEditor (state, type) {
    console.log(type)
    state.editor = type
  }
}

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
