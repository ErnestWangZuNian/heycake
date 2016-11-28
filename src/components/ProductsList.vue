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
          <li class="nav-list">
            <i class="icon icon0"></i>
            <p>首页</p>
          </li>
          <li class="nav-list">
            <i class="icon icon1"></i>
            <p>蛋糕目录</p>
          </li>
          <li class="nav-list">
            <i class="icon icon2"></i>
            <p>新品推荐</p>
          </li>
          <li class="nav-list">
            <i class="icon icon3"></i>
            <p>我的订单</p>
          </li>
          <li class="nav-list">
            <i class="icon icon4"></i>
            <p>我的购物车</p>
          </li>
        </ul>
      </div>

      <!--产品列表-->
      <div class="products-list">
        <dl>
          <dt>蛋糕</dt>
          <dd>
            <ul>
              <a href="javascript:;">
                <li class="cf">
                  <img src="../assets/img/list01.jpg">
                  <div>
                    <h3>Yistory Cake</h3>
                    <h2>咖啡山丘</h2>
                    <p>咖啡山丘的文字介绍信息</p>
                    <span>￥108 - 198</span>
                  </div>
                </li>
              </a>
              <a href="javascript:;">
                <li class="cf">
                  <img src="../assets/img/list02.jpg">
                  <div>
                    <h3>Hey Monsdyt</h3>
                    <h2>榴莲忘返</h2>
                    <p>榴莲美味健康难以忘怀</p>
                    <span>￥168 - 298</span>
                  </div>
                </li>
              </a>
              <a href="javascript:;">
                <li class="cf">
                  <img src="../assets/img/list01.jpg">
                  <div>
                    <h3>Yistory Cake</h3>
                    <h2>咖啡山丘</h2>
                    <p>咖啡山丘的文字介绍信息</p>
                    <span>￥108 - 198</span>
                  </div>
                </li>
              </a>
              <a href="javascript:;">
                <li class="cf">
                  <img src="../assets/img/list02.jpg">
                  <div>
                    <h3>Hey Monsdyt</h3>
                    <h2>榴莲忘返</h2>
                    <p>榴莲美味健康难以忘怀</p>
                    <span>￥168 - 298</span>
                  </div>
                </li>
              </a>
            </ul>
          </dd>
        </dl>

        <template>
          <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
            <ul>
              <li v-for="item in list">{{ item }}</li>
            </ul>
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
          </mt-loadmore>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, Loadmore } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  //Swipe ， SwipeItem        幻灯片
  //InfiniteScroll           下拉刷新
  export default {
    name: 'ProductsList',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      Loadmore
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
        loading: true,
        list:[0],
        topStatus: '',
      }
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },

      fetchData () {
        console.log('wangggg')
        this.loading = true
        ajax.getDataFromApi({
          url: '/v2/goods?recommend=true'
        }, (data) => {
          console.log('wwwwww')
        this.loading = false;
      },(data) => {
          // console.log(data)
          console.log('wwwwww')
          this.loading = false;
          console.log('wwwwww')
        })
      }
    },
  }
  require('../assets/scss/productsList.scss')
</script>
