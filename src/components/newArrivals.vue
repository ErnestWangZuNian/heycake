<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <!--轮播图-->
      <div class="swiper">
        <swipe :auto="4000">
          <swipe-item>
            <img src="../assets/img/swiper.jpg" alt="">
          </swipe-item>
          <swipe-item>
            <img src="../assets/img/swiper.jpg" alt="">
          </swipe-item>
          <swipe-item>
            <img src="../assets/img/swiper.jpg" alt="">
          </swipe-item>
        </swipe>
      </div>

      <!--导航-->
      <div class="index-nav index-nav5">
        <ul class="cf">
           <router-link to="index">
            <li class="nav-list">
              <i class="icon icon0"></i>
              <p>首页</p>
            </li>
          </router-link>
          <router-link to="products-list">
            <li class="nav-list">
              <i class="icon icon1"></i>
              <p>蛋糕目录</p>
            </li>
          </router-link>
          <router-link to="new-arrivals">
            <li class="nav-list">
              <i class="icon icon2"></i>
              <p>新品推荐</p>
            </li>
          </router-link>
          <router-link to="cart">
            <li class="nav-list">
              <i class="icon icon3"></i>
              <p>我的订单</p>
            </li>
          </router-link>
          <router-link to="cart">
            <li class="nav-list">
              <i class="icon icon4"></i>
              <p>我的购物车</p>
            </li>
          </router-link>
        </ul>
      </div>

      <!--产品列表-->
      <div class="list">
        <ul>
          <a href="javascript:;">
            <li class="cf">
              <div class="div-img">
                <img src="../assets/img/list01.jpg">
              </div>

              <div class='div-info'>
                <p><span>Mango Mousse</span>鲜芒盛宴</p>
              </div>
            </li>
          </a>

          <a href="javascript:;">
            <li class="cf">
              <div class="div-img">
                <img src="../assets/img/list01.jpg">
              </div>

              <div class='div-info'>
                <p><span>Mango Mousse</span>鲜芒盛宴</p>
              </div>
            </li>
          </a>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  //Swipe ， SwipeItem        幻灯片
  //InfiniteScroll           下拉刷新
  export default {
    name: 'NewArrivals',
    components: {
      Loading,
      Swipe,
      SwipeItem,
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
        loading: true,
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        ajax.getDataFromApi({
          url: '/v2/goods?recommend=true'
        }, (data) => {
        this.loading = false;
      },(data) => {
          this.loading = false;
        })
      }
    },
  }
  require('../assets/scss/newArrivals.scss')
</script>
