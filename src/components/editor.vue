<template>
  <div class="editor">
    <draw-view></draw-view>
  </div>
</template>
<script>
import drawView from './draw-view'

export default {
  name: 'item-editor',

  components: {
    drawView
  }
}
</script>
<style scoped lang="scss">
.editor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
