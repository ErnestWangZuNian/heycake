<template>
  <div class="h100">
    <loading v-if="loading && loadShow"></loading>
    <div class="container container-bg"  v-if="!loading">
      <div class="order-evaluate">
        <ul>
          <li class="list" v-for="item in listData">
            <div class="grid height-160">
              <div class="grid-cell u-w120">
                <img :src="item.cover">
              </div>
              <div class="grid-cell">
                <p class="title">{{item.name}}</p>
                <span class="c-red font-28">￥{{item.price}}</span>
              </div>
            </div>

            <div class="grid border-top c-888">
              我的评价：
              <div class="star-bg">
                <span v-for="(index,el) in item.number" class="star-unit" @click="starClick(index,item)"></span>
                <div v-if="flag"></div>
                <div class="star" :class="item.star" v-for="(index,el) in item.number" v-if="item[`isStar${index}`]"></div>
              </div>
            </div>

            <div class="grid border-top height-130">
              <textarea class="textarea" v-model="item.textarea"></textarea>
            </div>
          </li>
        </ul>

        <div class="tcenter"><span class="btn-evaluate" @click="evaluateClick()">提交</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import  Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'MyOrder',
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
        thisId:this.$route.params.id,
        userInfo:{},
        objectData:{},
        listData:[],
        forNum: 6,
        flag: false,
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
          url:`/v1/order/${this.thisId}`
          },(response)=>{
            this.objectData = response.data.body;
            if(this.objectData.items.length > 0){
              this.listData = this.objectData.items
              this.listData.forEach((val) => {
                val.textarea = ''
                val.number =  this.forNum - 1
                val.star = 'star5'
                val.starNum = 5
                for(let i = 1 ; i < this.forNum ; i++) {
                  if(i != (this.forNum - 1)){
                    val[`isStar${i}`] = false
                  }else{
                    val[`isStar${i}`] = true
                  }
                }
              })
            }
           //数据请求完成,改变loading值,关闭load，显示渲染后的页面
            this.loading = false;
          })
      },
      //点击star
      starClick(num,item){
        for(let i = 1 ; i < this.forNum ; i++){
          item[`isStar${i}`] = false
        }
        this.flag = !this.flag
        for(let i=1; i< this.forNum; i++) {
          if(num === i) {
            item[`isStar${i}`] = true
            item.starNum = i
            item.star = `star${i}`
          }
        }
      },
      evaluateClick(){
        let datas = []
        this.listData.forEach((val)=>{
          datas.push({
            content: val.textarea,
            score: val.starNum,
            order_line_id:val.order_line_id
          })
        })
        ajax.postDataToApi({
          url:`/v1/order/${this.thisId}/comments`,
          data:{
            order_line:datas
          }
        },(response)=>{
          MessageBox.alert('您的评价已发表成功！').then(action => {
            location.href = '/#/site/user-center'
          })
        })
      }
    },
  }
  require('../../assets/scss/orderEvaluate.scss')
</script>

