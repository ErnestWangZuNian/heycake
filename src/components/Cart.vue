<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <ul class="theCart">
        <li>
          <div class="fl w76">
            <div class="selected"></div>
          </div>
          <div class="fl w148">
            <div class="goods-img"><img src="../assets/img/goods1.jpg"> </div>
          </div>
          <div class="fl w285">
            <h2>咖啡山丘</h2>
            <p>规格</p>
            <div class="countBox">
              <button type="button">-</button><input type="text" value="1"><button type="button">+</button>
            </div>
          </div>
          <div class="fl w130">
            <div class="price">￥138.00</div>
            <div class="close"></div>
          </div>
          <div class="cf"></div>
        </li>

        <li>
          <div class="fl w76">
            <div class="selected selected1"></div>
          </div>
          <div class="fl w148">
            <div class="goods-img"><img src="../assets/img/goods1.jpg"> </div>
          </div>
          <div class="fl w285">
            <h2>咖啡山丘</h2>
            <p>规格</p>
            <div class="countBox">
              <button type="button">-</button><input type="text" value="3"><button type="button">+</button>
            </div>
          </div>
          <div class="fl w130">
            <div class="price">￥138.00</div>
            <div class="close"></div>
          </div>
          <div class="cf"></div>
        </li>
      </ul>

      <div class="settlement">
        <div class="fl w130">
          <div class="selected"></div>
          <span>全选</span>
        </div>
        <div class="fl w285">
          <p class="total">合计：<span>￥138.00</span></p>
        </div>
        <div class="fl">
          <button type="button">结算</button>
        </div>
        <div class="cf"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  //Swipe ， SwipeItem        幻灯片
  //InfiniteScroll           下拉刷新
  export default {
    name: 'NewArrivals',
    components: {
      Loading,
      Swipe,
      SwipeItem,
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
        loading: true,
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
  require('../assets/scss/cart.scss')
</script>
