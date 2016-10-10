export default {
  viewPort (state) {
    return state.view
  },

  editor (state) {
    return state.editor
  },

  layers (state) {
    console.log(state.layers)
    return state.layers
  }
}
