<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="order-tab">
        <button class="btn-red">快递配送</button>
        <button class="btn-gray">门店自提</button>
      </div>

      <!--信息-->
      <div class="order-info">
        <div class="label-list">
          <div class="fl info">
            <section>
              <div class="icon icon-name"></div>
              <div class="text">马飞燕</div>
            </section>

            <section>
              <div class="icon icon-tel"></div>
              <div class="text">13032375597</div>
            </section>

            <section>
              <div class="icon icon-addr"></div>
              <div class="text">重庆渝北区中智联东电大厦B区番石榴科技技术办公司</div>
            </section>
          </div>
          <div class="fl arrow">
            <div class="icon-right"></div>
          </div>
          <div class="cf"></div>
        </div>
        <div class="label-message">
          留言 <input class="inputs" type="text">
        </div>
      </div>

      <!--分隔-->
      <div class="order-splitter"></div>

      <!--时间段-->
      <div class="order-times">
        <div class="title">预约时间</div>
        <div class="times">
          <input class="inputs" type="text" placeholder="开始时间"> - <input class="inputs" type="text" placeholder="结束时间">
        </div>
      </div>

      <!--分隔-->
      <div class="order-splitter"></div>

      <!--购物明细-->
      <div class="order-detail">
        <div class="title">购物明细</div>
        <ul>
          <li>
            <div class="imgs">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="info">
              <h3>咖啡山丘</h3>
              <p>6寸</p>
            </div>
            <div class="price">
              <p>￥138.00</p>
              <p class="mrg"><span>x1</span></p>
            </div>
          </li>

          <li>
            <div class="imgs">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="info">
              <h3>hey coffee 美味无敌千层大蛋糕千层大蛋糕</h3>
              <p>6寸</p>
            </div>
            <div class="price">
              <p>￥138.00</p>
              <p class="mrg"><span>x1</span></p>
            </div>
          </li>
        </ul>
        <div class="freight">
          <p>运费<span>免运费</span></p>
        </div>
      </div>

      <!--分隔-->
      <div class="order-splitter"></div>

      <!--支付方式-->
      <div class="order-pay">
        <div class="title">支付方式</div>
        <div>
          <div class="selected"></div>
          <div class="text">在线支付</div>
        </div>
      </div>

      <!--//空白-->
      <div class="order-null"></div>

      <!--提交订单-->
      <div class="order-submit">
        <p>合计：<span>￥138.00</span></p>
        <button class="btn">提交订单</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'OrderSubmit',
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
  require('../assets/scss/orderSubmit.scss')
</script>
