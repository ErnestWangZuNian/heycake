<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="exchange">
        <ul>
          <li class="list" v-for="item in listData" v-if="item.score != 0">
            <div  class="grid height-160">
              <div class="grid-cell u-w120">
                <img :src="item.picture">
              </div>
              <div class="grid-cell">
                <p class="title">{{item.name}}</p>
                <span class="c-888 font-28">￥{{item.price}}</span>
              </div>
              <div class="grid-cell u-1of4 tcenter border-left">
                <div class="font-28">
                  <p class="c-f76060">{{item.score}}</p>
                  <span class="c-f76060">积分</span>
                </div>
              </div>
            </div>
            <div class="btn-red">立即兑换</div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem,MessageBox } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'ScoreExchange',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox
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
        listData:[],
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
          url:'/v1/goods',
        },(response)=>{
          this.listData = response.data.body.list;
          this.dataDispose(this.listData)
          //数据请求完成,改变loading值,关闭load，显示渲染后的页面
          this.loading = false;
        })
      },
      //列表数据处理
      dataDispose(data){
        data.forEach(val =>{
          val.picture = `/attachment/${val.picture}`
        })
      }
    },
  }
  require('../assets/scss/scoreExchange.scss')
</script>
