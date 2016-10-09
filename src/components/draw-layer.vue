<template>
  <canvas v-on:mousedown="startDraw" v-on:mousemove="draw"></canvas>
</template>

<script>
import { fitCurve } from '../utils/fitcurves'
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
    error: {
      type: Number,
      default () {
        return 1
      }
    },

    cursor: {
      type: Number,
      default () {
        return 5
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
     * draw one curve into canvas
     * @param  {[type]} point  [description]
     * @param  {[type]} stroke [description]
     * @param  {[type]} color  [description]
     * @return {[type]}        [description]
     */
    drawCurve (point, stroke, color) {
      this.ctx.beginPath()
      let points = [].concat.apply([], point)

      if (points.length > 4) {
        this.ctx.moveTo(points[0], points[1])
        points.splice(0, 2)
        this.ctx.bezierCurveTo(...points)
      } else {
        this.ctx.moveTo(points[0], points[1])
        this.ctx.lineTo(points[2], points[3])
      }

      this.ctx.lineWidth = stroke
      this.ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
      this.ctx.stroke()
      this.ctx.closePath()
    },

    /**
     * draw all curves contained in one shape into canvas
     * @param  {[type]} shape [description]
     * @return {[type]}       [description]
     */
    drawCurves (shape) {
      shape.curves.forEach((curve) => this.drawCurve(curve, shape.stroke, shape.color))
    },

    /**
     * draw all shapes
     * @return {[type]} [description]
     */
    drawShapes () {
      this.clearCanvas()

      if (this.currentShape) {
        this.currentShape.curves = fitCurve(this.currentShape.points, this.error)
        this.drawCurves(this.currentShape)
      }
    },

    /**
     * creta new shape
     * @param  {[type]} point [description]
     * @return {[type]}       [description]
     */
    createShape (point) {
      this.currentShape = {
        points: [[point.x, point.y]],
        stroke: this.cursor,
        color: this.color.map((c) => c)
      }

      return this.currentShape
    },

    /**
     * init drawin, create new shape
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    startDraw (event) {
      this.lastEvent = getPointer(event, this.$el)
      this.createShape(this.lastEvent)
    },

    draw (event) {
      if (this.lastEvent) {
        let position = getPointer(event, this.$el)
        this.currentShape.points.push([this.lastEvent.x, this.lastEvent.y])
        this.currentShape.points.push([position.x, position.y])
        this.drawShapes()

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
      if (this.currentShape.points && this.currentShape.points.length > 1) {
        this.currentShape.curves = fitCurve(this.currentShape.points, this.error)
        this.drawShapes()
        this.flatten()
        this.currentShape = false
      }
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
