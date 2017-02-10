<template>
  <div>
    <div class="container">
      <div v-if="cartList.length > 0">
        <ul class="theCart">
          <li v-for="item in cartList">
            <div class="fl w76">
              <div class="selected" :class="[item.isSelected ? 'selected1' : 'selected']" @click="selectedCart(item)"></div>
            </div>
            <div class="fl w148">
              <div class="goods-img"><img src="../../assets/img/goods1.jpg"></div>
            </div>
            <div class="fl w285 goods-text">
              <h2>{{item.goods_name}}</h2>
              <p>规格：{{item.specifications | spec}}</p>
              <div class="countBox cf">
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
            <button type="submit" :class="[isSettment ? 'btn-red' :'btn-gray']" :disabled="!isSettment" @click="settlement">结算</button>
          </div>
          <div class="cf"></div>
        </div>
      </div>
      <div v-if="cartList.length <= 0" class="null-cart">
        <div class="img-flag">
          <img src="../../assets/img/null-cart.png" alt="暂无商品">
        </div>
        <div class="null-cart-btn" @click="gotoSelectGoods">去选购</div>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'Cart',
    mounted() {
      this.fetchData()
    },
    data() {
      return {
        cartList: [],
        selectedCartList: [],
        isSelectedAll: false
      }
    },
    computed: {
      price() {
        let totalPrice = 0
        if (this.selectedCartList.length > 0) {
          this.selectedCartList.forEach((val) => {
            totalPrice += val.itemTotalPrice * 100
          })
        }
        return totalPrice / 100
      },
      checkAll() {
        let checkAll = false
        if (this.selectedCartList.length === this.cartList.length) {
          checkAll = true
        }
        if (this.selectedCartList.length === 0) {
          checkAll = false
        }
        return checkAll
      },
      isSettment() {
        let flag = false
        this.selectedCartList.length <= 0 ? flag = false : flag = true
        return flag
      }
    },
    methods: {
      // 获取数据
      fetchData() {
        this.loading = true
        ajax.getDataFromApi({
          url: `/v1/goods/428`
        }, response => {
          console.log(response)
        })
        ajax.getDataFromApi({
          url: `/v1/shopping-cart`
        }, (response) => {
          let data = response.data.body.list
          data.map((val) => {
            val.isSelected = false
            val.itemTotalPrice = (val.price * 100 * val.amount) / 100
          })
          this.cartList = response.data.body.list
          this.selectedCartAll()
        }, (error) => {
        })
      },
      //  提交到购物车
      postCartInfo(item, callback) {
        ajax.postDataToApi({
          url: `v1/shopping-cart/${item.id}`,
          body: {
            store_code: utils.sessionstorageGetData('naberStore').store_id || "",
            goods_id: item.goods_id,
            specification_id: item.goods_profile_id,
            amount: item.amount
          }
        }, response => {
          callback && callback()
        })
      },
      // 选择商品
      selectedCart(item) {
        item.isSelected = !item.isSelected
        item.isSelected ? this.selectedCartList.push(item) : utils.arrayDelete(this.selectedCartList, item)
      },
      // 增加数量
      addCount(item) {
        this.postCartInfo(item, () => {
          item.amount++
          item.itemTotalPrice = item.amount * item.price
        })
      },
      // 减少数量
      reduceCount(item) {
        this.postCartInfo(item, () => {
          if (item.amount <= 1) {
            item.amount = 1
          } else {
            item.amount--
          }
          item.itemTotalPrice = item.amount * item.price
        })
      },
      // 输入数量
      inputCount(item) {
        this.postCartInfo(item, () => {
          let re = /\D/
          if (re.test(item.amount) || item.amount <= 1) {
            item.amount = 1
          }
          item.itemTotalPrice = item.amount * item.price
        })
      },
      // 全选
      selectedCartAll() {
        let price = 0
        this.isSelectedAll = !this.isSelectedAll
        if (this.isSelectedAll) {
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
      deleteCart(item) {
        let collection = []
        collection.push(item.id)
        ajax.deleteDataFromApi({
          url: `/v1/shopping-cart/`,
          body: {
            collection: collection
          }
        }, (response) => {
          this.fetchData()
          this.selectedCartAll()
        })
      },
      //  结算
      settlement() {
        let id = []
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
          body: { id: id }
        }, (response) => {
          utils.localstorageData('cartGoodsId', id)
          utils.localstorageData('collection', collection)
          utils.localstorageData('buyWay', 'cart')
          location.href = `/#/site/order-submit/`
        })
      },
      //  去选择商品
      gotoSelectGoods() {
        location.href = "/#/site/index"
      }
    }
  }
  require('../../assets/scss/cart.scss')
</script>