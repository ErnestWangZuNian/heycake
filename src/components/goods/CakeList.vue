<template>
  <div>
    <div class="container cakelist-container">
      <div class="index-nav index-nav5">
        <ul class="cf">
          <keep-alive>
            <router-link to="index">
              <li class="nav-list">
                <i class="icon icon0"></i>
                <p>首页</p>
              </li>
            </router-link>
          </keep-alive>
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
      <!--产品列表-->
      <div class="products-list page-loadmore-wrapper">
        <loadmore :bottom-method="loadTop" :auto-fill="false"  @bottom-status-change="getLodingStatus" ref="loadmore" :bottom-all-loaded="loadStatus.isLoadAll">
          <dl>
            <dt>蛋糕制作</dt>
            <dd>
              <ul>
                <li class="cf" v-for="el in goodList" @click="gotoDetail(el.id)">
                  <img :src="el.picture | imgDetail">
                  <div>
                    <h3>{{el.english_name}}</h3>
                    <h2>{{el.name}}</h2>
                    <p>{{el.category}}</p>
                    <span>{{el.price | priceRange}}</span>
                  </div>
                </li>
              </ul>
            </dd>
          </dl>
          <div slot="bottom" class="mint-loadmore-bottom" v-show="goodList.length >= 8">
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
  import utils from '../../utils/public'
  export default {
    name: 'cakeList',
    components: {
      Swipe,
      SwipeItem,
      Spinner,      
      Loadmore
    },
    mounted() {
      this.fetchData()
      this.naberStore = utils.sessionstorageGetData('naberStore')
    },
    data() {
      return {
        goodList: [],
        naberStore: {},
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
      }
    },
    methods: {
      //  获取数据
      fetchData(page) {
        this.loading = true
        ajax.getDataFromApi({
          url: `/v1/goods/`,
          data: {
            store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
            category_id: 20,
            per_page: 8,
            page: page
          }
        }, (response) => {
          let data = response.data.body.list
          this.goodList = this.goodList.concat(data)
          this.page.total = response.data.body.pagination.total
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
          this.text.pull = '没有更多数据了'
          this.loadStatus.isLoadAll = true
        }
      },
      //  跳转到详情
      gotoDetail(id) {
        utils.localstorageData("isCake",true)
        location.href = `/#/site/detail/${id}`
      }
    }
  }
  require('../../assets/scss/productsList.scss')

</script>