<template>
  <div>
    <div class="container">
      <div class="exchange">
        <ul>
          <li class="list" v-for="item in listData">
            <div class="grid height-160">
              <div class="grid-cell u-w120">
                <img :src="item.goodsIcon | imgDetail">
              </div>
              <div class="grid-cell">
                <p class="title">{{item.goodsName}}</p>
                <span class="c-red font-28">￥{{item.goodsPrice}}</span>
              </div>
            </div>

            <div class="grid border-top">
              <div class="grid-cell">
                <div class="star-bg">
                  <div class="star star1" v-if="item.score == 1"></div>
                  <div class="star star2" v-if="item.score == 2"></div>
                  <div class="star star3" v-if="item.score == 3"></div>
                  <div class="star star4" v-if="item.score == 4"></div>
                  <div class="star star5" v-if="item.score == 5"></div>
                </div>
              </div>
              <div class="grid-cell tright"><span class="c-888">{{item.publish_time}}</span></div>
            </div>

            <div class="grid border-top height-130">
              <div class="grid-cell">
                <span class="font-24 c-888 lh-48">{{item.content}}</span>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem,MessageBox } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  export default {
    name: 'MyComment',
    components: {
      Swipe,
      SwipeItem,
      MessageBox
    },
    mounted () {
      this.isLoginMethod()
    },
    data () {
      return {
        loadShow: false,
        classTest: true,
        isLogin:this.$store.state.user.userInfo.isLogin  || '',   //是否登录
        userId:this.$store.state.user.userInfo.userId || '',      //当前用户ID
        listData:[],
      }
    },
    methods: {
      //  判断是否登录
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
      //  获取列表数据
      getListData(){
        ajax.getDataFromApi({
          url:'/v1/my-comment-list',
        },(response)=>{
          this.listData = response.data.body.list
        })
      }
    },
  }
  require('../../assets/scss/myComment.scss')
</script>
