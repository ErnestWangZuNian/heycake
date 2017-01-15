<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <!--用户信息-->
      <div class="user-info">
        <div class="logo">
          <img src="../../assets/img/logo.png" alt="">
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
              <img src="../../assets/img/store.png" alt="">
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
              @input="searchAddress()">
          </div>
          <div class="noSearchAddress" v-if="address.searchKeyword===''">
            <div class="address location-address">
              <p class="title">定位地址</p>
              <ul>
                <li class="list" @click="changeArea(address.current)">{{address.current.name}}<span class="area">{{address.current.adname}}</span></li>
              </ul>
            </div>
            <div class="address narbar-address" v-if="address.myAddressIsShow">
              <p class="title">我的收货地址</p>
              <ul>
                <li class="list" @click="changeArea(item)" v-for="item in address.myAddress">{{item.detail_area}}<span class="area">{{item.county_name}}</span></li>
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
    Loadmore,
    Toast,
    Indicator
  } from 'mint-ui'
  import Vue from 'vue'
  import Loading from '../common/Loading'
  import Modal from '../common/Modal'
  import ajax from '../../utils/ajax'
  import utils from '../../utils/public'
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
      Modal,
      Indicator,
      Toast
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
          around: [],
          myAddress: [],
          myAddressIsShow: false,
        }
      }
    },
    mounted() {
      this.fetchData()
      this.getCurrentPoistion()
      this.getMyAddress()
        // 全局设置组件加载
      Vue.http.interceptors.push((request, next) => {
        if (this.loading) {
          this.loading = true
        }
        next((response) => {
          this.loading = false
        })
      })
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
          this.hotCakeList = this.hotCakeList.concat(response.data.body.list.map(utils.imgDetail))
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
        let currentReadius = 200
        let radius = 1000
        let offset = 6
        let types = "银行|轻轨|公交站|政府机构|小区|酒店|学校|建筑物|风景名胜"
        Indicator.open({
          text: '正在获取您的位置',
          spinnerType: 'fading-circle'
        })
        this.$http.get(
            `http://restapi.amap.com/v3/place/around?key=${key}&location=${location}&radius=${currentReadius}&offset=${offset}&types=${types}`
          )
          .then(response => {
            if (response.data.pois.length > 0) {
              this.address.current = JSON.parse(JSON.stringify(response.data.pois[0]))
              this.address.checked = JSON.parse(JSON.stringify(response.data.pois[0]))
            }
            Indicator.close()
          })
        this.$http.get(
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
        let radius = 1000
        this.$jsonp('http://yuntuapi.amap.com/datasearch/around', {
            key: key,
            tableid: tableid,
            center: center,
            radius: radius
          })
          .then(response => {
            if (response.datas.length === 0) {
              // Toast({
              //   message: '您目前的位置我们无法为你们配送',
              //   position: 'middle',
              //   duration: 2000,
              //   iconClass: 'mintui-success'
              // })
            } else {
              this.naberStore = response.datas
            }
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
        if (address.hasOwnProperty('location')) {
          this.address.checked.name = JSON.parse(JSON.stringify(address.name))
        } else {
          this.address.checked.name = JSON.parse(JSON.stringify(address.detail_area))
        }

        this.addressClose()
      },
      // 获取我的收货地址
      getMyAddress() {
        ajax.getDataFromApi({
          url: '/v1/my-address'
        }, response => {
          if (response.data.body.list.length > 0) {
            this.address.myAddressIsShow = true
            this.address.myAddress = response.data.body.list
          }
        }, err => {

        })
      },
      //       搜索定位
      searchAddress() {
        let key = '6ec262982ede339365a6f9d9b5370f1b'
        let keywords = this.address.searchKeyword
        let types = '银行|学校|小区|建筑|公司'
        let city = '重庆'
        Vue.http.get(
            `http://restapi.amap.com/v3/assistant/inputtips?key=${key}&keywords=${keywords}&types=${types}&city=${city}`
          )
          .then(response => {
            this.address.search = response.data.tips
          })
      }
    }
  }
  require('../../assets/scss/index.scss')

</script>
