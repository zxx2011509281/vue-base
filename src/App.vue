<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
/*  @import "./stylesheets/test.css";
    @import '~@/stylesheets/common.scss';
    @import '~@/stylesheets/base/reset.scss';*/
}
</script>

<style lang="scss">

  @import "~@/stylesheets/common.scss";
  @import '~@/stylesheets/base/reset.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .bll{
    color: #00f;
    font-size: 14px;
    height: px2rem(20px);
    border: 1px solid #ccc;
  }
}
</style>
