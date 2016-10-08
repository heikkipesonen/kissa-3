<template>
  <modal title="draw">
    <draw-layer></draw-layer>
  </modal>
</template>
<script>
import modal from './modal'
import drawLayer from './draw-layer'

export default {
  name: 'item-editor',

  components: {
    modal,
    drawLayer
  }
}
</script>
<style scoped lang="scss">

</style>
