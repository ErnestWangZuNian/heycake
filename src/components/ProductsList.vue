<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <!--轮播图-->
      <div class="swiper">
        <swipe :auto="4000">
          <swipe-item v-for="item in banner">
            <img :src="item">
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
      <div class="products-list">
        <dl v-for="item in goodInfo"  >
          <dt>{{item.category}}</dt>
          <dd>
            <loadmore :bottom-method="loadTop"  :auto-fill="false" :bottom-loading-text="text.loding"  :bottom-drop-text="text.drop" :bottom-status-change="bottomStatusChange">
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
            </loadmore>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem,Loadmore  } from 'mint-ui'
import Loading from './Loading'
import ajax from '../utils/ajax.js'
import utils from '../utils/public'
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
    },
    data() {
        return {
            loading: true,
            list: [0],
            topStatus: '',
            goodInfo: [],
            banner: []
        }
    },
    methods: {
        //  获取数据
        fetchData() {
            this.loading = true
            ajax.getDataFromApi({
                url: '/v1/goods'
            }, (response) => {
                let data =response.data.body.list.map(utils.imgDetail)
                this.loading = false
                this.modifyData(data)
            })
             //  获取轮播图
            ajax.getDataFromApi({
              url: '/v1/banner',
            },(response) => {
              this.banner = response.data.body.map(utils.imgDetail)
            })
        },
        // 整理数据
        modifyData(data) {
            let category = []
            data.forEach((val) => {
                category.push(val.parent_name)
            })
            category = utils.unique(category)
            category.forEach((val, index) => {
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
        },
        // 跳转到详情
        gotoDetail (id) {
          location.href=`/#/site/detail/${id}`
        }
    }
}
require('../assets/scss/productsList.scss')
</script>
