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
                        <img :src="item |imgDetail" alt="">
                        <span>{{item |imgDetail}}</span>
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
                <ul>
                    <li>
                        <img src="" alt="">
                        <h3>Rose Lover</h3>
                        <h4>玫瑰情人</h4>
                    </li>
                    <li>
                        <img src="" alt="">
                        <h3>Rose Lover</h3>
                        <h4>玫瑰情人</h4>
                    </li>
                    <li>
                        <img src="" alt="">
                        <h3>Rose Lover</h3>
                        <h4>玫瑰情人</h4>
                    </li>
                    <li>
                        <img src="" alt="">
                        <h3>Rose Lover</h3>
                        <h4>玫瑰情人</h4>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
     import { Swipe, SwipeItem } from 'mint-ui'
     import Loading from './Loading'
     import ajax from '../utils/ajax'
     export default {
         name: 'Index',
         components: {
             mtSwipe: Swipe,
             mtSwipeItem: SwipeItem,
             Loading
         },
         data () {
           return {
              loading: true,
              banner: [],
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
             fetchData () {
                 // 加载动画
                 this.loading = true
                //  获取轮播图
                 ajax.getDataFromApi({
                     url: '/v1/banner',
                 },(response) => {
                     this.loading = false
                     this.banner = response.data.body
                     console.log(this.banner)
                 })
             }
         }
     }
     require('../assets/scss/index.scss')
</script>