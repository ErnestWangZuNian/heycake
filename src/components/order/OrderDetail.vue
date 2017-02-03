<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <ul class="order-detail">
        <li>状态：<span>{{orderInfo.status_code | orderStatus}}</span></li>
        <li>订单编号：<span>{{orderInfo.order_number}}</span></li>
        <li>下单时间：<span>{{orderInfo.create_time}}</span></li>
        <li>预约时间：{{orderInfo.appointment_begin_time}} - {{orderInfo.appointment_end_time}}</li>
      </ul>
      <div class="splitter"></div>
      <div class="order-address">
        <div class="info">
          <section>
            <div class="icon icon-name"></div>
            <div class="text">{{orderInfo.information.custom_name}}</div>
          </section>
          <section>
            <div class="icon icon-tel"></div>
            <div class="text">{{orderInfo.information.custom_tel_phone}}</div>
          </section>
          <section>
            <div class="icon icon-addr"></div>
            <div class="text" v-if="orderInfo.logistics_mode !=='pick-up'">{{orderInfo.information.custom_city}} {{orderInfo.information.custom_county}} {{orderInfo.information.custom_detail_area}}
              {{ orderInfo.information.doorplate}}
            </div>
            <div v-if="orderInfo.logistics_mode ==='pick-up'">
              {{ orderInfo.information.store_address}}</div>
        </div>
        </section>
      </div>
    </div>
    <div class="splitter"></div>
    <!--产品UL-->
    <div>
      <ul>
        <li class="order-detail-grid height-150 border-bottom" v-for="item in orderInfo.items">
          <div class="grid-cell u-w100">
            <img src="">
          </div>
          <div class="grid-cell u-good-info">
            <div class="title">{{item.name}}</div>
            <div class="c-666 f-20">
              {{item.specifications | spec}}
            </div>
          </div>
          <div class="grid-cell u-w130 tright">
            <div class="price">￥{{item.price}}</div>
            <div class="f-20 c-666">x{{item.amount}}</div>
          </div>
        </li>
      </ul>
    </div>
    <!--运费及其他UL-->
    <div>
      <ul>
        <li class="order-detail-grid border-bottom">
          <div class="grid-cell">运费</div>
          <div class="grid-cell text-right">{{orderInfo.logistics_price}}元</div>
        </li>
        <li class="order-detail-grid border-bottom">
          <div class="grid-cell">合计</div>
          <div class="grid-cell text-right">{{orderInfo.pay_money}}元</div>
        </li>
        <li class="order-detail-grid border-bottom">
          <div class="grid-cell">支付方式</div>
          <div class="grid-cell text-right">{{orderInfo.pay_method | payway}}</div>
        </li>
        <li class="order-detail-grid border-bottom">
          <div class="grid-cell">留言：{{orderInfo.user_comment === '' ? '无留言' : orderInfo.user_comment}}</div>
        </li>
      </ul>
    </div>
    <div class="splitter"></div>
    <div class="order-detail-grid border-bottom">
      <div class="grid-cell">订单跟踪</div>
      <div class="grid-cell text-right">查询热线：15866668888</div>
    </div>
    <div>
      <ul>
        <li class="order-detail-grid " v-for="item in orderInfo.operate_histories">
          <div class="grid-cell u-w50">
            <div class="line">
              <div class="yuan"></div>
            </div>
          </div>
          <div class="grid-cell order-trace-info">{{item.created_at}} {{item.content}}</div>
        </li>
      </ul>
    </div>
    <div class="blance-splier">
    </div>
    <div class="order-detail-bottom" v-if="orderInfo.status_code === 'at00'">
      <div class="order-detail-status">{{orderInfo.status_code | orderStatus}}</div>
      <div class="order-detail-cancel" v-if="orderInfo.status_code === 'at00'" @click="cancelOrder">取消订单</div>
      <div class="order-detail-gotopay" v-if="orderInfo.status_code === 'at00'" @click="gotoPay(orderInfo.id)">去支付</div>
    </div>
  </div>
  </div>

</template>
<script>
  import { MessageBox } from 'mint-ui'
  import Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'OrderDetail',
    components: {
      Loading,
      MessageBox
    },
    mounted() {
      this.fetchData()
    },
    data() {
      return {
        orderInfo: {}
      }
    },
    methods: {
      // 获取数据
      fetchData() {
        ajax.getDataFromApi({
          url: `/v1/order/${this.$route.params.id}`
        }, response => {
          this.orderInfo = response.data.body
        })
      },
      //  取消订单
      cancelOrder() {
        ajax.putDataToApi({
          url: `/v1/cancel/${this.orderInfo.id}`
        }, response => {
          this.fetchData()
        })
      },
      // 去支付
      gotoPay(id) {
        location.href = `/#/site/order-pay/${id}`
      }
    },
  }
  require('../../assets/scss/orderDetail.scss')
</script>