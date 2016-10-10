const actions = {
  setView ({commit}, view) {
    commit('setView', view)
  },

  addObject ({commit}, object) {
    commit('addObject', object)
  },

  setEditor ({commit}, type) {
    commit('setEditor', type)
  }
}

export default actions
