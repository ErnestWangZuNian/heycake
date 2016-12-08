<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="card">
        <div class="card-bg">
          <div class="text">
            <p class="tcenter">当前积分</p>
            <p class="tcenter font-60">{{scoreData}}</p>
          </div>
        </div>
      </div>

      <ul>
        <li class="grid border-bottom height-105" v-for="item in listData">
          <div class="grid-cell">
            <p class="font-28">操作：{{item.type}}</p>
            <span class="c-888">{{item.publish_time}}</span>
          </div>
          <div class="grid-cell tright">
            <template v-if='item.type=="购买" || item.type == "交易" || item.type == "增加"'>
              <span class="c-red font-36">+{{item.score}}</span>
            </template>
            <template v-else>
              <span class="c-396 font-36">-{{item.score}}</span>
            </template>
          </div>
        </li>
      </ul>

      <template v-if="listData == ''"><div class="tcenter font-24 mt20">没有更多数据了</div></template>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  import utils from '../utils/public'
  export default {
    name: 'MyScore',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox
    },
    mounted () {
      this.isLoginMethod()
      this.getScore()
    },
    data () {
      return {
        loading: true,
        loadShow: false,
        isLogin:this.$store.state.user.userInfo.isLogin  || '',   //是否登录
        userId:this.$store.state.user.userInfo.userId || '',      //当前用户ID
        listData:[],
        scoreData:{},
      }
    },
    methods: {
//      判断是否登录
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
          url:'/v1/score-detail',
        },(response)=>{
          this.listData = response.data.body.list;
          //数据请求完成,改变loading值,关闭load，显示渲染后的页面
          this.loading = false;
        })
      },
      //获取当前用户积分
      getScore(){
        ajax.getDataFromApi({
          url:'/v1/user-center'
        },(response)=>{
          this.scoreData = response.data.body.list.total
        })
      }
    },
  }
  require('../assets/scss/myScore.scss')
</script>
