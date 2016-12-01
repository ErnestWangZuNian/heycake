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
           <p class="c-red mt20">{{goodInfo.price.min|price}}-{{goodInfo.price.max|price}}</p>
          </div>
          <div class="grid-cell score">
            <p>200积分</p>
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
      <spec v-if="isSelectSpec"></spec>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, Lazyload } from 'mint-ui'
  import Loading from './Loading'
  import utils from '../utils/public'
  import ajax from '../utils/ajax.js'
  import Count from './common/count'
  import Spec from './common/spec'
  export default {
    name: 'Detail',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      Lazyload,
      Count,
      Spec
    },
    mounted () {
     this.fetchData()
    },
    data () {
      return {
        loading: false,
        isSelectSpec: true,
        banner: [],
        goodInfo: {}
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        //  获取商品详情数据
        ajax.getDataFromApi({
          url: `/v1/goods/${this.$route.params.id}/details`
        }, (response) => {
          this.loading = false
          this.banner = response.data.body.list.pictures.map(utils.imgDetail)
          this.goodInfo = response.data.body.list[0]
        })
      }
    },
  }
  require('../assets/scss/detail.scss')
</script>