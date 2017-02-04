<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="my-order-grid bgc-f5f5f5 height-90">
        <div class="grid-cell tright c-888">订单筛选：</div>
        <div class="grid-cell tleft c-333">
          <select class="selects" v-model='status' @change="getListData()">
            <option value="">全部</option>
            <option value="at00">待支付</option>
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
      <loadmore class="loadmore-style" :auto-fill="false" :bottom-method="loadTop"  :bottom-text ="text.loding" :bottom-loading-text="text.loding"
        :bottom-drop-text="text.drop" :ref="loadmore">
        <template v-for='item in listData'>
          <div class="orders">
            <div class="my-order-grid height-85 border-bottom">
              <div class="grid-cell">下单时间：<span class="c-666">{{item.create_time}}</span></div>
              <div class="grid-cell tright u-1of4">{{item.status_code}}</div>
            </div>
            <ul>
              <li class="my-order-grid height-150 border-bottom" v-for='child in item.items'>
                <div class="grid-cell u-w100">
                  <img :src="child.cover">
                </div>
                <div class="grid-cell u-center" @click="gotoOrderDetail(item.id)">
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
                <template v-if='item.status_code == "待支付" '><span class="btn-myorder" @click="goPay(item.id)">去支付</span></template>
                <template v-if='item.status_code == "待收货" || item.status_code == "客服签收"'><span class="btn-myorder" @click="confirmGoods(item.id)">确认收货</span></template>
                <template v-if='item.status_code == "待评价" '><span class="btn-myorder" @click="goEvaluate(item.id)">去评价</span></template>
              </div>
            </div>
          </div>
          <div class="splitter"></div>
        </template>
      </loadmore>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    Loadmore,
    MessageBox
  } from 'mint-ui'
  import Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'MyOrder',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      Loadmore,
      MessageBox
    },
    mounted() {
      this.isLoginMethod()
    },
    data() {
      return {
        loading: true,
        loadShow: false,
        isLogin: this.$store.state.user.userInfo.isLogin || '', //是否登录
        userId: this.$store.state.user.userInfo.userId || '', //当前用户ID
        userInfo: {},
        listData: [],
        text: {
          drop: '释放更新',
          loding: '小嘿正在努力加载中'
        },
        page: {
          total: 1,
          currentPage: 1
        },
        status: this.$route.params.status || ''
      }
    },
    methods: {
      //      判断是否登录
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
      //获取列表数据
      getListData(page) {
        this.text.loding = "上拉刷新"
        ajax.getDataFromApi({
          url: '/v1/order',
          data: {
            status_code: this.status || '',
            per_page: 8,
            page: page
          }
        }, (response) => {
          this.listData = response.data.body.list
          this.page.total = response.data.body.pagination.total
          this.text.loding = "上拉刷新"
          //数据处理函数
          this.dataDispose(this.listData)
          //数据请求完成,改变loading值,关闭load，显示渲染后的页面
          this.loading = false
          return data
        })
      },
      // 加载更多请求函数
      pageLodaMore(page) {
        ajax.getDataFromApi({
          url: '/v1/order',
          data: {
            status_code: this.status || '',
            per_page: 8,
            page: page
          }
        }, (response) => {
          this.listData = this.listData.concat(response.data.body.list)
          this.page.total = response.data.body.pagination.total
          this.text.loding = "上拉刷新"
          //数据处理函数
          this.dataDispose(this.listData)
        })
      },
      //去支付跳转
      goPay(id) {
        location.href = `/#/site/order-pay/${id}`
      },
      //    下拉刷洗数据
      loadTop() {
        if (this.page.currentPage < this.page.total) {
          this.page.currentPage++
            this.pageLodaMore(this.page.currentPage)
        } else {
          this.text.loding = "没有更多数据了！"
        }
      },
      //确认收货
      confirmGoods(id) {
        MessageBox.confirm('是否已收到货？').then(action => {
          ajax.putDataToApi({
            url: `/v1/confirm-receipt/${id}`
          }, (response) => {
            this.getListData()
          })
        })
      },
      //去评价
      goEvaluate(id) {
        location.href = `/#/site/order-evaluate/${id}`
      },
      // 去到订单详情
      gotoOrderDetail(id) {
        location.href = `/#/site/order-detail/${id}`
      },
      //列表数据处理
      dataDispose(data) {
        data.forEach((val, index) => {
          switch (val.status_code) {
            case 'at00':
              val.status_code = '待支付'
              break
            case 'wfd0':
              val.status_code = '待分配'
              break
            case 'wfs0':
              val.status_code = '待发货'
              break
            case 'wfd1':
              val.status_code = '待收货'
              break
            case 'wfc0':
              val.status_code = '待评价'
              break
            case 'trm0':
              val.status_code = '已完成'
              break
            case 'c000':
              val.status_code = '已取消'
              break
            case 'r000':
              val.status_code = '退款中'
              break
            case 'rs00':
              val.status_code = '已退款'
              break
            case 'wfp0':
              val.status_code = '待生产'
              break
            case 'kd00':
              val.status_code = '客服签收'
              break
            case 'ip00':
              val.status_code = '生产中'
              break   
          }
          val.items.forEach((valChild) => {
            valChild.cover = `/attachment/${valChild.cover}`
          })
        })
      }
    },
  }
  require('../../assets/scss/myOrder.scss')

</script>
