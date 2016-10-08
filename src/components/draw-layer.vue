<template>
  <canvas v-on:mousedown="startDraw" v-on:mousemove="draw"></canvas>
</template>

<script>
import { getPointer } from '../utils/pointer'
// import { mapActions } from 'vuex'

export default {
  name: 'draw-layer',

  data () {
    return {
      lastEvent: {
        x: 0,
        y: 0,
        timeStamp: 0
      }
    }
  },

  props: {
    cursor: {
      type: Array,
      default () {
        return [10, 10]
      }
    },

    color: {
      type: Array,
      default () {
        return [0, 0, 0, 1]
      }
    }
  },

  methods: {
    startDraw (event) {
      this.lastEvent = getPointer(event, this.$el)
    },

    draw (event) {
      if (this.lastEvent) {
        let position = getPointer(event, this.$el)

        this.context.beginPath()
        this.context.lineWidth = this.cursor[0]
        this.context.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`
        this.context.moveTo(this.lastEvent.x, this.lastEvent.y)
        this.context.lineTo(position.x, position.y)
        this.context.closePath()
        this.context.stroke()

        this.lastEvent = position
      }
    },

    endDraw (event) {
      this.lastEvent = false
    },

    scale () {
      this.$el.width = this.$el.parentNode.offsetWidth
      this.$el.height = this.$el.parentNode.offsetHeight
      this.bounds = this.$el.getBoundingClientRect()
    }
  },

  beforeDestroy () {
    window.removeEventListener('mouseup', this.endDraw)
  },

  mounted () {
    this.lastEvent = false
    this.context = this.$el.getContext('2d')
    this.scale()
    window.addEventListener('mouseup', this.endDraw)
  }
}
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0; left: 0;
  right: 0; bottom: 0;
}
</style>
