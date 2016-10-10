<template>
  <g :transform="style">
    <g v-for="object in layer.layer">
      <curve v-if="object.type === 'curve'" :data="object"></curve>
    </g>
  </g>
</template>
<script>
import curve from './curve'

export default {
  name: 'canvas-layer',

  components: {
    curve
  },

  props: {
    layer: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  computed: {
    style () {
      return `translate(${this.layer.x}, ${this.layer.y}) scale(${this.layer.scale}, ${this.layer.scale})`
    }
  },

  beforeUpdate () {
    console.log(this.layer)
  }
}
</script>
<style lang="scss">
</style>
