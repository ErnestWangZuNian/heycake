<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="card">
        <div class="card-bg">
          <div class="text">
            <p class="tcenter">当前积分</p>
            <p class="tcenter font-60">2325</p>
          </div>
        </div>
      </div>

      <ul>
        <li class="grid border-bottom height-105">
          <div class="grid-cell">
            <p class="font-28">操作：购买</p>
            <span class="c-888">2015-12-12 12:00:00</span>
          </div>
          <div class="grid-cell tright">
            <span class="c-red font-36">+36</span>
          </div>
        </li>

        <li class="grid border-bottom height-105">
          <div class="grid-cell">
            <p class="font-28">操作：购买</p>
            <span class="c-888">2015-12-12 12:00:00</span>
          </div>
          <div class="grid-cell tright">
            <span class="c-red font-36">+16</span>
          </div>
        </li>

        <li class="grid border-bottom height-105">
          <div class="grid-cell">
            <p class="font-28">操作：购买</p>
            <span class="c-888">2015-12-12 12:00:00</span>
          </div>
          <div class="grid-cell tright">
            <span class="c-red font-36">+52</span>
          </div>
        </li>

        <li class="grid border-bottom height-105">
          <div class="grid-cell">
            <p class="font-28">操作：积分兑换</p>
            <span class="c-888">2015-12-12 12:00:00</span>
          </div>
          <div class="grid-cell tright">
            <span class="c-396 font-36">-2000</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'MyScore',
    components: {
      Loading,
      Swipe,
      SwipeItem,
    },
    mounted () {

    },
    data () {
      return {
        loading: false,
      }
    },
    methods: {
    },
  }
  require('../assets/scss/myScore.scss')
</script>
