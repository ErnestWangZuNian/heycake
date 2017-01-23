<template>
    <div>
        <loading v-if="loading"></loading>
        <div class="container" v-if="!loading">
          <ul class="order-detail">
            <li>状态：<span>待发货</span></li>
            <li>订单编号：<span>291033365</span></li>
            <li>下单时间：<span>2016-12-13 16:52:19</span></li>
            <li>预约时间：2016-12-13 09:00 - 11:00</li>
          </ul>
          <div class="splitter"></div>
          <div class="order-address">
            <div class="info">
              <section>
                <div class="icon icon-name"></div>
                <div class="text">中雨</div>
              </section>
              <section>
                <div class="icon icon-tel"></div>
                <div class="text">13566989998</div>
              </section>
              <section>
                <div class="icon icon-addr"></div>
                <div class="text">重庆市 渝北区 红旗河沟3号1楼</div>
              </section>
            </div>
          </div>
          <div class="splitter"></div>
          <!--产品UL-->
          <ul>
            <li class="order-detail-grid height-150 border-bottom">
              <div class="grid-cell u-w100">
                <img src="">
              </div>
              <div class="grid-cell">
                <div class="title">商品名称</div>
                <div class="c-666 f-20">
                  规格
                </div>
              </div>
              <div class="grid-cell u-w130 tright">
                <div class="price">￥25.55</div>
                <div class="f-20 c-666">x2</div>
              </div>
            </li>
          </ul>
          <!--运费及其他UL-->
          <ul>
            <li class="order-detail-grid border-bottom">
              <div class="grid-cell">运费</div>
              <div class="grid-cell text-right">0.00元</div>
            </li>
            <li class="order-detail-grid border-bottom">
              <div class="grid-cell">合计</div>
              <div class="grid-cell text-right">200.00元</div>
            </li>
            <li class="order-detail-grid border-bottom">
              <div class="grid-cell">支付方式</div>
              <div class="grid-cell text-right">微信支付</div>
            </li>
            <li class="order-detail-grid border-bottom">
              <div class="grid-cell">留言：留言信息测试记录。</div>
            </li>
          </ul>
          <div class="splitter"></div>
          <div class="order-detail-grid border-bottom">
            <div class="grid-cell">订单跟踪</div>
            <div class="grid-cell text-right">查询热线：15866668888</div>
          </div>
          <ul>
            <li class="order-detail-grid">
              <div class="grid-cell u-w50">
                <div class="line"><div class="yuan"></div></div>
              </div>
              <div class="grid-cell">2017-01-22 16:22:15 订单已提交</div>
            </li>
            <li class="order-detail-grid">
              <div class="grid-cell u-w50">
                <div class="line"><div class="yuan"></div></div>
              </div>
              <div class="grid-cell">2017-01-22 16:22:15 订单已提交</div>
            </li>
          </ul>
        </div>
    </div>

</template>
<script>
  import {Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import  Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'OrderDetail',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox
    },
    mounted () {
//      this.isLoginMethod()
    },
    data () {
      return {
        loading: false,
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
  require('../../assets/scss/orderDetail.scss')
</script>
