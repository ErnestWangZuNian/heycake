<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <ul class="theCart">
        <li v-for="item in cartList">
          <div class="fl w76">
            <div  class="selected" :class="[item.isSelected ? 'selected1' : 'selected']" @click="selectedCart(item)"></div>
          </div>
          <div class="fl w148">
            <div class="goods-img"><img src="../assets/img/goods1.jpg"></div>
          </div>
          <div class="fl w285 goods-text">
            <h2>{{item.goods_name}}</h2>
            <p>规格：{{item.specifications | spec}}</p>
            <div class="countBox cf ">
              <button type="button" class="fl" @click="reduceCount(item)">-</button>
              <input type="text" class="fl" v-model="item.amount" @input="inputCount(item)">
              <button type="button" class="fl" @click="addCount(item)">+</button>
            </div>
          </div>
          <div class="fl w130">
            <div class="price">{{item.itemTotalPrice | price}}</div>
            <div class="close" @click="deleteCart(item)"></div>
          </div>
          <div class="cf"></div>
        </li>
      </ul>

      <div class="settlement">
        <div class="fl w130">
          <div class="selected" :class="[isSelectedAll ? 'selected1' : 'selected',checkAll ? 'selected1' : 'selected']" @click="selectedCartAll()"></div>
          <span>全选</span>
        </div>
        <div class="fl w285">
          <p class="total">合计：<span>{{price | price}}</span></p>
        </div>
        <div class="fl">
          <button type="submit"  :class="[isSettment ? 'btn-red' :'btn-gray']" :disabled="!isSettment" @click="settlement">结算</button>
        </div>
        <div class="cf"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from './Loading'
import ajax from '../utils/ajax.js'
import utils from '../utils/public'
export default {
  name: 'Cart',
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
      selectedCartList: [],
      isSelectedAll: false
    }
  },
  computed: {
    price () {
      let totalPrice = 0
      if(this.selectedCartList.length > 0) {
       this.selectedCartList.forEach((val) => {
         totalPrice += val.itemTotalPrice * 100
       })
      }
      return totalPrice/100
     },
    checkAll () {
      let checkAll = false
      if(this.selectedCartList.length === this.cartList.length){
           checkAll = true
      }
      if(this.selectedCartList.length === 0) {
           checkAll = false
      }
      return checkAll
    },
    isSettment () {
      let flag = false
      this.selectedCartList.length <= 0 ? flag = false : flag = true
      return flag
    }
  },
  methods: {
    // 获取数据
    fetchData () {
      this.loading = true
      ajax.getDataFromApi({
        url: `/v1/shopping-cart`
      }, (response) => {
        this.loading = false
        let data = response.data.body.list
        data.map((val) => {
          val.isSelected = false
          val.itemTotalPrice = (val.price * 100 * val.amount) /100
        })
        this.cartList = response.data.body.list
      }, (error) => {
      })
    },
    // 选择商品
    selectedCart (item) {
      item.isSelected = !item.isSelected
      item.isSelected ? this.selectedCartList.push(item) : utils.arrayDelete(this.selectedCartList,item)
    },
    // 增加数量
    addCount (item) {
      item.amount++
      item.itemTotalPrice =  item.amount * item.price
    },
    // 减少数量
    reduceCount (item) {
      if (item.amount <= 1) {
        item.amount = 1
      } else {
        item.amount--
      }
       item.itemTotalPrice =  item.amount * item.price
    },
    // 输入数量
    inputCount (item) {
      let re = /\D/
      if (re.test(item.amount) || item.amount <= 1) {
        item.amount = 1
      }
      item.itemTotalPrice =  item.amount * item.price
    },
    // 全选
    selectedCartAll () {
      let price = 0
      this.isSelectedAll = !this.isSelectedAll
      if (this.isSelectedAll)  {
        this.cartList.forEach((val) => {
          this.selectedCartList.push(val)
        })
      } else {
        this.selectedCartList = []
      }
      this.cartList.map((val) => {
        val.isSelected = this.isSelectedAll
        return val
      })
    },
    //  删除购物车
    deleteCart (item) {
      let collection = []
      collection.push(item.id)
      ajax.deleteDataFromApi({
        url: `/v1/shopping-cart/`,
        body: {
          collection: collection
        }
      },(response) => {
         utils.arrayDelete(this.cartList,item)
      })
    },
    //  结算
    settlement () {
      let id= []
      let collection = []
      this.selectedCartList.forEach((val) => {
        id.push(val.id)
        collection.push({
          profile_id: val.id,
          amount: val.amount
        })
      })
      ajax.postDataToApi({
        url: `/v1/shopping-cart/settlements`,
        body: {id: id}
      },(response) => {
        localStorage.setItem('cartGoodsId', JSON.stringify(id))
        localStorage.setItem('collection', JSON.stringify(collection))
        localStorage.setItem('buyWay','cart')
        location.href = `/#/site/order-submit/`
      })
    }
  }
}
require('../assets/scss/cart.scss')
</script>
