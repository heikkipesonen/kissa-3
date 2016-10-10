<template>
  <component-canvas>
    <g v-for="shape in objects">
      <curve v-for="curve in shape" :data="curve"></curve>
    </g>
  </component-canvas>
</template>

<script>
import ComponentCanvas from './component-canvas'
import Curve from './curve'
import {mapGetters} from 'vuex'

export default {
  components: {
    ComponentCanvas,
    Curve
  },

  computed: {
    ...mapGetters([
      'objects'
    ])
  }
}
</script>

<style lang="scss">
</style>
