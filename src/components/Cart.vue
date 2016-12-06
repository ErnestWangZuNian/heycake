<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <ul class="theCart">
        <li v-for="item in cartList">
          <div class="fl w76">
            <div class="selected"></div>
          </div>
          <div class="fl w148">
            <div class="goods-img"><img src="../assets/img/goods1.jpg"></div>
          </div>
          <div class="fl w285">
            <h2>{{item.goods_name}}</h2>
            <p>规格</p>
            <count class="good-count" :count="item.amount"></count>
          </div>
          <div class="fl w130">
            <div class="price">{{price | price}}</div>
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
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'NewArrivals',
    components: {
      Loading
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
        loading: true,
        cartList: [],
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        ajax.getDataFromApi({
          url: `/v1/shopping-cart`
        }, (response) => {
        this.loading = false
        this.cartList = response.data.body.list
      },(error) => {
        })
      }
    },
  }
  require('../assets/scss/cart.scss')
</script>
