<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="payment">
        <div class="order-info">
          <p>订单编号：<span class="c-red">{{listData.order_number}}</span></p>
          <p>支付方式：<span>在线支付</span></p>
          <p>支付金额：<span class="c-red">{{listData.pay_money | price}}</span></p>
        </div>
        <div class="splitter"></div>
        <div class="pay-title">支付选择：</div>
      </div>
      <div class="order-pay-grid">
        <div class="grid-cell" :class="{'border-red':flag.isWX}" @click="wxClick()">
          <div class="pay-img"><img src="../../assets/img/icon_wechart.png">微信支付</div>
        </div>
        <div class="grid-cell" :class="{'border-red':flag.isZFB}" @click="zfbClick()">
          <div class="pay-img"><img src="../../assets/img/icon_zhifubao.png">支付宝支付</div>
        </div>
      </div>

      <div class="tcenter mt50"><span class="order-pay-btn" @click="payMethod()">去支付</span></div>
    </div>
     <!-- 支付宝提交-->
     <form id="payForm"  action="https://mapi.alipay.com/gateway.do" method="get">
        <input name="body" v-model="item.body" />
        <input name="notify_url" v-model="item.notify_url" />
        <input name="out_trade_no" v-model="item.out_trade_no" />
        <input name="partner" v-model="item.partner" />
        <input name="payment_type" v-model="item.payment_type" />
        <input name="return_url" v-model="item.return_url" />
        <input name="seller_id" v-model="item.seller_id" />
        <input name="service" v-model="item.service" />
        <input name="sign" v-model="item.sign" />
        <input name="sign_type" v-model="item.sign_type" />
        <input name="_input_charset" v-model="item._input_charset" />
        <input name="subject" v-model="item.subject" />
        <input name="total_fee" v-model="item.total_fee" />
    </form>
  </div>
</template>
<script>
  import {Swipe, SwipeItem,MessageBox } from 'mint-ui'
  import  Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import Modal from '../common/Modal'
  export default {
    name: 'myAddress',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox,
      Modal
    },
    mounted () {
      this.isLoginMethod()
    },
    data () {
      return {
        loading: true,
        loadShow: false,
        isLogin:this.$store.state.user.userInfo.isLogin  || '',   //是否登录
        userId:this.$store.state.user.userInfo.userId || '',      //当前用户ID
        thisId:this.$route.params.id || '',
        listData:{},
        item: {},
        flag:{
          isWX:true,
          isZFB:false,
        },
        payUrl:'',
      }
    },
    methods: {
      //判断是否登录
      isLoginMethod(){
        if(this.isLogin){
          this.loadShow = true
          this.getListData();
        }else{
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
          })
        }
      },
      //获取列表数据
      getListData(){
        ajax.getDataFromApi({
          url:`/v1/order/${this.thisId}`,
        },(response)=>{
          this.listData = response.data.body
          this.orderNum = response.data.body
          //数据请求完成,改变loading值,关闭load，显示渲染后的页面
          this.loading = false;
        })
      },
      //微信-支付方式点击
      wxClick(){
        this.flag.isWX = true
        this.flag.isZFB = false
        this.payUrl = `/wx/order/${this.listData.order_number}`
//          /wx/order/242000171
      },
      //支付宝-支付方式点击
      zfbClick(){
        this.flag.isZFB = true
        this.flag.isWX = false
        this.payUrl = `/v1/payment-gateway/front/alipay/${this.listData.order_number}`
//          /v1/payment-gateway/front/alipay/242000171
      },
//      去支付
      payMethod(){
        ajax.postDataToApi({
          url:this.payUrl || `/wx/order/${this.listData.order_number}`,
        },(response)=>{
          this.item = response.data.body
          document.getElementById('payForm').submit()
        })
      },
    },
  }
  require('../../assets/scss/orderPay.scss')
</script>
