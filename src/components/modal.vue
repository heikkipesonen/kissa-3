<template>
  <div class="modal-backdrop">
    <div class="modal-window">
      <div class="modal-title">
        <h4>{{title}}</h4>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'modal',

    props: {
      title: {
        type: String
      }
    }
  }
</script>
<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0; bottom: 0; right: 0; left: 0;
  background-color: rgba(0, 0, 0, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-window {
  width: 100vh;
  height: 100vw;
  max-width: 1024px;
  max-height: 1024px;
  background-color: white;
  box-shadow: 0px 0px 80px -20px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
}

.modal-title {
  height: 50px;
  background-color: rgb(240, 240, 240);
  color: #222;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  display: flex;
  flex: 1;
}
</style>
