<template>
  <svg v-on:mousedown="startDraw" v-on:mousemove="draw">
    <g>
      <Curve v-for="shape in layer" :data="shape"></Curve>
      <Curve v-if="currentShape.curves" :data="currentShape"></Curve>
    </g>
  </svg>
</template>

<script>
import Curve from './curve'
import { getPointer } from '../utils/pointer'
import { fitCurve } from '../utils/fitcurves'
// import { mapActions } from 'vuex'

export default {
  name: 'draw-layer',

  components: {
    Curve
  },

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
        return 10
      }
    },

    layer: {
      type: Array,
      twoWay: true,
      default () {
        return []
      }
    },

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

  computed: {

  },

  methods: {
    /**
     * init drawin, create new shape
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    startDraw (event) {
      this.lastEvent = getPointer(event)
      this.currentShape = {
        type: 'curve',
        stroke: this.color.map((c) => c),
        strokeWidth: this.cursor,
        points: [[this.lastEvent.x, this.lastEvent.y]],
        curves: []
      }
    },

    /**
     * draw pixels to a position
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    draw (event) {
      if (this.lastEvent) {
        let position = getPointer(event)
        this.currentShape.points.push([position.x, position.y])
        if (this.currentShape && this.currentShape.points.length > 2) {
          this.currentShape.curves = fitCurve(this.currentShape.points)
        }
      }
    },

    /**
     * end drawing and push current shape into array of computed layer
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    endDraw (event) {
      this.lastEvent = false
      if (this.currentShape && this.currentShape.points.length > 2) {
        this.currentShape.curves = fitCurve(this.currentShape.points, this.error)
        this.layer.push(this.currentShape)
      }
      this.currentShape = false
    }
  },

  beforeDestroy () {
    window.removeEventListener('mouseup', this.endDraw)
  },

  mounted () {
    window.addEventListener('mouseup', this.endDraw)
  }
}
</script>

<style scoped>
svg {
  position: absolute;
  top: 0; left: 0;
  right: 0; bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
