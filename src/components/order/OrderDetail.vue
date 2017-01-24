<template>
    <div>
        <loading v-if="loading"></loading>
        <div class="container" v-if="!loading">
          <ul class="order-detail">
            <li>状态：<span>{{orderInfo.status_code}}</span></li>
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
                <div class="text">{{orderInfo.information.custom_city}} {{orderInfo.information.custom_county}} {{orderInfo.information.custom_detail_area}}</div>
              </section>
            </div>
          </div>
          <div class="splitter"></div>
          <!--产品UL-->
          <ul>
            <li class="order-detail-grid height-150 border-bottom" v-for="item in orderInfo.items">
              <div class="grid-cell u-w100">
                <img src="">
              </div>
              <div class="grid-cell">
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
          <!--运费及其他UL-->
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
              <div class="grid-cell text-right">微信支付</div>
            </li>
            <li class="order-detail-grid border-bottom">
              <div class="grid-cell">留言：{{orderInfo.user_comment === '' ? '无留言' : orderInfo.user_comment}}</div>
            </li>
          </ul>
          <div class="splitter"></div>
          <div class="order-detail-grid border-bottom">
            <div class="grid-cell">订单跟踪</div>
            <div class="grid-cell text-right">查询热线：15866668888</div>
          </div>
          <ul>
            <li class="order-detail-grid" v-for="item in orderInfo.operate_histories">
              <div class="grid-cell u-w50">
                <div class="line"><div class="yuan"></div></div>
              </div>
              <div class="grid-cell">{{item.created_at}} {{item.content}}</div>
            </li>
          </ul>
        </div>
    </div>

</template>
<script>
  import {MessageBox } from 'mint-ui'
  import  Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'OrderDetail',
    components: {
      Loading,
      MessageBox
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
         orderInfo: {}
      }
    },
    methods: {
      fetchData() {
       ajax.getDataFromApi({
         url: `/v1/order/${this.$route.params.id}`
        },response => {
         this.orderInfo = response.data.body
          switch(this.orderInfo.status_code){
            case 'at00':
              this.orderInfo.status_code = '待支付'
              break;
            case 'wfd0':
              this.orderInfo.status_code = '待分配'
              break;
            case 'wfs0':
              this.orderInfo.status_code = '待发货'
              break;
            case 'wfd1':
              this.orderInfo.status_code = '待收货'
              break;
            case 'wfc0':
              this.orderInfo.status_code = '待评价'
              break;
            case 'trm0':
              this.orderInfo.status_code = '已完成'
              break;
            case 'c000':
              this.orderInfo.status_code = '已取消'
              break;
            case 'r000':
             this.orderInfo.status_code = '退款中'
              break;
            case 'rs00':
             this.orderInfo.status_code = '已退款'
              break;
            case 'wfp0':
              this.orderInfo.status_code = '待生产'
              break;
          }
       })
      }
      // //列表数据处理
      // dataDispose(data){
      //   data.forEach((val,index) => {
      //     switch(val.status_code){
      //   case 'at00':
      //     val.status_code = '待支付'
      //     break;
      //   case 'wfd0':
      //     val.status_code = '待分配'
      //     break;
      //   case 'wfs0':
      //     val.status_code = '待发货'
      //     break;
      //   case 'wfd1':
      //     val.status_code = '待收货'
      //     break;
      //   case 'wfc0':
      //     val.status_code = '待评价'
      //     break;
      //   case 'trm0':
      //     val.status_code = '已完成'
      //     break;
      //   case 'c000':
      //     val.status_code = '已取消'
      //     break;
      //   case 'r000':
      //     val.status_code = '退款中'
      //     break;
      //   case 'rs00':
      //     val.status_code = '已退款'
      //     break;
      //   }
      //   val.items.forEach((valChild)=>{
      //     valChild.cover = `/attachment/${valChild.cover}`
      // })
      // })
      // }
    },
  }
  require('../../assets/scss/orderDetail.scss')
</script>
