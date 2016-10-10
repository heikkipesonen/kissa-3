<template>
  <g>
    <path :style="style" :d="curve" v-for="curve in layers"></path>
  </g>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          stroke: [0, 0, 0, 1],
          strokeWidth: 0
        }
      }
    }
  },

  computed: {
    style () {
      return {
        stroke: `rgba(${this.data.stroke.join(', ')})`,
        'stroke-width': this.data.strokeWidth
      }
    },

    layers () {
      if (this.data.layers && this.data.layers.length) {
        return this.data.layers.map((curve) => {
          let m = curve.slice(0, 1)
          let c = curve.slice(1)
          return 'M' + m.join(' ') + ' C ' + c.map((cc) => cc.join(' ')).join(',')
        })
      }

      return ''
    }
  }
}
</script>
<style scoped>
path {
  fill: transparent;
}
</style>
