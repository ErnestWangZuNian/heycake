<template>
  <div>
    <div class="contianer">
      <div class="detail-member">
        <div class="detail-member-header recharge-detail-header cf">
          <div class="same-select mr20">
            <p class="same-select-list" @click="changePayWay">{{payWay.selected}}</p>
            <ul class="same-select-list-container" v-if="payWay.status">

              <li class="same-select-list" :class="[item.selected ? 'same-select-list-active' : '']" v-for="item in payWay.list" @click="selectedPayway(item)">{{item.val}}</li>
            </ul>
          </div>
          <div class="same-select mr20">
            <p class="same-select-list" @click="openStartPicker">{{this.time.startTime}}</p>
          </div>
          <div class="same-select mr20">
            <p class="same-select-list" @click="openEndPicker">{{this.time.endTime}}</p>
          </div>
          <div class="search" @click="searchPay()">搜索</div>
        </div>
        <div class="detail-member-content recharge-detail-member-content">
          <ul class="list-container">
            <loadmore :bottom-method="loadTop" :auto-fill="false" :bottom-loading-text="text.loding" :bottom-drop-text="text.drop" :bottom-status-change="bottomStatusChange">
              <li class="list" v-for="item in rechargeList">
                <div class="list-header cf">
                  <div class="list-header-fl">
                    充值单号：{{item.order_number}}
                  </div>
                  <div class="list-header-fr">
                    {{item.created_at}}
                  </div>
                </div>
                <div class="list-content cf">
                  <div class="list-content-fl">
                    <p class="list-example">充值金额：{{item.recharge_money | detailPrice}}</p>
                    <p class="list-example">实得金额：<span class="color-red">{{item.fact_money | detailPrice}}</span></p>
                    <p class="list-example">支付金额：{{item.recharge_money | detailPrice}}</p>
                    <p class="list-example">支付方式：{{item.pay_method | onlinePayway}}</p>
                  </div>
                  <div class="list-content-fr">
                    <div class="fr-info">
                      <p class="fr-info-store">{{item.terminal_name | terminalName}}</p>
                      <p class="fr-info-decont color-red"></p>
                    </div>
                  </div>
                </div>
              </li>
              <div slot="bottom" class="mint-loadmore-bottom" v-show="rechargeList.length > 5">
            <span v-show="loadStatus.current === 'pull' ">{{text.pull}}</span>
            <span v-show="loadStatus.current === 'drop' ">{{text.drop}}</span>
            <span v-show="loadStatus.current === 'loading'"> <!--加载中图标-->
                <spinner type="fading-circle" :size="40" color="#000" class='mint-loading-icon'></spinner>Loading...</span>
          </div>
            </loadmore>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  require('../../assets/scss/member.scss')
  let DateTimePicker = require('date-time-picker')
  import { Loadmore, Spinner } from 'mint-ui'
  import ajax from '../../utils/ajax'
  import utils from '../../utils/public'
  export default {
    name: 'MemberRechargeDetail',
    components: {
      Loadmore,
      Spinner
    },
    data() {
      return {
        rechargeList: [],
        time: {
          startTime: '选择日期',
          endTime: '选择日期'
        },
        loadStatus: {
          current: 'pull',
          isLoadAll: false
        },
        page: {
          total: 1,
          currentPage: 1
        },
        text: {
          pull: '上拉刷新',
          drop: '释放更新'
        },
        dateTime: {
          options: {
            lang: 'zh-CN',
            format: 'yyyy-MM-dd',
            default: new Date()
          },
          config: {
            day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            shortDay: ['日', '一', '二', '三', '四', '五', '六'],
            MDW: 'M月d日D',
            YM: 'yyyy年M月',
            OK: '确定',
            CANCEL: '取消'
          }
        },
        payWay: {
          status: false,
          selected: '全部',
          selectedData: '',
          list: [
            {
              selected: true,
              val: '全部',
              key: '',
            },
             {
              selected: false,
              val: 'pos刷卡',
              key: 'post',
            },
            {
              selected: false,
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
              val: '现金',
              key: 'cash',
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
      fetchData(page = 1) {
        let start_time = ""
        let end_time = ""
        if (this.time.startTime === "选择日期") {
          start_time = ""
        } else {
          start_time = this.time.startTime
        }
        if (this.time.endTime === "选择日期") {
          end_time = ""
        } else {
          end_time = this.time.startTime
        }
        ajax.getDataFromApi({
          url: `/v1/recharge/${utils.localstorageGetData('userInfo').userId}`,
          data: {
            page: page,
            per_page: 8,
            pay_method: this.payWay.selectedData,
            start_time: start_time,
            end_time: end_time,
          }
        }, response => {
          let data = []
          response.data.body.list.forEach((val) => {
              if(val.status === 1) {
                data.push(val)
              }
           })
          this.rechargeList =  this.rechargeList.concat(data)
          this.page.total = response.data.body.pagination.total
          this.text.pull = "上拉刷新"
          this.$refs.loadmore.onBottomLoaded()
        })
      },
      //  获取上拉刷新各种时候的状态
      getLodingStatus(status) {
        this.loadStatus.current = status
      },
      //  切换付款方式
      changePayWay() {
        this.payWay.status = true
      },
      //  打开开始时间选择器
      openStartPicker() {
        let self = this
        let datePicker = new DateTimePicker.Date(this.dateTime.options, this.dateTime.config)
        datePicker.on('selected', function (formatDate, now) {
          self.time.startTime = formatDate
        })
      },
      //  打开结束时间选择器
      openEndPicker() {
        let self = this
        let datePicker = new DateTimePicker.Date(this.dateTime.options, this.dateTime.config)
        datePicker.on('selected', function (formatDate, now) {
          self.time.endTime = formatDate
        })
      },
      //  选择付款方式
      selectedPayway(item) {
        this.payWay.list.forEach(val => {
          val.selected = false
        })
        item.selected = true
        this.payWay.selected = item.val
        this.payWay.selectedData = item.key
        this.payWay.status = false
      },
      //  下拉刷洗数据
      loadTop() {
        if (this.page.currentPage < this.page.total) {
          this.page.currentPage++
          this.fetchData(this.page.currentPage)
        } else {
          this.text.pull = '没有更多数据了'
          this.loadStatus.isLoadAll = true
        }
      },
      //  搜索
      searchPay() {
        this.rechargeList = []
        this.text.pull = "上拉刷新"
        this.loadStatus.isLoadAll = false
        this.fetchData()
      }
    }
  }
</script>