<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container cakelist-container" v-if="!loading">
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
      <div class="products-list">
        <loadmore :bottom-method="loadTop" :auto-fill="false" :bottom-loading-text="text.loding" :bottom-drop-text="text.drop" :bottom-status-change="bottomStatusChange">
          <dl v-for="item in goodInfo">
            <dt>{{item.category}}</dt>
            <dd>
              <ul>
                <li class="cf" v-for="el in item.goodList" @click="gotoDetail(el.id)">
                  <img :src="el.picture">
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
        </loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    Loadmore
  } from 'mint-ui'
  import Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'cakeList',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      Loadmore
    },
    mounted() {
      this.fetchData()
      this.naberStore = utils.sessionstorageGetData('naberStore')
    },
    data() {
      return {
        loading: true,
        list: [0],
        topStatus: '',
        goodInfo: [{
          goodList: [],
          category: '蛋糕制作'
        }],
        banner: [],
        requestData: [],
        category: {
          value: [],
          seleted: '全部',
          status: false,
        },
        naberStore: {},
        text: {
          drop: '释放更新',
          loding: '小嘿正在努力加载中'
        },
        page: {
          total: 1,
          currentPage: 1
        },
      }
    },
    methods: {
      //    获取数据
      fetchData(page) {
        this.loading = true
        ajax.getDataFromApi({
          url: `/v1/goods/`,
          data: {
            store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
            per_page: 8,
            page: page
          }
        }, (response) => {
          let data = response.data.body.list.map(utils.imgDetail)
          this.requestData = this.requestData.concat(data)
          this.loading = false
          this.page.total = response.data.body.pagination.total
          this.text.loding = "上拉刷新"
          this.modifyData(this.requestData)
        })
        //      获取轮播图
        ajax.getDataFromApi({
          url: '/v1/banner',
        }, (response) => {
          this.banner = response.data.body.map(utils.imgDetail)
        })
      },
      //      整理数据
      modifyData(data) {
        let category = []
        data.forEach((val) => {
          if(val.category === '蛋糕制作') {
             this.goodInfo[0].goodList.push(val)
          }
        })
      },
      //    下拉刷洗数据
      loadTop() {
        if (this.page.currentPage < this.page.total) {
          this.page.currentPage++
          this.fetchData(this.page.currentPage)
        } else {
          this.text.loding = "没有更多数据了！"
        }
      },
      //    跳转到详情
      gotoDetail(id) {
        location.href = `/#/site/detail/${id}`
      }
    }
  }
  require('../../assets/scss/productsList.scss')

</script>