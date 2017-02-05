<template>
  <div>
    <div class="contianer">
      <div class="detail-member">
        <div class="detail-member-header consumption-detail-header cf">
          <div class="same-select mr20">
            <p class="same-select-list" @click="changePayWay">{{payWay.selected}}</p>
            <ul class="same-select-list-container" v-if="payWay.status">

              <li class="same-select-list" :class="[item.selected ? 'same-select-list-active' : '']" v-for="item in payWay.list" @click="selectedPayway(item)">{{item.val}}</li>
            </ul>
          </div>
          <div class="same-select mr20">
            <p class="same-select-list" @click="openPicker">选择日期</p>
          </div>
          <div class="search" @click="searchPay()">搜索</div>
        </div>
        <div class="detail-member-content">
          <ul class="list-container">
            <li class="list" v-for="item in consumptionList" @click="gotoOrder(item.order_id)">
              <div class="list-header cf">
                <div class="list-header-fl">
                  支付方式：{{item.pay_method | onlinePayway}}
                </div>
                <div class="list-header-fr">
                  {{item.order_time}}
                </div>
              </div>
              <div class="list-content cf">
                <div class="list-content-fl">
                  <p class="list-example">订单号：{{item.order_number}}</p>
                  <p class="list-example">订单金额：{{item.order_money | detailPrice}}</p>
                  <p class="list-example">实际支付金额： <span class="color-red">{{item.pay_money | detailPrice}}</span></p>
                </div>
                <div class="list-content-fr">
                  <div class="fr-info consumption-fr-info">
                    <p class="fr-info-store">{{item.terminal_name | terminalName}}</p>
                    <p class="fr-info-decont color-red"></p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  require('../../assets/scss/member.scss')
  var DateTimePicker = require('date-time-picker')
  // import { DatetimePicker } from 'mint-ui'
  import ajax from '../../utils/ajax'
  import utils from '../../utils/public'
  export default {
    name: 'ConsumptionDetail',
    components: {
      // DatetimePicker
    },
    data() {
      return {
        consumptionList: [],
        pickerValue: '',
        payWay: {
          status: false,
          selected: '余额支付',
          selectedData: 'alipay',
          list: [
            {
              selected: true,
              val: '余额支付',
              key: 'balance',
            },
            {
              selected: false,
              val: '支付宝',
              key: 'alipay',
            },
            {
              selected: false,
              val: '微信',
              key: 'weixin',
            },
          ]
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      //  获取数据
      fetchData() {
        ajax.getDataFromApi({
          url: `/v1/member-order/${utils.localstorageGetData('userInfo').userId}`
        }, response => {
          this.consumptionList = response.data.body.list
        })
      },
      //  去订单详情
      gotoOrder(id) {
        location.href = `/#/site/order-detail/${id}`
      },
      //  切换分类
      changePayWay() {
        this.payWay.status = true
      },
      // 打开时间选择器
      openPicker() {
        let options = {
  lang: 'zh-CN', // 语言，默认 'EN' ，默认 'EN', 'zh-CN' 可选
  format: 'yyyy-MM-dd', // 格式， 'yyyy-MM-dd'
  default: new Date(), // 默认值 `new Date()`。 如果`default`有值且是字符串的话就会根据`format`参数来将其转化为一个`Date`实例。当然可以选择传入一个日期实例。
}
       let config ={
  day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  shortDay: ['日', '一', '二', '三', '四', '五', '六'],
  MDW: 'M月d日D', // 主面板标题部分 月日星期
  YM: 'yyyy年M月', // 日期部分标题显示
  OK: '确定', // 确定按钮
  CANCEL: '取消' // 取消按钮
}
        var datePicker = new DateTimePicker.Date(options, config)
  datePicker.on('selected', function (formatDate, now) {
    alert(formatDate)
    // formatData = 2016-10-19
    // now = Date实例 -> Wed Oct 19 2016 20:28:12 GMT+0800 (CST)
  })
        console.log(new Date(this.pickerValue))
      },
      // 搜索
      searchPay() {
        ajax.getDataFromApi({
          url: `/v1/member-order/${utils.localstorageGetData('userInfo').userId}`,
          data: {
            pay_method: this.payWay.selectedData
          }
        }, response => {
          console.log(response)
        })
      },
      //  选择分类
      selectedPayway(item) {
        this.payWay.list.forEach(val => {
          val.selected = false
        })
        item.selected = true
        this.payWay.selected = item.val
        this.payWay.selectedData = item.key
        this.payWay.status = false
      }
    }
  }
</script>