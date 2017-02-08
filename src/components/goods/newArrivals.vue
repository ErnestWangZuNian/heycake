<template>
  <div>
    <div class="container new-arrivals-container">
      <div class="new-arrivals-top">
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
            <router-link to="cake-list">
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
      </div>
      <!--产品列表-->
      <div class="new-goods-list">
        <loadmore @bottom-status-change="getLodingStatus" :auto-fill="false"  ref="loadmore" :bottom-all-loaded="loadStatus.isLoadAll">
          <ul>
            <li class="cf" v-for="item in newGoods" @click="gotoDetail(item)">
              <div class="div-img">
                <img :src="item.picture | imgDetail">
              </div>
              <div class='div-info'>
                <p><span>{{item.english_name}}</span>{{item.name}}</p>
              </div>
            </li>
          </ul>
          <div slot="bottom" class="mint-loadmore-bottom" v-show="newGoods.length > 4">
            <span v-show="loadStatus.current === 'pull' ">{{text.pull}}</span>
            <span v-show="loadStatus.current === 'drop' ">{{text.drop}}</span>
            <span v-if="loadStatus.current === 'loading'"> <!--加载中图标-->
                <spinner type="fading-circle" :size="40" color="#000" class='mint-loading-icon'></spinner>Loading...</span>
          </div>
        </loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    Spinner,
    Loadmore
  } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public.js'
  //Swipe ， SwipeItem        幻灯片
  export default {
    name: 'NewArrivals',
    components: {
      Swipe,
      SwipeItem,
      Loadmore,
      Spinner
    },
    mounted() {
      this.fetchData()
    },
    data() {
      return {
         loadStatus: {
          current: 'pull',
          isLoadAll: false
        },
        text: {
          pull: '上拉刷新',
          drop: '释放更新'
        },
        page: {
          total: 1,
          currentPage: 1
        },
        newGoods: []
      }
    },
    methods: {
      //  获取数据
      fetchData(page) {
        this.loading = true
        ajax.getDataFromApi({
          url: '/v1/goods?recommend=true',
          data: {
            per_page: 8,
            page: page
          }
        }, (response) => {
          this.loading = false
          this.newGoods = this.newGoods.concat(response.data.body.list)
          this.text.pull = "上拉刷新"
          this.$refs.loadmore.onBottomLoaded()
        })
      },
      //  获取上拉刷新各种时候的状态
      getLodingStatus(status) {
        this.loadStatus.current = status
      },
      //  下拉刷洗数据
      loadTop() {
        if (this.page.currentPage < this.page.total) {
          this.page.currentPage++
          this.fetchData(this.page.currentPage)
        } else {
          this.text.pull = "没有更多数据了！"
          this.loadStatus.isLoadAll = true
        }
      },
      //  跳转到详情页面
      gotoDetail(item) {
        if (item.product_type === 3) {
          utils.localstorageData('isCake', true)
        } else {
          utils.localstorageData('isCake', false)
        }
        location.href = `/#/site/detail/${item.id}`
      }
    },
  }
  require('../../assets/scss/newArrivals.scss')

</script>
