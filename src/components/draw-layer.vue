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
      imageData: false,
      currentShape: false,
      lastEvent: false
    }
  },

  props: {
    // pointer size
    cursor: {
      type: Number,
      default () {
        return 5
      }
    },

    // draw color
    color: {
      type: Array,
      default () {
        return [0, 0, 0, 1]
      }
    }
  },

  methods: {
    /**
     * flatten all shapes into one imagedata object
     * @return {[type]} [description]
     */
    flatten () {
      this.imageData = this.ctx.getImageData(0, 0, this.$el.width, this.$el.height)
    },

    /**
     * fill canvas with transparent
     * erase all drawn data
     * used before redraw
     * @return {[type]} [description]
     */
    clearCanvas () {
      this.ctx.fillStyle = 'transparent'
      if (this.imageData) {
        this.ctx.putImageData(this.imageData, 0, 0)
      } else {
        this.ctx.clearRect(0, 0, this.$el.width, this.$el.height)
      }
    },

    /**
     * draw one 'pixel' (circle) onto defined
     * position
     * @param  {object} position {x: number, y: number}
     * @return {[type]}          [description]
     */
    drawPixel (position) {
      this.ctx.beginPath()
      this.ctx.arc(position.x, position.y, this.cursor, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = `rgba(${this.color.join(', ')})`
      this.ctx.fill()
      this.ctx.closePath()
    },

    /**
     * init drawin, create new shape
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    startDraw (event) {
      this.lastEvent = getPointer(event, this.$el)
    },

    /**
     * draw pixels to a position
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    draw (event) {
      if (this.lastEvent) {
        let position = getPointer(event, this.$el)

        // define step size
        let stepx = position.x - this.lastEvent.x
        let stepy = position.y - this.lastEvent.y

        // step delta, how much has the cursor moved
        let stepd = Math.sqrt(Math.pow(stepx, 2) + Math.pow(stepy, 2))
        let maxStepSize = Math.floor(this.cursor / 3) || 1

        // if max stepsize is reached
        // interpolate between steps and add more
        // pixels in between
        if (stepd >= maxStepSize) {
          // number of steps to add
          let extraSteps = Math.ceil(stepd / maxStepSize)

          // interpolation step size
          let extraStepSize = {
            x: stepx / extraSteps,
            y: stepy / extraSteps
          }

          // draw extra
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

    /**
     * end drawing and push current shape into array of computed shapes
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    endDraw (event) {
      this.lastEvent = false
    },

    scale () {
      this.$el.width = this.$el.parentNode.offsetWidth
      this.$el.height = this.$el.parentNode.offsetHeight
    }
  },

  beforeDestroy () {
    window.removeEventListener('mouseup', this.endDraw)
  },

  mounted () {
    this.ctx = this.$el.getContext('2d')
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
