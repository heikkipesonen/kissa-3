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

  layers: []
}

const mutations = {
  setView (state, view) {
    state.view = view
  },

  addLayer (state, layer) {
    // let screenPositionOnCanvas = {
    //   x: x + this.view.x * this.view.scale,
    //   y: y + this.view.y + this.view.scale
    // }
    state.layers.push({
      x: -state.view.x * (1 / state.view.scale),
      y: -state.view.y * (1 / state.view.scale),
      scale: 1 / state.view.scale,
      layer: layer
    })
  },

  setEditor (state, type) {
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
