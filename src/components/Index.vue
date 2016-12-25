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
          <div class="login-flag">
            登录<span>|</span>注册
          </div>
        </router-link>
      </div>
      <!--轮播图-->
      <div class="swiper">
        <swipe :auto="4000">
          <swipe-item v-for="item in banner">
            <img :src="item" alt="轮播">
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
          <router-link to="user-center">
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
      <div class="product-list">
        <loadmore :bottom-method="loadTop"  :auto-fill="false" :bottom-loading-text="text.loding"  :bottom-drop-text="text.drop" :bottom-status-change="bottomStatusChange">
            <ul class="cf">
              <li v-for="item in hotCakeList" @click="gotoDetail(item.id)">
                <img :src="item.picture" alt="热卖商品">
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
     import { Swipe, SwipeItem,Loadmore  } from 'mint-ui'
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
             Loadmore 
         },
        computed: {
          ...mapGetters({
              loginFlag: 'isLogin'
            })
         },
        data () {
           return {
              loading: true,
              banner: [],
              hotCakeList: [],
              text: {
                drop: '释放更新',
                loding: '小嘿正在努力加载中'
              },
              page: {
                total: 1,
                currentPage: 1
              }
           }
         },
         mounted () {
             this.fetchData()
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
                    this.page.total = response.data.body.pagination.total
                    this.hotCakeList = this.hotCakeList.concat(response.data.body.list.map(utils.imgDetail))
                     this.text.loding = "上拉刷新"
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
                 })
                //  获取蛋糕热卖商品列表
                this.getHotCakeList()
             },
         // 点击列表去到详情
            gotoDetail (id) {
                location.href=`/#/site/detail/${id}`
            },
         // 下拉刷洗数据
            loadTop () {
                if(this.page.currentPage < this.page.total) {
                  this.page.currentPage++
                  this.getHotCakeList(this.page.currentPage)
                }else{
                    this.text.loding = "没有更多数据了！"
                }
            }   
         }
     }
     require('../assets/scss/index.scss')
</script>
