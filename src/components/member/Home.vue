<template>
  <div>
    <div class="container">
      <div class="home-member">
        <div class="info">
          <div class="card-number">卡号： {{memberInfo.member_account}}</div>
          <div class="card-info-list">
            <span class="card-info-row">充值总额:{{memberInfo.recharge_total | detailPrice}}</span>
            <span class="card-info-row">消费总额:{{memberInfo.consumption_total | detailPrice}}</span>
          </div>
          <div class="card-info-list">
            <span class="card-info-row">累积积分: {{memberInfo.score}}</span>
            <span class="card-info-row">卡内余额: {{memberInfo.balance | detailPrice}}</span>
          </div>
        </div>
        <div class="nav">
          <ul>
            <li class="nav-border">
              <router-link to="/site/member-recharge">我要充值</router-link>
            </li>
            <li class="nav-border">
              <router-link to="/site/member-recharge-detail">充值明细</router-link>
            </li>
            <li>
              <router-link to="/site/member-consumption-detail">消费明细</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  require('../../assets/scss/member.scss')
  import ajax from '../../utils/ajax'
  import utils from '../../utils/public'
  export default {
    name: 'member-home',
    mounted(){
      this.fetData()
    },
    data() { 
      return {
        memberInfo: {}
      }
    },
    methods: {
      fetData() {
        ajax.getDataFromApi({
           url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
      },response => {
          this.memberInfo = response.data.body.list
      })
      }
    }
  }
</script>