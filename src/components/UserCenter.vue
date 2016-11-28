<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="member-center">
        <div class="theTop">
          <!--未登录-->
          <!--<div class="gologin">-->
            <!--<button type="button">去登录</button>-->
          <!--</div>-->

          <!--已登录-->
          <div class="logined">
            <div class="fl">
              <p>用 户 名 ：<span>安妮的毛毛熊</span></p>
              <p>当前积分：<span>20156988</span></p>
            </div>
            <div class="fr">
              <button type="button">返回首页</button>
            </div>
          </div>

        </div>
        <div class="theNav">
          <div class="navBox">
            <div class="nav-img img1"></div>
            <div class="nav-name">待支付</div>
          </div>

          <div class="navBox">
            <div class="nav-img img2"></div>
            <div class="nav-name">待发货</div>
          </div>

          <div class="navBox">
            <div class="nav-img img3"></div>
            <div class="nav-name">待收货</div>
          </div>

          <div class="navBox">
            <div class="nav-img img4"></div>
            <div class="nav-name">待评价</div>
          </div>
          <div class="cf"></div>
        </div>
        <!--分隔符-->
        <div class="splitter"></div>
        <router-link to=''><div class="listBox"><span class="order"></span>全部订单</div></router-link>
        <!--分隔符-->
        <div class="splitter"></div>

        <router-link to=''><div class="listBox"><span class="detail"></span>积分明细</div></router-link>
        <router-link to=''><div class="listBox"><span class="exchange"></span>积分兑换</div></router-link>
        <router-link to=''><div class="listBox"><span class="evaluate"></span>我的评价</div></router-link>
        <router-link to=''><div class="listBox"><span class="address"></span>收货地址</div></router-link>
        <router-link to=''><div class="listBox"><span class="about"></span>关于HEYCAKE</div></router-link>
        <div class="cf"></div>
        <div class="loginout">
          <button type="button">退出登录</button>
        </div>
        <p class="find-help">
          如需帮助，欢迎致电：400-1139-499
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'NewArrivals',
    components: {
      Loading,
      Swipe,
      SwipeItem,
    },
    mounted () {
//      this.fetchData()
    },
    data () {
      return {
        loading: false,
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        ajax.getDataFromApi({
          url: '/v2/goods?recommend=true'
        }, (data) => {
        this.loading = false;
      },(data) => {
          this.loading = false;
        })
      }
    },
  }
  require('../assets/scss/userCenter.scss')
</script>
