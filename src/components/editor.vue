<template>
  <modal title="draw">
    <draw-view></draw-view>
  </modal>
</template>
<script>
import modal from './modal'
import drawView from './draw-view'

export default {
  name: 'item-editor',

  components: {
    modal,
    drawView
  }
}
</script>
<style scoped lang="scss">

</style>
