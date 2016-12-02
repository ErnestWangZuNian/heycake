<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="exchange">
        <ul>
          <li class="list">
            <div class="grid height-160">
              <div class="grid-cell u-w120">
                <img src="../assets/img/p01.jpg">
              </div>
              <div class="grid-cell">
                <p class="title">无敌美味千层大蛋糕</p>
                <span class="c-red font-28">￥168.00</span>
              </div>
            </div>

            <div class="grid border-top">
              <div class="grid-cell">
                <div class="star-bg"><div class="star star2"></div></div>
              </div>
              <div class="grid-cell tright"><span class="c-888">2015-11-11 12:00</span></div>
            </div>

            <div class="grid border-top height-130">
              <div class="grid-cell">
                <span class="font-24 c-888 lh-48">这款蛋糕口感特别好，店家服务也非常棒，下次买蛋糕还来这里。</span>
              </div>
            </div>
          </li>

          <li class="list">
            <div class="grid height-160">
              <div class="grid-cell u-w120">
                <img src="../assets/img/p01.jpg">
              </div>
              <div class="grid-cell">
                <p class="title">无敌美味千层大蛋糕</p>
                <span class="c-red font-28">￥168.00</span>
              </div>
            </div>

            <div class="grid border-top">
              <div class="grid-cell">
                <div class="star-bg"><div class="star star4"></div></div>
              </div>
              <div class="grid-cell tright"><span class="c-888">2015-11-11 12:00</span></div>
            </div>

            <div class="grid border-top height-130">
              <div class="grid-cell">
                <span class="font-24 c-888 lh-48">这款蛋糕口感特别好，店家服务也非常棒，下次买蛋糕还来这里。</span>
              </div>
            </div>
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
    name: 'MyComment',
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
  require('../assets/scss/myComment.scss')
</script>
