<template>
  <div>
    <div class="container">
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
    <form id="payForm" action="https://mapi.alipay.com/gateway.do" method="get">
      <input name="body" type="hidden" :value="item.body" />
      <input name="notify_url" type="hidden" :value="item.notify_url" />
      <input name="out_trade_no" type="hidden" :value="item.out_trade_no" />
      <input name="partner" type="hidden" :value="item.partner" />
      <input name="payment_type" type="hidden" :value="item.payment_type" />
      <input name="return_url" type="hidden" :value="item.return_url" />
      <input name="seller_id" type="hidden" :value="item.seller_id" />
      <input name="service" type="hidden" :value="item.service" />
      <input name="sign" type="hidden" :value="item.sign" />
      <input name="sign_type" type="hidden" :value="item.sign_type" />
      <input name="_input_charset" type="hidden" :value="item._input_charset" />
      <input name="subject" type="hidden" :value="item.subject" />
      <input name="total_fee" type="hidden" :value="item.total_fee" />
    </form>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, MessageBox, Toast } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import Modal from '../common/Modal'
  export default {
    name: 'myAddress',
    components: {
      Swipe,
      SwipeItem,
      MessageBox,
      Modal,
      Toast
    },
    mounted() {
      this.isLoginMethod();
    },
    data() {
      return {
        isLogin: this.$store.state.user.userInfo.isLogin || '',   //是否登录
        userId: this.$store.state.user.userInfo.userId || '',      //当前用户ID
        thisId: this.$route.params.id || '',
        listData: {},
        item: {},
        flag: {
          isWX: true,
          isZFB: false,
        },
        payUrl: '',
      }
    },
    methods: {
      //  判断是否登录
      isLoginMethod() {
        if (this.isLogin) {
          this.loadShow = true
          this.getListData();
        } else {
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
          })
        }
      },
      //  获取列表数据
      getListData() {
        ajax.getDataFromApi({
          url: `/v1/order/${this.thisId}`,
        }, (response) => {
          this.listData = response.data.body
          this.orderNum = response.data.body
        })
      },
      //  微信-支付方式点击
      wxClick() {
        this.flag.isWX = true
        this.flag.isZFB = false
        this.payUrl = `/wx/order/${this.listData.order_number}`
      },
      //  支付宝-支付方式点击
      zfbClick() {
        this.flag.isZFB = true
        this.flag.isWX = false
        this.payUrl = `/v1/payment-gateway/front/alipay/${this.listData.order_number}`
        ajax.postDataToApi({
          url: this.payUrl
        }, (response) => {
          this.item = response.data.body
        })
      },
      //  支付宝支付方式支付
      aliPay() {
        setTimeout(() => {
          document.getElementById('payForm').submit()
        }, 100)
      },
      //  微信支付方式支付
      weixin() {
        ajax.postDataToApi({
          url: `/wx/order/${this.listData.order_number}`
        }, response => {
          let ua = navigator.userAgent.toLowerCase()
          console.log(navigator.userAgent)
          let timestamp = Date.parse(new Date())
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            onBridgeReady()
            function onBridgeReady() {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', response.body,
                function (res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    alert('成功')
                    Toast({
                      message: '支付成功',
                      position: 'middle',
                      duration: 1000
                    })
                    location.href= '/#/site/order-success'
                  }
                  if (res.err_msg == "get_brand_wcpay_request：cancel") {
                    Toast({
                      message: '支付失败',
                      position: 'middle',
                      duration: 1000
                    })
                   location.href= '/#/site/order-fail'
                  }
                  if (res.err_msg == "get_brand_wcpay_request：fail") {
                     Toast({
                      message: '支付失败',
                      position: 'middle',
                      duration: 1000
                    })
                   location.href= '/#/site/order-fail'
                  } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                }
              )
            }
            function callpay() {
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              } else {
                onBridgeReady();
              }
            }
          }
        })
      },
      //  去支付
      payMethod() {
        if (this.flag.isZFB) {
          this.aliPay()
        } else {
          this.weixin()
        }
      }
    }
  }
  require('../../assets/scss/orderPay.scss')
</script>