<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="exchange">
        <ul>
          <li class="list">
            <div  class="grid height-160">
              <div class="grid-cell u-w120">
                <img src="../assets/img/p01.jpg">
              </div>
              <div class="grid-cell">
                <p class="title">无敌美味千层大蛋糕</p>
                <span class="c-888 font-28">￥168.00</span>
              </div>
              <div class="grid-cell u-1of4 tcenter border-left">
                <div class="font-28">
                  <p class="c-f76060">20000</p>
                  <span class="c-f76060">积分</span>
                </div>
              </div>
            </div>
            <div class="btn-red">立即兑换</div>
          </li>

          <li class="list">
            <div  class="grid height-160">
              <div class="grid-cell u-w120">
                <img src="../assets/img/p01.jpg">
              </div>
              <div class="grid-cell">
                <p class="title">无敌美味千层大蛋糕</p>
                <span class="c-888 font-28">￥168.00</span>
              </div>
              <div class="grid-cell u-1of4 tcenter border-left">
                <div class="font-28">
                  <p class="c-f76060">20000</p>
                  <span class="c-f76060">积分</span>
                </div>
              </div>
            </div>
            <div class="btn-red">立即兑换</div>
          </li>

          <li class="list">
            <div  class="grid height-160">
              <div class="grid-cell u-w120">
                <img src="../assets/img/p01.jpg">
              </div>
              <div class="grid-cell">
                <p class="title">无敌美味千层大蛋糕</p>
                <span class="c-888 font-28">￥168.00</span>
              </div>
              <div class="grid-cell u-1of4 tcenter border-left">
                <div class="font-28">
                  <p class="c-f76060">20000</p>
                  <span class="c-f76060">积分</span>
                </div>
              </div>
            </div>
            <div class="btn-red">立即兑换</div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'ScoreExchange',
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
  require('../assets/scss/scoreExchange.scss')
</script>
