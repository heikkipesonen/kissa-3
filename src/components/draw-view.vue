<template>
<div class="draw-wrapper">

  <draw-layer :color="color" :cursor="brush"></draw-layer>

  <div class="draw-tools">
    <div :class="'color-picker ' + (isSelected(color) ? 'selected' : '')" v-for="color in colors" :style="getColorPickerStyle(color)" v-on:click="setColor(color)"></div>
  </div>
</div>
</template>
<script>
import drawLayer from './draw-layer'

export default {
  components: {
    drawLayer
  },

  data () {
    return {
      brush: 10,

      color: [0, 0, 0, 1],

      colors: [
        [0, 0, 0, 1],
        [0, 0, 0, 0.5],
        [255, 255, 255, 1],
        [187, 4, 245, 1],
        [89, 187, 237, 1],
        [37, 245, 13, 1]
      ],

      brushes: [
        1,
        5,
        10,
        15,
        20
      ]
    }
  },

  methods: {
    getColorPickerStyle (color) {
      return {
        'background-color': `rgba(${color.join(', ')})`
      }
    },

    setColor (color) {
      this.color = color
    },

    isSelected (color) {
      return color.join('') === this.color.join('')
    }
  }
}
</script>
<style scoped lang="scss">
.draw-wrapper {
  position: relative;
  flex: 1;
}

.draw-container {
}

.draw-tools {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  text-align: center;
}

.color-picker {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.3);
  border: 4px solid;
  border-color: transparent;
  position: relative;
  transition: 0.3s;

  &.selected {
    transform: scale3d(1.2, 1.2, 1);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.8);
  }
}

</style>
