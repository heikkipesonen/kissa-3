<template>
  <div>
    <router-view></router-view>
    <div class="toolbar" v-if="!editor">
      <button @click="toggleEditor">+</button>
    </div>

    <drawView v-if="editor"></drawView>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import drawView from './components/draw-view'

export default {
  name: 'Kissa',

  components: {
    drawView
  },

  computed: {
    ...mapGetters([
      'editor'
    ])
  },

  methods: {
    ...mapActions([
      'setEditor'
    ]),

    toggleEditor () {
      this.editor ? this.setEditor(false) : this.setEditor(true)
    }
  },

  mounted () {
    console.log(this)
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
