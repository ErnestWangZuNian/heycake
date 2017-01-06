<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <!--用户信息-->
      <div class="user-info">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="">
        </div>
        <div class="current-position" id="current-position" @click="openAddress">
          送至:<span>{{address.checked.name}}</span><i></i>
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
          <router-link to="/site/products-list">
            <li class="nav-list">
              <i class="icon icon1"></i>
              <p>蛋糕目录</p>
            </li>
          </router-link>
          <router-link to="/site/new-arrivals">
            <li class="nav-list">
              <i class="icon icon2"></i>
              <p>新品推荐</p>
            </li>
          </router-link>
          <router-link to="/site/user-center">
            <li class="nav-list">
              <i class="icon icon3"></i>
              <p>我的主页</p>
            </li>
          </router-link>
          <router-link to="/site/cart">
            <li class="nav-list">
              <i class="icon icon4"></i>
              <p>我的购物车</p>
            </li>
          </router-link>
        </ul>
      </div>
      <!--产品列表-->
      <div class="product-list">
          <ul class="cf">
            <li v-for="item in hotCakeList" @click="gotoDetail(item.id)">
              <img :src="item.picture" alt="热卖商品">
              <h3>{{item.english_name}}</h3>
              <h4>{{item.name}}</h4>
            </li>
          </ul>
      </div>
      <!--附近门店推荐-->
      <div class="naberStore">
        <div class="bg"></div>
        <p class="title">附近门店推荐</p>
        <ul class="storeList">
          <li class="cf" v-for="item in naberStore">
            <div class="img">
              <img src="../assets/img/store.png" alt="">
            </div>
            <div class="content">
              <h2 class="name">{{item._name}}</h2>
              <h3 class="tel">{{item.telphone}}</h3>
              <h3 class="place"><span class="palce-name">{{item._address}}</span> <span class="distance">{{item._distance}}m</span></h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--地址选择弹窗-->
    <div class="address-modal">
      <modal :show="address.show" v-on:close="addressClose">
        <div slot="header">
          <div class="store-header">
            选取地址
          </div>
        </div>
        <div slot="body">
          <div class="input-address">
            <input type="" name="searchAddress" value="" id='searchAddress' placeholder="输入小区，学校，建筑物等" v-model="address.searchKeyword"
              @change="searchAddress()">
          </div>
          <div class="noSearchAddress" v-if="address.searchKeyword===''">
            <div class="address location-address">
              <p class="title">定位地址</p>
              <ul>
                <li class="list" @click="changeArea(address.current)">{{address.current.name}}<span class="area">{{address.current.adname}}</span></li>
              </ul>
            </div>
            <div class="address narbar-address">
              <p class="title">附近地址</p>
              <ul>
                <li class="list" @click="changeArea(item)" v-for="item in address.around">{{item.name}}<span class="area">{{item.adname}}</span></li>
              </ul>
            </div>
          </div>
          <div class="searchAddress" v-if="address.searchKeyword!==''">
            <div class="address search-address">
              <p class="title">搜索地址</p>
              <ul>
                <li class="list" @click="changeArea(item)" v-for="item in address.search">{{item.name}}<span class="area">{{item.adname}}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    Loadmore
  } from 'mint-ui'
  import Vue from 'vue'
  import Loading from './Loading'
  import Modal from './common/Modal'
  import ajax from '../utils/ajax'
  import utils from '../utils/public'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Index',
    components: {
      Swipe,
      SwipeItem,
      Loading,
      Loadmore,
      Modal
    },
    computed: {
      ...mapGetters({
        loginFlag: 'isLogin'
      })
    },
    data() {
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
        },
        location: {
          lnglatXY: [],
        },
        naberStore: [],
        address: {
          show: false,
          checked: {},
          current: [],
          searchKeyword: '',
          search: [],
          around: []
        }
      }
    },
    mounted() {
      this.fetchData()
      this.getCurrentPoistion()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
//     借助高德地图获取当前定位
      getCurrentPoistion() {
        let map = null
        let geolocation = null
        let self = this
        map = new AMap.Map('container')
//     地理定位插件
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              timeout: 10000, //超过10秒后停止定位，默认：无穷大
              buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              buttonPosition: 'RB',
              extensions: 'all'
            })
            map.addControl(geolocation)
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete) //返回定位成功信息
            AMap.event.addListener(geolocation, 'error', onError) //返回定位出错信息
          })  
//      解析定位结果
        function onComplete(data) {
          let lnglatX = data.position.getLng()
          let lnglatY = data.position.getLat()
          self.address.current = data.addressComponent
          self.location.lnglatXY = [lnglatX, lnglatY]
          console.log(self.location.lnglatXY)
          self.getNaberAddres(self.location.lnglatXY)
          self.getNaberStore()
        }
//      解析定位错误信息
        function onError(data) {
          self.location.tip = "请您允许定位，这样我们才能更好为你服务"
        }
      },
//    获取热卖蛋糕列表
      getHotCakeList(data = 1) {
        ajax.getDataFromApi({
          url: '/v1/goods',
          data: {
            hot: true,
            per_page: 4,
            page: data
          }
        }, (response) => {
          if (this.loading) {
            this.loading = false
          }
          this.page.total = response.data.body.pagination.total
          this.hotCakeList = this.hotCakeList.concat(response.data.body.list.map(utils.imgDetail))
          this.text.loding = "上拉刷新"
        })
      },
//    获取推荐商品数据
      fetchData() {
        this.loading = true
//    获取轮播图
        ajax.getDataFromApi({
            url: '/v1/banner',
          }, (response) => {
            this.banner = response.data.body.map(utils.imgDetail)
          })
        this.getHotCakeList()
      },
//    点击列表去到详情
      gotoDetail(id) {
        location.href = `/#/site/detail/${id}`
      },
//    获取附近100米标注性建筑物请求地址
      getNaberAddres() {
        let location = (this.location.lnglatXY.join(','))
        let key = '6ec262982ede339365a6f9d9b5370f1b'
        let currentReadius = 100
        let radius = 1000
        let offset = 6
        let types = "银行|轻轨|公交站|餐饮|小区|酒店|学校|建筑物|风景名胜"
        Vue.http.get(
            `http://restapi.amap.com/v3/place/around?key=${key}&location=${location}&radius=${currentReadius}&offset=${offset}&types=${types}`
          )
          .then(response => {
            this.address.current = response.data.pois[0]
            this.address.checked = response.data.pois[0]
          })
        Vue.http.get(
            `http://restapi.amap.com/v3/place/around?key=${key}&location=${location}&radius=${radius}&offset=${offset}&types=${types}`
          )
          .then(response => {
            this.address.around = response.data.pois
          })
      },
//    获取云图附件门店
      getNaberStore() {
        let key = '6ec262982ede339365a6f9d9b5370f1b'
        let tableid = '586b5c10afdf520ea8f2368e'
        let center = this.location.lnglatXY.join(',')
        let radius = 5000
        this.$jsonp('http://yuntuapi.amap.com/datasearch/around', {
            key: key,
            tableid: tableid,
            center: center,
            radius: radius
          })
          .then(response => {
            this.naberStore = response.datas
          }, err => {
            console.log(err)
          })
      },
//      关闭地址弹窗
      addressClose() {
        this.address.show = false
      },
//      开启地址弹窗
      openAddress() {
        this.address.show = true
      },
//       改变定位
      changeArea(address) {
        //  this.address.current.name = address.name
        this.address.checked.name = JSON.parse(JSON.stringify(address.name))
        this.addressClose()
      },
//       搜索定位
      searchAddress() {
        console.log('wanggg')
        let map = new AMap.Map('container')
        let autocomplete = null
        map.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
            var autoOptions = {
              city: "重庆", //城市，默认全国
              input: "searchAddress" //使用联想输入的input的id
            };
            autocomplete = new AMap.Autocomplete(autoOptions);
            var placeSearch = new AMap.PlaceSearch({
              city: '重庆',
              map: map
            })
            AMap.event.addListener(autocomplete, "select", function (e) {
              //TODO 针对选中的poi实现自己的功能
              placeSearch.search(e.poi.name)
            })
          })
          // let key = '6ec262982ede339365a6f9d9b5370f1b'
          // let keywords = this.address.search
          // let types = '银行|学校|小区|建筑|公司'
          // let city = '重庆'
          // Vue.http.get(`http://restapi.amap.com/v3/place/text?key=${key}&keywords=${keywords}&types=${types}&city=${city}`)
          // .then(response => {
          //   this.address.search = response.data.pois
          // })
      }
    }
  }
  require('../assets/scss/index.scss')

</script>
