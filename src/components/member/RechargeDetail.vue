<template>
  <div>
    <div class="contianer">
      <div class="detail-member">
        <div class="detail-member-header recharge-detail-header cf">
          <div class="same-select mr20">
            <p class="same-select-list">支付宝</p>
            <!--<ul class="same-select-list-container">
              <li class="same-select-list same-select-list-active">支付宝</li>
              <li class="same-select-list">微信</li>
            </ul>-->
          </div>
          <div class="same-select mr20">
            <p class="same-select-list">支付宝</p>
            <!--<ul class="same-select-list-container">
              <li class="same-select-list same-select-list-active">支付宝</li>
              <li class="same-select-list">微信</li>
            </ul>-->
          </div>
          <div class="same-select mr20">
            <p class="same-select-list">支付宝</p>
            <!--<ul class="same-select-list-container">
              <li class="same-select-list same-select-list-active">支付宝</li>
              <li class="same-select-list">微信</li>
            </ul>-->
          </div>
          <div class="search">搜索</div>
        </div>
        <div class="detail-member-content">
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
                           <p class="fr-info-store">微商城</p>
                           <p class="fr-info-decont color-red">满100送10</p>
                       </div>
                    </div>
                </div>
            </li>
              </loadmore>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  require('../../assets/scss/member.scss')
  require('../../assets/scss/member.scss')
  import { Loadmore } from 'mint-ui'
  import ajax from '../../utils/ajax'
  import utils from '../../utils/public'
  export default {
    name: 'MemberRechargeDetail',
     components: {
       Loadmore
     },
    data() {
      return {
        rechargeList: [],
        text: {
          drop: '释放更新',
          loding: '小嘿正在努力加载中'
        },
        page: {
          total: 1,
          currentPage: 1
        },
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      // 获取数据
      fetchData() {
        ajax.getDataFromApi({
          url: `/v1/recharge/${utils.localstorageGetData('userInfo').userId}`
      },response => {
         this.rechargeList = response.data.body.list
      })
      },
      //    下拉刷洗数据
      loadTop() {
        if (this.page.currentPage < this.page.total) {
          this.page.currentPage++
          this.fetchData(this.page.currentPage)
        } else {
          this.text.loding = "没有更多数据了！"
        }
      },
    }
  }
</script>
