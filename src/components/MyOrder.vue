<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="grid bgc-f5f5f5 height-90">
        <div class="grid-cell tright c-888">订单筛选：</div>
        <div class="grid-cell tleft c-333">
          <select class="selects">
            <option value="">全部</option>
            <option value="at00">待付款</option>
            <option value="wfs0">待发货</option>
            <option value="wfd1">待收货</option>
            <option value="wfc0">待评价</option>
            <option value="trm0">已完成</option>
            <option value="c000">已取消</option>
            <option value="r000">退款中</option>
            <option value="rs00">已退款</option>
          </select>
        </div>
      </div>

      <div class="orders">
        <div class="grid height-85 border-bottom">
          <div class="grid-cell">下单时间：<span class="c-666">2015-5-5 13:22</span></div>
          <div class="grid-cell tright u-1of4">待支付</div>
        </div>

        <ul>
          <li class="grid height-150 border-bottom">
            <div class="grid-cell u-w100">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="grid-cell">
              <div class="title">hey coffee 美味无敌千层大蛋糕</div>
              <div class="c-666 f-20">6寸 13cm*13cm 2-4人</div>
            </div>
            <div class="grid-cell u-w130 tright">
              <div class="price">￥138.00</div>
              <div class="f-20 c-666">x1</div>
            </div>
          </li>
          <li class="grid height-150 border-bottom">
            <div class="grid-cell u-w100">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="grid-cell">
              <div class="title">hey coffee 美味无敌千层大蛋糕</div>
              <div class="c-666 f-20">6寸 13cm*13cm 2-4人</div>
            </div>
            <div class="grid-cell u-w130 tright">
              <div class="price">￥138.00</div>
              <div class="f-20 c-666">x1</div>
            </div>
          </li>
          <li class="grid height-150 border-bottom">
            <div class="grid-cell u-w100">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="grid-cell">
              <div class="title">hey coffee 美味无敌千层大蛋糕</div>
              <div class="c-666 f-20">6寸 13cm*13cm 2-4人</div>
            </div>
            <div class="grid-cell u-w130 tright">
              <div class="price">￥138.00</div>
              <div class="f-20 c-666">x1</div>
            </div>
          </li>
        </ul>
        <div class="grid height-85 border-bottom">
          <div class="grid-cell c-888">支付金额：<span class="c-red">￥316.00</span>（含运费）</div>
          <div class="grid-cell tright u-1of4">
            <span class="btn-red">去支付</span></div>
        </div>
      </div>

      <div class="splitter"></div>

      <div class="orders">
        <div class="grid height-85 border-bottom">
          <div class="grid-cell">下单时间：<span class="c-666">2015-5-5 13:22</span></div>
          <div class="grid-cell tright u-1of4">待支付</div>
        </div>

        <ul>
          <li class="grid height-150 border-bottom">
            <div class="grid-cell u-w100">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="grid-cell">
              <div class="title">hey coffee 美味无敌千层大蛋糕</div>
              <div class="c-666 f-20">6寸 13cm*13cm 2-4人</div>
            </div>
            <div class="grid-cell u-w130 tright">
              <div class="price">￥138.00</div>
              <div class="f-20 c-666">x1</div>
            </div>
          </li>
        </ul>
        <div class="grid height-85 border-bottom">
          <div class="grid-cell c-888">支付金额：<span class="c-red">￥316.00</span>（含运费）</div>
          <div class="grid-cell tright u-1of4">
            <span class="btn-red">去支付</span></div>
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
    name: 'MyOrder',
    components: {
      Loading,
      Swipe,
      SwipeItem,
    },
    mounted () {

    },
    data () {
      return {
        loading: false,
      }
    },
    methods: {
    },
  }
  require('../assets/scss/myOrder.scss')
</script>
