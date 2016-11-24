<template>
    <div class="container">
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
                <mt-swipe-item>
                    <img src="../assets/img/swiper.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../assets/img/swiper.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../assets/img/swiper.jpg" alt="">
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
            </ul>
        </div>
    </div>
</template>
<script>
     import { Swipe, SwipeItem } from 'mint-ui'
     export default {
         name: 'Index',
         components: {
             mtSwipe: Swipe,
             mtSwipeItem: SwipeItem
         },
     }
     require('../assets/scss/index.scss')
</script>