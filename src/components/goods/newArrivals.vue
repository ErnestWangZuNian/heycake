<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <!--轮播图-->
      <div class="swiper">
        <swipe :auto="4000">
          <swipe-item>
            <img src="../../assets/img/swiper.jpg" alt="">
          </swipe-item>
          <swipe-item>
            <img src="../../assets/img/swiper.jpg" alt="">
          </swipe-item>
          <swipe-item>
            <img src="../../assets/img/swiper.jpg" alt="">
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
          <router-link  to="user-center">
            <li class="nav-list">
              <i class="icon icon3"></i>
              <p>我的主页</p>
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
                <li class="cf" v-for="item in newGoods" @click="gotoDetail(item)">
              <div class="div-img">
                <img :src="item.picture">
              </div>

              <div class='div-info'>
                <p><span>{{item.english_name}}</span>{{item.name}}</p>
              </div>
            </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
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
        newGoods: []
      }
    },
    methods: {
      //  获取数据
      fetchData () {
        this.loading = true
        ajax.getDataFromApi({
          url: '/v1/goods?recommend=true'
        }, (response) => {
        this.loading = false
        let data = response.data.body.list
        data.map(val => {
          val.picture = `/attachment/${val.picture}`
          return val
        })
        this.newGoods = data
      })
      },
      //跳转到详情页面
      gotoDetail (item) {
        location.href=`/#/site/detail/${item.id}`
      }
    },
  }
  require('../../assets/scss/newArrivals.scss')
</script>
