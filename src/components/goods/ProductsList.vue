<template>
  <div>
    <div class="container naber-cakelist">
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
      <div class="products-list  page-loadmore-wrapper">
        <loadmore :bottom-method="loadTop" :auto-fill="false" @bottom-status-change="getLodingStatus" ref="loadmore" :bottom-all-loaded="loadStatus.isLoadAll">
          <dl v-for="item in goodInfo">
            <dt>{{item.category}}</dt>
            <dd>
              <ul>
                <li class="cf" v-for="el in item.goodList" @click="gotoDetail(el)">
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
          <div slot="bottom" class="mint-loadmore-bottom" v-show="requestData.length > 8">
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
    Loadmore,
    Spinner
  } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'ProductsList',
    components: {
      Swipe,
      SwipeItem,
      Loadmore,
      Spinner
    },
    mounted() {
      this.fetchData()
      this.naberStore = utils.sessionstorageGetData('naberStore')
    },
    data() {
      return {
        goodInfo: [],
        requestData: [],
        allGoodInfo: [],
        category: {
          value: [],
          seleted: '全部',
          status: false
        },
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
        ajax.getDataFromApi({
          url: `/v1/goods/`,
          data: {
            store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
            per_page: 8,
            page: page
          }
        }, (response) => {
          let data = []
          this.requestData = this.requestData.concat(response.data.body.list)
          this.page.total = response.data.body.pagination.total
          this.text.pull = "上拉刷新"
          this.$refs.loadmore.onBottomLoaded()
          this.modifyData(this.requestData)
        })
      },
      //  整理数据
      modifyData(data) {
        let category = []
        this.goodInfo = []
        this.category.value = []
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
        // this.category.value = utils.unique(this.category.value )
        this.allGoodInfo = this.allGoodInfo.concat(this.goodInfo)
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
      //  切换分类      
      changeCategory() {
        this.category.status = true
        // this.modifyData(this.requestData)
      },
      //  选中的分类
      selectedCategory(item) {
        this.category.value.forEach(val => {
          val.selected = false
        })
        console.log(this.category.value)
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
          this.text.pull = ''
        }
       this.$refs.loadmore.onBottomLoaded()
      },
      //  跳转到详情
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
