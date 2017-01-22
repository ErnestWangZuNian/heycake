<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="member-center">
        <div class="theTop">
          <!--已登录-->
          <div class="logined">
            <div class="logined-header cf">
              <div class="fl">
                <p class="logined-header-text">会员账号 ：<span>{{userInfo.member_account}}</span></p>
              </div>
              <div class="fr">
                <router-link to="/site/member-recharge" class="btn">我要充值</router-link>
              </div>
            </div>
            <router-link to="/site/member">
              <div class="logined-content">
              <div class="content-list">
                <p>会员卡号</p>
                <p>{{userInfo.card_number === null ? '无会员卡' : userInfo.card_number}}</p>
              </div>
              <div class="content-list">
                <p>余额</p>
                <p>{{userInfo.balance | detailPrice}}</p>
              </div>
              <div class="content-list tex">
                <p>积分</p>
                <p>{{userInfo.score}}</p>
              </div>
            </div>
            </router-link>
          </div>
        </div>
        <!--分隔符-->
        <div class="splitter"></div>
        <router-link to='my-order'>
          <div class="listBox"><span class="order"></span>我的订单<i class="order-text">查看全部订单</i></div>
        </router-link>
        <!--导航-->
        <div class="theNav">
          <div class="navBox" @click="statusJump('at00')">
            <div class="nav-img img1"></div>
            <div class="nav-name">待支付</div>
          </div>
          <div class="navBox" @click="statusJump('wfs0')">
            <div class="nav-img img2"></div>
            <div class="nav-name">待发货</div>
          </div>
          <div class="navBox" @click="statusJump('wfd1')">
            <div class="nav-img img3"></div>
            <div class="nav-name">待收货</div>
          </div>
          <div class="navBox" @click="statusJump('wfc0')">
            <div class="nav-img img4"></div>
            <div class="nav-name">待评价</div>
          </div>
          <div class="cf"></div>
        </div>
        <!--分隔符-->
        <div class="splitter"></div>
        <router-link to='my-score'>
          <div class="listBox"><span class="detail"></span>积分明细</div>
        </router-link>
        <router-link to='score-exchange'>
          <div class="listBox"><span class="exchanges"></span>积分兑换</div>
        </router-link>
        <router-link to='my-comment'>
          <div class="listBox"><span class="evaluate"></span>我的评价</div>
        </router-link>
        <router-link to='my-address'>
          <div class="listBox"><span class="addressed"></span>收货地址</div>
        </router-link>
        <router-link to='about'>
          <div class="listBox"><span class="about"></span>关于HEYCAKE</div>
        </router-link>
        <div class="cf"></div>
        <div class="loginout">
          <button type="button" @click="loginOut()">退出登录</button>
        </div>
        <router-link to='/site/index'>
          <div class="goto-index">
            商城首页
          </div>
        </router-link>
        <p class="find-help">
          如需帮助，欢迎致电：400-1139-499
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    MessageBox
  } from 'mint-ui'
  import Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'UserCenter',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox,
    },
    data() {
      return {
        loading: true,
        loadShow: false,
        isLogin: this.$store.state.user.userInfo.isLogin || '', //是否登录
        userId: this.$store.state.user.userInfo.userId || '', //当前用户ID
        userInfo: {}
      }
    },
    mounted() {
      //判断是否登录
      this.isLoginMethod()
    },
    methods: {
      //判断是否登录
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
      getListData() {
        ajax.getDataFromApi({
          url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
        }, (response) => {
          this.userInfo = response.data.body.list
          this.loading = false
        })
      },
      //退出登录
      loginOut() {
        let userInfo = {
          isLogin: false,
          userId: null
        }
        localStorage.clear('userInfo')
        this.$store.dispatch('setUserInfo', userInfo)
        location.href = '/#/site/index'
      },
      //待支付、代发货、待收货、待评价 点击跳转
      statusJump(status) {
        location.href = `/#/site/my-order/${status}`
      }
    }
  }
  require('../../assets/scss/userCenter.scss')

</script>
