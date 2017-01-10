<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="my-order-grid bgc-f5f5f5 height-90">
        <div class="grid-cell tright c-888">订单筛选：</div>
        <div class="grid-cell tleft c-333">
          <select class="selects" v-model='status' @change="getListData()">
            <option value="">全部</option>
            <option value="at00">待支付</option>
            <option value="wfs0">待发货</option>
            <option value="wfd1">待收货</option>
            <option value="wfc0">待评价</option>
            <option value="trm0">已完成</option>
            <option value="c000">已取消</option>
            <option value="r000">退款中</option>
            <option value="rs00">已退款</option>
          </select>
        </div>
      </div>

      <template v-for='item in listData'>
        <div class="orders">
          <div class="my-order-grid height-85 border-bottom">
            <div class="grid-cell">下单时间：<span class="c-666">{{item.create_time}}</span></div>
            <div class="grid-cell tright u-1of4">{{item.status_code}}</div>
          </div>

          <ul>
            <li class="my-order-grid height-150 border-bottom" v-for='child in item.items'>
              <div class="grid-cell u-w100">
                <img :src="child.cover">
              </div>
              <div class="grid-cell">
                <div class="title">{{child.name}}</div>
                <div class="c-666 f-20">
                  <template v-for='spec in child.specifications'>
                  {{spec}}
                  </template>
                </div>
              </div>
              <div class="grid-cell u-w130 tright">
                <div class="price">￥{{child.price}}</div>
                <div class="f-20 c-666">x{{child.amount}}</div>
              </div>
            </li>
          </ul>
          <div class="my-order-grid height-85 border-bottom">
            <div class="grid-cell c-888">
              支付金额：
              <span class="c-red">￥{{item.total_sum}}</span>
              <template v-if='item.logistics_mode == "pick-up"'>（自提）</template>
              <template v-else>（含运费：{{item.logistics_price}}元）</template>
            </div>
            <div class="grid-cell tright u-1of4">
              <template v-if='item.status_code == "待支付" '><span class="btn-myorder" @click="goPay(item.id)">去支付</span></template>
              <template v-if='item.status_code == "待收货" '><span class="btn-myorder" @click="confirmGoods(item.id)">确认收货</span></template>
              <template v-if='item.status_code == "待评价" '><span class="btn-myorder" @click="goEvaluate(item.id)">去评价</span></template>
            </div>
          </div>
        </div>
        <div class="splitter"></div>
      </template>

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
        userInfo:{},
        listData:[],
        status: this.$route.params.status || ''
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
          url:'/v1/order',
          data:{
            status_code: this.status || '',
            per_page: 20
            }
          },(response)=>{
            this.listData = response.data.body.list;

            //数据处理函数
            this.dataDispose(this.listData);
           //数据请求完成,改变loading值,关闭load，显示渲染后的页面
            this.loading = false;
          })
      },
      //去支付跳转
      goPay(id){
        location.href=`/#/site/order-pay/${id}`
      },
      //确认收货
      confirmGoods(id){
        MessageBox.confirm('是否已收到货？').then(action =>{
          ajax.putDataToApi({
            url:`/v1/confirm-receipt/${id}`
          },(response)=>{
            this.getListData()
          })
        })
      },
      //去评价
      goEvaluate(id){
        location.href=`/#/site/order-evaluate/${id}`
      },
      //列表数据处理
      dataDispose(data){
        data.forEach((val,index) => {
          switch(val.status_code){
            case 'at00':
              val.status_code = '待支付'
              break;
            case 'wfd0':
              val.status_code = '待分配'
              break;
            case 'wfs0':
              val.status_code = '待发货'
              break;
            case 'wfd1':
              val.status_code = '待收货'
              break;
            case 'wfc0':
              val.status_code = '待评价'
              break;
            case 'trm0':
              val.status_code = '已完成'
              break;
            case 'c000':
              val.status_code = '已取消'
              break;
            case 'r000':
              val.status_code = '退款中'
              break;
            case 'rs00':
              val.status_code = '已退款'
              break;
          }
          val.items.forEach((valChild)=>{
            valChild.cover = `/attachment/${valChild.cover}`
          })
        })
      }
    },
  }
  require('../../assets/scss/myOrder.scss')
</script>
