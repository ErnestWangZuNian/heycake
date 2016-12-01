<<<<<<< HEAD
<template>
    <div>
        <loading v-if="loading"></loading>
        <div class="container" v-if="!loading">
            <!--用户信息-->
            <div class="user-info">
                <div class="logo">
                    <img src="../assets/img/logo.png" alt="">
                </div>
                <router-link to='login' v-if='!loginFlag'>
                    <div class="login-flag" >
                        登录<span>|</span>注册
                    </div>
                </router-link>
            </div>
            <!--轮播图-->
            <div class="swiper">
                <swipe :auto="4000">
                    <swipe-item v-for="item in banner">
                        <img :src="item" v-lazy="item.picture" alt="轮播">
                    </swipe-item>
                </swipe>
            </div>
            <!--导航-->
            <div class="index-nav">
                <ul class="cf">
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
            <div class="product-list">
                <loadmore :bottom-method="loadTop">
                    <ul>
                        <li v-for="item in hotCakeList" @click="gotoDetail(item.id)">
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
     import { mapGetters } from 'vuex'
     export default {
         name: 'Index',
         components: {
             Swipe,
             SwipeItem,
             Loading,
             Lazyload,
             Loadmore 
         },
        computed: {
          ...mapGetters({
              loginFlag: 'isLogin'
            }),
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
            },
         // 点击列表去到详情
            gotoDetail: function (id) {
                location.href=`/#/site/detail/${id}`
            }
         }
     }
     require('../assets/scss/index.scss')
=======
<template>
    <div>
        <loading v-if="loading"></loading>
        <div class="container" v-if="!loading">
            <!--用户信息-->
            <div class="user-info">
                <div class="logo">
                    <img src="../assets/img/logo.png" alt="">
                </div>
                <router-link to='login' v-if='!loginFlag'>
                    <div class="login-flag" >
                        登录<span>|</span>注册
                    </div>
                </router-link>
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
            <div class="product-list">
                <loadmore :bottom-method="loadTop">
                    <ul>
                        <li v-for="item in hotCakeList" @click="gotoDetail(item.id)">
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
     import { mapGetters } from 'vuex'
     export default {
         name: 'Index',
         components: {
             mtSwipe: Swipe,
             mtSwipeItem: SwipeItem,
             Loading,
             Lazyload,
             Loadmore 
         },
        computed: {
          ...mapGetters({
              loginFlag: 'isLogin'
            }),
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
            },
         // 点击列表去到详情
            gotoDetail: function (id) {
                location.href=`/#/site/detail/${id}`
            }
         }
     }
     require('../assets/scss/index.scss')
>>>>>>> d8025d45a3b3e8638ba50451771f1c09e6a29f48
</script>