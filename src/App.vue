<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './components/header'
import myFooter from './components/footer'
export default {
  components: {
    myHeader, myFooter
  },
  name: 'App'
}
</script>

<style lang="scss">
  @import "./style/style";
</style>
