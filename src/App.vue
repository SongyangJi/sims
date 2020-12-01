<template>
  <div id="app">
      <!--  路由容器 ———— 相当于组件中的插槽 -->
      <router-view/>
  </div>
</template>


<script>
  export default {
  }
</script>


<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>