<template>
    <div>
        <loading v-if="loading"></loading>
        <div class="container" v-if="!loading">
            <!--用户信息-->
            <div class="user-info">
                <div class="logo">
                    <img src="../assets/img/logo.png" alt="">
                </div>
                <div class="login-flag">登录<span>|</span>注册</div>
            </div>
            <!--轮播图-->
            <div class="swiper">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in banner">
                        <img :src="item" v-lazy="item.picture" alt="轮播">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!--导航-->
            <div class="index-nav">
                <ul class="cf">
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
            <div class="product-list">
                <loadmore :bottom-method="loadTop">
                    <ul>
                        <li v-for="item in hotCakeList">
                            <img :src="item.picture" alt="热卖商品" v-lazy="item.picture" :bottom-distance="200">
                            <h3>{{item.english_name}}</h3>
                            <h4>{{item.name}}</h4>
                        </li>
                    </ul>
                </loadmore>
            </div>
        </div>
    </div>
</template>
<script>
     import { Swipe, SwipeItem,Lazyload, Loadmore  } from 'mint-ui'
     import Loading from './Loading'
     import ajax from '../utils/ajax'
     import utils from '../utils/public'
     export default {
         name: 'Index',
         components: {
             mtSwipe: Swipe,
             mtSwipeItem: SwipeItem,
             Loading,
             Lazyload,
             Loadmore 
         },
         events: {
          bottomStatusChange () {
              console.log('我京东到家就')
          }
         },
         data () {
           return {
              loading: true,
              banner: [],
              hotCakeList: []
           }
         },
         mounted () {
             this.fetchData()
         },
         filters: {
            imgDetail: function (value) {
              let str = '/attachment/' + value + '/'
              return str
            }
         },
         watch: {
            '$route': 'fetchData'
         },
         methods: {
           // 获取热卖蛋糕列表
              getHotCakeList (data=1) {
                 ajax.getDataFromApi({
                    url: '/v1/goods',
                    data: {
                        hot: true,
                        per_page: 4,
                        page: data
                    }
                },(response) => {
                    if(this.loading) {
                      this.loading = false
                    }
                    this.hotCakeList = response.data.body.list.map(utils.imgDetail)
                })
              },
          //  获取数据
             fetchData () {
                 // 加载动画
                 this.loading = true
                //  获取轮播图
                 ajax.getDataFromApi({
                    url: '/v1/banner',
                 },(response) => {
                    this.banner = response.data.body.map(utils.imgDetail)
                    console.log(this.banner)
                 })
                //  获取蛋糕热卖商品列表
                this.getHotCakeList()
             },
         // 下拉刷新
            loadTop () {
                console.log('wangg')
                // this.getHotCakeList(2)
            }
         }
     }
     require('../assets/scss/index.scss')
</script>