<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="member-center">
        <div class="theTop">
          <!--已登录-->
          <div class="logined">
            <div class="fl">
              <p>用 户 名 ：<span>{{userInfo.name}}</span></p>
              <p>当前积分：<span>{{userInfo.total}}</span></p>
            </div>
            <div class="fr">
              <router-link to="index" class="btn" >返回首页</router-link>
            </div>
          </div>

        </div>
        <div class="theNav">
          <div class="navBox">
            <div class="nav-img img1"></div>
            <div class="nav-name">待支付</div>
          </div>

          <div class="navBox">
            <div class="nav-img img2"></div>
            <div class="nav-name">待发货</div>
          </div>

          <div class="navBox">
            <div class="nav-img img3"></div>
            <div class="nav-name">待收货</div>
          </div>

          <div class="navBox">
            <div class="nav-img img4"></div>
            <div class="nav-name">待评价</div>
          </div>
          <div class="cf"></div>
        </div>
        <!--分隔符-->
        <div class="splitter"></div>
        <router-link to='my-order'><div class="listBox"><span class="order"></span>全部订单</div></router-link>
        <!--分隔符-->
        <div class="splitter"></div>

        <router-link to='my-score'><div class="listBox"><span class="detail"></span>积分明细</div></router-link>
        <router-link to='score-exchange'><div class="listBox"><span class="exchanges"></span>积分兑换</div></router-link>
        <router-link to='my-comment'><div class="listBox"><span class="evaluate"></span>我的评价</div></router-link>
        <router-link to=''><div class="listBox"><span class="addressed"></span>收货地址</div></router-link>
        <router-link to=''><div class="listBox"><span class="about"></span>关于HEYCAKE</div></router-link>
        <div class="cf"></div>
        <div class="loginout">
          <button type="button">退出登录</button>
        </div>
        <p class="find-help">
          如需帮助，欢迎致电：400-1139-499
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, MessageBox} from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'UserCenter',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox,
    },
    data () {
      return {
        loading: true,
        loadShow: false,
        isLogin:this.$store.state.user.userInfo.isLogin  || '',   //是否登录
        userId:this.$store.state.user.userInfo.userId || '',      //当前用户ID
        userInfo:{}
      }
    },
    mounted () {
      //判断是否登录
      this.isLoginMethod()
    },
    methods: {
      //判断是否登录
      isLoginMethod(){
        if(this.isLogin){
          this.loadShow = true
          this.getListData()
        }else{
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
          })
        }
      },
      //获取列表数据
      getListData(){
        ajax.getDataFromApi({
          url:'/v1/user-center'
        },(response) => {
          this.userInfo = response.data.body.list
          this.loading = false
        })
      }
    },
  }
  require('../assets/scss/userCenter.scss')
</script>
