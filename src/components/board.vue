<template>
  <component-canvas>
    <layer v-for="layer in layers" :layer="layer"></layer>
  </component-canvas>
</template>

<script>
import ComponentCanvas from './component-canvas'
import layer from './layer'
import {mapGetters} from 'vuex'

export default {

  components: {
    ComponentCanvas,
    layer
  },

  computed: {
    ...mapGetters([
      'layers'
    ])
  },

  beforeUpdate () {
    console.log(this.layers)
  }
}
</script>

<style lang="scss">
</style>
