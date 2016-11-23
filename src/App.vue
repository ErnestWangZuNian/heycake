<template>
  <transition name="fade">
    <div id="app">
      <img src="./assets/logo.png">
      <hello></hello>
    </div>
  </transition>
</template>

<script>
import Hello from './components/Hello'
import {Toast} from 'mint-ui'
export default {
  name: 'app',
  components: {
    Hello,
    Toast
  },
  mounted () { Toast({ message: '提示信息', position: 'bottom', duration: 5000 });
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: background 2s;
    background-color: #fff;
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    background-color: red
  }
</style>