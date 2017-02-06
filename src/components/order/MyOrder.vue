<template>
  <div>
    <!--<loading v-if="loading && loadShow"></loading>-->
    <div class="container">
      <div class="my-order-grid bgc-f5f5f5 height-90">
        <div class="grid-cell tright c-888">订单筛选：</div>
        <div class="grid-cell tleft c-333">
          <div class="same-select category">
            <p class="same-select-list" @click="openOrderSelect()">{{status | orderStatus}}</p>
            <ul class="same-select-list-container" v-if="order.status">
              <li class="same-select-list" :class="item.isSelected ? 'same-select-list-active': ''" v-for="item in order.value" @click="changeOrderStatus(item)">{{item.val}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-loadmore-wrapper" ref="wrapper">
        <loadmore :bottom-method="loadTop" @bottom-status-change="getLodingStatus" ref="loadmore" :bottom-all-loaded="loadStatus.isLoadAll"
          :bottom-status="loadStatus.current">
          <template v-for='item in listData'>
            <div class="orders">
              <div class="my-order-grid height-85 border-bottom">
                <div class="grid-cell">下单时间：<span class="c-666">{{item.create_time}}</span></div>
                <div class="grid-cell tright u-1of4">{{item.status_code | orderStatus}}</div>
              </div>
              <ul>
                <li class="my-order-grid height-150 border-bottom" v-for='child in item.items' @click="gotoOrderDetail(item.id)">
                  <div class="grid-cell u-w100">
                    <img :src="child.cover | imgDetail">
                  </div>
                  <div class="grid-cell u-center">
                    <div class="title">{{child.name}}</div>
                    <div class="c-666 f-20">
                      <template v-for='spec in child.specifications'>
                        {{spec}}
                      </template>
                    </div>
                  </div>
                  <div class="grid-cell u-w130 tright">
                    <div class="price" v-if="item.pay_method !== 2">{{child.price | price}}</div>
                    <div class="price" v-if="item.pay_method === 2">{{child.score}}积分</div>
                    <div class="f-20 c-666">x{{child.amount}}</div>
                  </div>
                </li>
              </ul>
              <div class="my-order-grid height-85 border-bottom">
                <div class="grid-cell c-888" v-if="item.pay_method !== 2">
                  支付金额：
                  <span class="c-red">{{item.total_sum | price}}</span>
                  <template v-if='item.logistics_mode == "pick-up"'>（自提）</template>
                  <template v-else>（含运费：{{item.logistics_price}}元）</template>
                </div>
                <div class="grid-cell c-888" v-if="item.pay_method === 2">
                  兑换积分：
                  <span class="c-red">{{item.total_sum | score}}积分</span>
                  <template v-if='item.logistics_mode == "pick-up"'>（自提）</template>
                  <template v-else>（含运费：{{item.logistics_price}}元）</template>
                </div>
                <div class="grid-cell tright u-1of4">
                  <template v-if='item.status_code == "at00" '><span class="btn-myorder" @click="goPay(item.id)">去支付</span></template>
                  <template v-if='item.status_code == "wfd1" || item.status_code == "kd00"'><span class="btn-myorder" @click="confirmGoods(item.id)">确认收货</span></template>
                  <template v-if='item.status_code == "wfc0" '><span class="btn-myorder" @click="goEvaluate(item.id)">去评价</span></template>
                </div>
              </div>
            </div>
            <div class="splitter"></div>
          </template>
          <div slot="bottom" class="mint-loadmore-bottom" v-show="listData.length >= 4">
            <span v-show="loadStatus.current === 'pull' && listData.length > 0">{{text.pull}}</span>
            <span v-show="loadStatus.current === 'drop' && listData.length > 0">{{text.drop}}</span>
            <span v-show="listData.length <= 0">没有这种状态的订单</span>
            <span v-if="loadStatus.current === 'loading'"> <!--加载中图标-->
                <spinner type="fading-circle" :size="40" color="#000" class='mint-loading-icon'></spinner>Loading...</span>
          </div>
           <div slot="bottom" class="mint-loadmore-bottom" v-show="listData.length === 0">
              没有这种状态的订单
           </div>
        </loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    Loadmore,
    Spinner,
    MessageBox
  } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'MyOrder',
    components: {
      Swipe,
      SwipeItem,
      Loadmore,
      Spinner,
      MessageBox
    },
    mounted() {
      this.isLoginMethod()
      this.status = this.$route.params.status || ''
    },
    data() {
      return {
        isLogin: this.$store.state.user.userInfo.isLogin || '', //是否登录
        userId: this.$store.state.user.userInfo.userId || '', //当前用户ID
        userInfo: {},
        listData: [],
        order: {
          value: [{
            isSelected: true,
            val: '全部',
            orderCode: '',
          }, {
            isSelected: false,
            val: '待支付',
            orderCode: 'at00',
          },{
            isSelected: false,
            val: '待发货',
            orderCode: 'wfs0',
          }, {
            isSelected: false,
            val: '待收货',
            orderCode: 'wfd1',
          }, {
            isSelected: false,
            val: '待评价',
            orderCode: 'wfc0',
          }, {
            isSelected: false,
            val: '已取消',
            orderCode: 'c000',
          }, {
            isSelected: false,
            val: '退款中',
            orderCode: 'r000',
          }, {
            isSelected: false,
            val: '已退款',
            orderCode: 'rs00',
          }],
          seleted: '全部',
          status: false
        },
        wrapper: {
          height: 0,
          top: 0
        },
        loadStatus: {
          current: 'pull',
          isLoadAll: false
        },
        text: {
          pull: '上拉刷新',
          drop: '释放更新'
        },
        page: {
          total: 1,
          currentPage: 1
        },
        status: this.$route.params.status || ''
      }
    },
    methods: {
      //  判断是否登录
      isLoginMethod() {
        if (this.isLogin) {
          this.loadShow = true
          this.getListData()
        } else {
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
          })
        }
      },
      //  获取上拉刷新各种时候的状态
      getLodingStatus(status) {
        this.loadStatus.current = status
      },
      //  获取列表数据
      getListData(page, callback) {
        ajax.getDataFromApi({
          url: '/v1/order',
          data: {
            status_code: this.status || '',
            per_page: 4,
            page: page
          }
        }, (response) => {
          this.loadStatus.isLoadAll = false
          this.text.pull = '上拉刷新'
          this.listData = response.data.body.list
          this.page.total = response.data.body.pagination.total
          this.$refs.loadmore.onBottomLoaded()
          callback && callback()
          return data
        })
      },
      //  切换订单选项
      openOrderSelect() {
        this.order.status = true
      },
      //  切换订单状态
      changeOrderStatus(item) {
        this.order.value.forEach(val => {
          val.isSelected = false
        })
        item.isSelected = true
        this.order.status = false
        this.order.seleted = item.val
        this.status = item.orderCode
        this.getListData(1, () => {
          this.page.currentPage = 1
          this.$refs['wrapper'].scrollTop = 0
        })
      },
      //  加载更多请求函数
      pageLodaMore(page) {
        ajax.getDataFromApi({
          url: '/v1/order',
          data: {
            status_code: this.status || '',
            per_page: 4,
            page: page
          }
        }, (response) => {
          this.listData = this.listData.concat(response.data.body.list)
          this.page.total = response.data.body.pagination.total
          this.$refs.loadmore.onBottomLoaded()
        })
      },
      //  去支付跳转
      goPay(id) {
        location.href = `/#/site/order-pay/${id}`
      },
      //  下拉刷洗数据
      loadTop() {
        if (this.page.currentPage < this.page.total ) {
          this.text.pull = '上拉刷新'
          ++this.page.currentPage
          this.pageLodaMore(this.page.currentPage)
        } else {
          this.text.pull = '没有更多数据了'
          this.loadStatus.isLoadAll = true
        }
      },
      //  确认收货
      confirmGoods(id) {
        MessageBox.confirm('是否已收到货？').then(action => {
          ajax.putDataToApi({
            url: `/v1/confirm-receipt/${id}`
          }, (response) => {
            this.getListData()
          })
        })
      },
      //  去评价
      goEvaluate(id) {
        location.href = `/#/site/order-evaluate/${id}`
      },
      // 去到订单详情
      gotoOrderDetail(id) {
        location.href = `/#/site/order-detail/${id}`
      },
    },
  }
  require('../../assets/scss/myOrder.scss')

</script>
