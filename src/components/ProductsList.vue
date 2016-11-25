<template>
    <div class="container">
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
        </div>
    </div>
</template>
<script>
     import { Swipe, SwipeItem } from 'mint-ui'
     export default {
         name: 'ProductsList',
         components: {
             mtSwipe: Swipe,
             mtSwipeItem: SwipeItem
         },
     }
     require('../assets/scss/productsList.scss')
</script>
