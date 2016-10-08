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
      type: Number,
      default () {
        return 1
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
    drawPixel (position) {
      this.context.beginPath()
      this.context.arc(position.x, position.y, this.cursor, 0, 2 * Math.PI, false)
      this.context.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`
      this.context.fill()
      this.context.closePath()
    },

    startDraw (event) {
      this.lastEvent = getPointer(event, this.$el)
    },

    draw (event) {
      if (this.lastEvent) {
        let position = getPointer(event, this.$el)
        let stepx = position.x - this.lastEvent.x
        let stepy = position.y - this.lastEvent.y

        let stepd = Math.sqrt(Math.pow(stepx, 2) + Math.pow(stepy, 2))
        let maxStepSize = Math.floor(this.cursor / 3) || 1

        if (stepd >= maxStepSize) {
          let extraSteps = Math.ceil(stepd / maxStepSize)
          let extraStepSize = {
            x: stepx / extraSteps,
            y: stepy / extraSteps
          }

          for (let i = 0; i < extraSteps; i++) {
            this.drawPixel({
              x: this.lastEvent.x + (extraStepSize.x * i),
              y: this.lastEvent.y + (extraStepSize.y * i)
            })
          }
        } else {
          this.drawPixel(position)
        }

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
