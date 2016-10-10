const actions = {
  setView ({commit}, view) {
    commit('setView', view)
  },

  addLayer ({commit}, object) {
    commit('addLayer', object)
  },

  setEditor ({commit}, type) {
    commit('setEditor', type)
  }
}

export default actions
