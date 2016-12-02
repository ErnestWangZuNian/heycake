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
          <p class="c-red mt20">{{goodInfo.price | priceRange}}</p>
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
        <div class="select-spec" v-if="isSelectSpec">
        <div class="good">
          <div class="grid-cell good-img">
            <img src="" alt="" v-lazy="">
          </div>
          <div class="grid-cell good-info">
            <p class="nane">咖啡山丘</p>
            <p class="attrlist">
              <span> ￥168.00</span>
            </p>
          </div>
          <div class="grid-cell close-select" @click="closeSpec">
            <span></span>
          </div>
        </div>
        <ul class="spec">
          <li>
            <h3>尺寸</h3>
            <div class="spec-list">
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span class="active">
                     6寸
                   </span>
            </div>
          </li>
          <li>
            <h3>尺寸</h3>
            <div class="spec-list">
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span>
                     6寸
                   </span>
              <span class="active">
                     6寸
                   </span>
            </div>
          </li>
        </ul>
        <div class="spec-count cf">
          <div class="name fl">数量</div>
          <Count class="fl"></Count>
          <div class="tip fl">（剩余100个）</div>
        </div>
        <div class="confirm-spec">
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
  import ajax from '../utils/ajax.js'
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
    mounted () {
     this.fetchData()
    },
    data () {
      return {
        loading: false,
        isSelectSpec: false,
        goodDetailShow:{
          isShow: false,
          content: ''
        },
        spec: [{
          name: '',
          specList: []
        }],
        banner: [],
        goodInfo: {}
      }
    },
    methods: {
      //  获取页面数据
      fetchData () {
        this.loading = true
        //  获取商品详情数据
        ajax.getDataFromApi({
          url: `/v1/goods/${this.$route.params.id}`
        }, (response) => {
          this.loading = false
          this.banner = response.data.body.pictures.map(utils.imgDetail)
          this.goodInfo = response.data.body
        })
        //  获取商品详情展示图片文字
        ajax.getDataFromApi({
           url: `/v1/goods/${this.$route.params.id}/detail-content`
        },(response) => {
           this.goodDetailShow.content = response.data
           this.goodDetailShow.isShow = true
           let specifications = this.goodDetailShow.specifications
           let specList = this.goodDetailShow.specification_objects
        })
      },
      //  点击加入购物车
     joinCart () {
         this.isSelectSpec = true
     },
     //   关闭规格选择弹框
     closeSpec () {
         this.isSelectSpec = false
      },
     //
    },
    // 
  }
  require('../assets/scss/detail.scss')
</script>