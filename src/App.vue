<template>
  <div>
    <router-view></router-view>
    <div class="toolbar">
      <button>+</button>
    </div>

    <editor></editor>
  </div>
</template>
<script>
import editor from './components/editor'

export default {
  name: 'Kissa',

  components: {
    editor
  }
}
</script>
<style lang="scss">
.toolbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  button {
    outline: none;
    background-color: rgb(64, 156, 232);
    border: none;
    color: white;
    height: 64px;
    min-width: 96px;
  }
}
</style>
