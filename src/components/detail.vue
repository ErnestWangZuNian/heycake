<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <ul>
        <li class="product-img"><img src="../assets/img/p01.jpg"></li>
      </ul>
      <div class="grid">
        <div class="grid-cell font-30">榴莲芒果生日蛋糕蛋糕蛋糕蛋糕</div>
      </div>
      <div class="grid">
        <div class="grid-cell font-30 c-red">￥138.00 - ￥268.00</div>
      </div>

      <div class="splitter"></div>

      <div class="grid">
        <div class="grid-cell">运费</div>
        <div class="grid-cell tright c-888">￥10.00</div>
      </div>

      <div class="splitter"></div>

      <div class="grid">
        <div class="grid-cell">积分兑换</div>
        <div class="grid-cell tright c-888">29999积分</div>
        <div class="grid-cell u-w30"><div class="item-after"></div></div>
      </div>

      <div class="splitter"></div>

      <div class="grid">
        <div class="grid-cell">规格</div>
        <div class="grid-cell u-w30"><div class="item-after"></div></div>
      </div>

      <div class="splitter"></div>

      <div class="grid">
        <div class="grid-cell">查看用户评价<span class="c-888">(2564条评价)</span></div>
        <div class="grid-cell u-w30"><div class="item-after"></div></div>
      </div>

      <div class="product-content">
        <div class="text">内容区域，文字标签用“.text”包裹...</div>
        <img src="../assets/img/p02.jpg">
      </div>

      <div class="operation">
        <div class="grid operation-grid">
          <div class="grid-cell u-w100">
            <div class="item-cart position-rel">
              <div class="position-abs nums">1</div>
            </div>
            <div class="tcenter c-aaa">购物车</div>
          </div>
          <div class="grid-cell tright">
            <button class="btn-orange" type="button">加入购物车</button>
            <button class="btn-red" type="button">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'Detail',
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
  require('../assets/scss/detail.scss')
</script>
