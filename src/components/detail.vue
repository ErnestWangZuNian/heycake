<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div v-if='isSelectSpec' class="spec-mask"></div>
      <!--轮播图-->
      <div class="swiper">
        <swipe :auto="4000">
          <swipe-item v-for="item in banner">
            <img :src="item" v-lazy="item.picture" alt="轮播">
          </swipe-item>
        </swipe>
      </div>
      <div class="grid price-score">
        <div class="grid-cell">
          <p>{{goodInfo.name}}</p>
          <p class="c-red mt20" v-if="!priceStatus">{{goodInfo.price | priceRange}}</p>
          <p class="c-red mt20" v-if="priceStatus">{{goodInfo.price | price}}</p>
        </div>
        <div class="grid-cell score" v-if="goodInfo.score > 0">
          <p> {{goodInfo.score}}积分 </p>
          <button>兑换</button>
        </div>
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
        <div class="grid-cell u-w30">
          <div class="item-after"></div>
        </div>
      </div>

      <div class="splitter"></div>

      <div class="grid">
        <div class="grid-cell">规格</div>
        <div class="grid-cell u-w30">
          <div class="item-after"></div>
        </div>
      </div>

      <div class="splitter"></div>

      <div class="grid">
        <div class="grid-cell">查看用户评价<span class="c-888">(2564条评价)</span></div>
        <div class="grid-cell u-w30">
          <div class="item-after"></div>
        </div>
      </div>
        <div class="product-content" v-html="goodDetailShow.content">
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
            <button class="btn-orange" type="button" @click="joinCart()">加入购物车</button>
            <button class="btn-red" type="button" @click="purchase()">立即购买</button>
          </div>
        </div>
      </div>
      <transition name="spec" enter-active-class="animated fadeInUpBig"  leave-active-class="animated fadeOutDownBig">
        <div class="select-spec" v-if="specStatus.isSelectSpec">
        <div class="good">
          <div class="grid-cell good-img">
            <img src="" alt="" v-lazy="">
          </div>
          <div class="grid-cell good-info">
            <p class="nane">{{goodInfo.name}}</p>
            <p class="attrlist">
              <span v-if="!priceStatus"> {{goodInfo.price | priceRange}}</span>
              <span v-if="priceStatus"> {{goodInfo.price | price}}</span>
            </p>
          </div>
          <div class="grid-cell close-select" @click="closeSpec">
            <span></span>
          </div>
        </div>
        <ul class="spec">
          <li v-for="(item,index) in spec">
            <p>{{item.name}}</p>
            <div class="spec-list">
              <button  type="button" v-for= "(elem,elIndex) in item.specList" @click="selectSpec(elem,item.specList,spec,index,elIndex,$evevt)" :class="{active:elem.isChecked,disabled: !elem.canChecked}"
              :disabled="!elem.canChecked">
                    {{elem.name}}
              </button>
            </div>
          </li>
        </ul>
        <div class="spec-count cf">
          <div class="name fl">数量</div>
          <Count class="fl" :count.sync="goodCount"></Count>
          <div class="tip fl">（剩余{{selectedSpec.stock}}个）</div>
        </div>
        <div class="confirm-spec" v-if="specStatus.specWay==='cart'" @click="confirmJoinCart(goodInfo.id,selectedSpec.id,goodCount)">
          加入购物车
        </div>
        <div class="confirm-spec" v-if="specStatus.specWay==='purchase'" @click="confirmPurchase">
          去结算
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Lazyload } from 'mint-ui'
import Loading from './Loading'
import utils from '../utils/public'
import ajax from '../utils/ajax'
import Count from './common/count'
export default {
    name: 'Detail',
    components: {
        Loading,
        Swipe,
        SwipeItem,
        Lazyload,
        Count
    },
    mounted() {
        this.fetchData()
    },
    data() {
        return {
            loading: false,
            specStatus: {
             isSelectSpec: false,
             specWay: 'cart',
            },
            goodDetailShow: {
                isShow: false,
                content: ''
            },
            priceStatus: false,
            goodCount: 12,
            spec: [],
            originalSpecList: [],
            selectedSpec: {},
            banner: [],
            goodInfo: {}
        }
    },
    methods: {
        //  获取页面数据
        fetchData() {
            this.loading = true
            //  获取商品详情数据
            ajax.getDataFromApi({
                url: `/v1/goods/${this.$route.params.id}`
            }, (response) => {
                this.loading = false
                let data = response.data.body
                this.banner = data.pictures.map(utils.imgDetail)
                this.goodInfo = data
                this.modifyData(data)
            })
            //  获取商品详情展示图片文字
            ajax.getDataFromApi({
                url: `/v1/goods/${this.$route.params.id}/detail-content`
            }, (response) => {
                this.goodDetailShow.content = response.data
                this.goodDetailShow.isShow = true
            })
        },
        // 处理页面数据 ==> 组织规格的数据结构
        modifyData(data) {
            let specifications = data.specifications
            let specList = data.specification_objects
            this.originalSpecList = data.specification_objects
            specifications.forEach((val, index) => {
                let curSpecList = []
                let curSpecInfo = []
                specList.forEach((childVal, childIndex) => {
                    curSpecList.push(childVal.value[index])
                })
                curSpecList = utils.unique(curSpecList)
                curSpecList.forEach((grandVal, grandIndex) => {
                    if (index === 0) {
                        curSpecInfo.push({
                            name: grandVal,
                            isChecked: false,
                            canChecked: true
                        })
                    } else {
                        curSpecInfo.push({
                            name: grandVal,
                            isChecked: false,
                            canChecked: false
                        })
                    }

                })
                this.spec.push({
                    name: val,
                    specList: curSpecInfo
                })
            })
        },
        // 选择规格
        selectSpec(item, items, spec, itemsIndex, itemIndex) {
            let len = spec.length
            // 初始化将所有元素的选择状态和可选状态设置为false
            if (itemsIndex < len - 1) {
                spec[itemsIndex + 1].specList.forEach((grandVal, grandIndex) => {
                    grandVal.canChecked = false
                    grandVal.isChecked = false
                })
            }
            //  判断那些规格可以选择
            items.forEach((val) => {
                val.isChecked = false
                if (val.name === item.name && val.canChecked) {
                    this.originalSpecList.forEach((childVal, childIndex) => {
                        if (childVal.value[itemsIndex] === item.name && itemsIndex < len - 1) {
                            if (itemsIndex > 0) {
                                spec[itemsIndex - 1].specList.forEach((val1, index1) => {
                                    spec[itemsIndex + 1].specList.forEach((grandVal, grandIndex) => {
                                        if (val1.isChecked) {
                                            if (childVal.value[itemsIndex + 1] === grandVal.name && childVal.value[itemsIndex - 1] === val1.name) {
                                                grandVal.canChecked = true
                                            }
                                        }
                                    })
                                })
                            } else {
                                spec[itemsIndex + 1].specList.forEach((grandVal, grandIndex) => {
                                    if (childVal.value[itemsIndex + 1] === grandVal.name) {
                                        grandVal.canChecked = true
                                    }
                                })
                            }
                        }
                    })
                }
            })
            // 点击当前元素设置选择状态
            item.isChecked = true
            // 根据是否是最后一个元素判断选择的规格
            if (itemsIndex === len - 1) {
                this.selectedSpec = []
                let selectSpec = []
                spec.forEach((val) => {
                    val.specList.forEach((childVal) => {
                        if (childVal.isChecked) {
                            selectSpec.push(childVal.name)
                        }
                    })
                })
                this.originalSpecList.forEach((val) => {
                    if (val.value.toString() === selectSpec.toString()) {
                        this.selectedSpec = JSON.parse(JSON.stringify(val))
                    }
                })
               this.priceStatus = true
               this.goodInfo.price = this.selectedSpec.price
               console.log( this.goodInfo.price)
            }
        },
        //  点击加入购物车
        joinCart() {
            this.specStatus.isSelectSpec = true
            this.specStatus.specWay = 'cart'
        },
        // 点击立即购买
        purchase() {
            this.specStatus.isSelectSpec = true
            this.specStatus.specWay = 'purchase'
        },
        //   关闭规格选择弹框
        closeSpec() {
            this.specStatus.isSelectSpec = false
        },
        //确认加入购物车
        confirmJoinCart(goodId,specId,goodCount) {
            ajax.postDataToApi({
               url: '/v1/shopping-cart',
               body: {
                 goods_id: goodId,
                 specification_id: specId,
                 amount: goodCount
               }
            },(response) => {

            }) 
        }
    },
    // 
}
require('../assets/scss/detail.scss')
</script>