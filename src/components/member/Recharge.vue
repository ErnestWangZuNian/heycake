<template>
  <div>
    <div class="contianer">
      <div class="recharge-member">
        <div class="recharge-member-header">
          <div class="current-balance">
            <p class="content">{{memberInfo.balance | price}}</p>
            <p class="title">当前余额</p>
          </div>
        </div>
        <div class="recharge-member-content">
          <div class="amount-select">
            <div class="title cf">
              <div class="title-fl">选择充值金额</div>
              <div class="title-fr same-select">
                <p class="same-select-list" @click="changeRechargeMoney">{{rechargeMoney.selectedMoney}}</p>
                <ul class="same-select-list-container" v-if="rechargeMoney.status">
                  <li class="same-select-list" :class="item.selected ? 'same-select-list-active' : ''" v-for="item in rechargeMoney.canSelectMoney"
                    @click="selectCurrent(item)">{{item.value}}</li>
                </ul>
              </div>
            </div>
            <!--<ul>
              <li class="list cf">
                <div class="list-fl">
                  满<span class="green">200</span>元送<span class="green">100</span>元 <span class="red">(实际到账)</span>
                </div>
                <div class="list-fr selected selected1"></div>
              </li>
            </ul>-->
          </div>
          <div class="pay-select">
            <div class="title cf">
              <div class="title-fl">支付选择</div>
            </div>
            <ul>
              <li class="list cf" @click="selectZhb">
                <div class="list-fl cf">
                  <div class="list-fl-img img-zhifubao"></div>
                  <div class="list-fl-text">
                    <p class="text-title">支付宝</p>
                    <p>推荐支付宝用户使用</p>
                  </div>
                </div>
                <div class="list-fr selected" :class="payWay === 'alipay' ? 'selected1' : ''"></div>
              </li>
              <li class="list cf" @click="selectWx">
                <div class="list-fl cf">
                  <div class="list-fl-img img-weixin"></div>
                  <div class="list-fl-text">
                    <p class="text-title">微信</p>
                    <p>推荐微信用户使用</p>
                  </div>
                </div>
                <div class="list-fr selected " :class="payWay === 'weixin' ? 'selected1' : ''"></div>
              </li>
            </ul>
          </div>
          <div class="go-to-pay">
            <button class="btn" @click="goToPay">去支付</button>
          </div>
        </div>
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
  require('../../assets/scss/member.scss')
  import ajax from '../../utils/ajax'
  import utils from '../../utils/public'
  export default {
    name: 'MemberRecharge',
    data() {
      return {
        memberInfo: {},
        item: {},
        rechargeMoney: {
          canSelectMoney: [{
            value: '0.01',
            selected: true
          },
          {
            value: '200',
            selected: false
          },
          {
            value: '300',
            selected: false
          },
          {
            value: '400',
            selected: false
          },
          {
            value: '500',
            selected: false
          },
          {
            value: '600',
            selected: false
          },
          {
            value: '700',
            selected: false
          },
          {
            value: '800',
            selected: false
          },
          {
            value: '900',
            selected: false
          },
          {
            value: '1000',
            selected: false
          },],
          selectedMoney: "0.01",
          status: false,
        },
        payWay: 'alipay',
      }
    },
    mounted() {
      this.fetData()
    },
    methods: {
      fetData() {
        ajax.getDataFromApi({
          url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
        }, response => {
          this.memberInfo = response.data.body.list
        })
      },
      // 切换充值金额
      changeRechargeMoney() {
        this.rechargeMoney.status = true
      },
      // 选择当前充值金额 
      selectCurrent(item) {
        this.rechargeMoney.canSelectMoney.forEach(val => {
          val.selected = false
        })
        item.selected = true
        this.rechargeMoney.selectedMoney = item.value
        this.rechargeMoney.status = false
      },
      //  选择支付宝
      selectZhb() {
        this.payWay = 'alipay'
      },
      //  选择微信
      selectWx() {
        this.payWay = 'weixin'
      },
      //  去支付
      goToPay() {
        ajax.postDataToApi({
          url: `/v1/recharge`,
          body: {
            money: this.rechargeMoney.selectedMoney,
            pay_method: this.payWay,
            member_id: utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId
          }
        }, response => {
          let orderNumber = response.data.body
          let payUrl = ``
          if (this.payWay === 'alipay') {
            payUrl = `/v1/payment-gateway/front/alipay/${orderNumber}`
            ajax.postDataToApi({
              url: payUrl
            }, (response) => {
              this.item = response.data.body
              setTimeout(() => {
                document.getElementById('payForm').submit()
              }, 2000)
            })
          } else {
            payUrl = `/wx/order/${orderNumber}`
          }
        })
      }
    }
  }
</script>