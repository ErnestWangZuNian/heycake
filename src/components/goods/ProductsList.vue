<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container naber-cakelist" v-if="!loading">
      <div class="naber-cakelist-top">
        <!--附近门店推荐-->
      <div class="naberStore">
        <ul class="storeList">
          <li class="cf">
            <div class="img">
              <img src="../../assets/img/store.png" alt="">
            </div>
            <div class="content">
              <h2 class="name">{{naberStore._name}}</h2>
              <h3 class="tel">{{naberStore.telphone}}</h3>
              <h3 class="place"><span class="palce-name">{{naberStore._address}}</span> <span class="distance">{{naberStore._distance}}m</span></h3>
            </div>
          </li>
        </ul>
      </div>
      <!--导航-->
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
      <!--分类筛选商品-->
      <div class="select-category">
        <div class="select-category-content">
          <div class="title">分类筛选：</div>
          <div class="same-select category">
            <p class="same-select-list" @click="changeCategory">{{category.seleted}}</p>
            <ul class="same-select-list-container" v-if="category.status">
              <li class="same-select-list" :class="item.selected ? 'same-select-list-active': ''" v-for="item in category.value" @click="selectedCategory(item)">{{item.val}}</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      <!--产品列表-->
      <div class="products-list">
        <loadmore :bottom-method="loadTop" :auto-fill="false" :bottom-loading-text="text.loding" :bottom-drop-text="text.drop" :bottom-status-change="bottomStatusChange">
          <dl v-for="item in goodInfo">
            <dt>{{item.category}}</dt>
            <dd>
              <ul>
                <li class="cf" v-for="el in item.goodList" @click="gotoDetail(el)">
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
    name: 'ProductsList',
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
        goodInfo: [],
        requestData: [],
        allGoodInfo: [],
        banner: [],
        category: {
          value: [],
          seleted: '全部',
          status: false
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
          this.requestData = this.requestData.concat(response.data.body.list.map(utils.imgDetail))
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
        this.goodInfo = []
        data.forEach((val) => {
          category.push(val.parent_name)
        })
        category = utils.unique(category)
        category.forEach((val, index) => {
          if (index === 0) {
            this.category.value.push({
              val: '全部',
              selected: true
            })
          } else {
            this.category.value.push({
              val: val,
              selected: false
            })
          }
          this.goodInfo.push({
            category: val,
            goodList: []
          })
          data.forEach((val1) => {
            if (val1.parent_name === val) {
              this.goodInfo[index].goodList.push(val1)
            }
          })
        })
        this.allGoodInfo = this.allGoodInfo.concat(this.goodInfo)
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
      //    切换分类      
      changeCategory() {
        this.category.status = true
      },
      //    选中的分类
      selectedCategory(item) {
        this.category.value.forEach(val => {
          val.selected = false
        })
        this.category.seleted = item.val
        this.category.status = false
        item.selected = true
        if (item.val === '全部') {
          this.goodInfo = []
          this.goodInfo = this.goodInfo.concat(this.allGoodInfo)
        } else {
          this.allGoodInfo.forEach(val => {
            if (val.category === item.val) {
              this.goodInfo = []
              this.goodInfo.push({
                goodList: val.goodList,
                category: val.category
              })
            }
          })
        }
      },
      //    跳转到详情
      gotoDetail(item) {
        if (item.product_type === 3) {
          utils.localstorageData('isCake', true)
        } else {
          utils.localstorageData('isCake', false)
        }
        location.href = `/#/site/detail/${item.id}`
      }
    }
  }
  require('../../assets/scss/productsList.scss')

</script>