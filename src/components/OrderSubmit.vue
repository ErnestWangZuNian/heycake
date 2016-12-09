<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="order-tab">
        <button :class="[receiptway.expressHiglight ? 'btn-red' : 'btn-gray']" @click="expressDelivery">快递配送</button>
        <button :class="[receiptway.storeHiglight ? 'btn-red' : 'btn-gray']" @click="storeDeliver">门店自提</button>
      </div>

      <!--快递配送信息-->
      <div class="order-info" v-if="receiptway.expressDelivery">
        <div class="label-list" v-if="userInfo.address.length > 0">
          <div class="fl info">
            <section>
              <div class="icon icon-name"></div>
              <div class="text">{{userInfo.defalutAddress.name}}</div>
            </section>

            <section>
              <div class="icon icon-tel"></div>
              <div class="text">{{userInfo.defalutAddress.tel_phone}}</div>
            </section>

            <section>
              <div class="icon icon-addr"></div>
              <div class="text"><span>[默认]</span>{{userInfo.defalutAddress.detail_area}}</div>
            </section>
          </div>
          <router-link to="my-address">
              <div class="fl arrow">
                <div class="icon-right"></div>
              </div>
          </router-link>
          <div class="cf"></div>
        </div>
        <router-link v-if="userInfo.address.length <= 0" to="add-address">
          <div class="none-address">
            还没有地址，前去新增地址
          </div>
        </router-link>
        <div class="label-message">
          留言 <input class="inputs" type="text">
        </div>
      </div>
      <!--门店自提信息-->
      <div class="order-info" v-if="receiptway.storeDeliver">
        <div class="label-list">
          <div class="store-info">
            自提信息
          </div>
          <div class="fl info">
            <section>
              <div class="icon icon-name"></div>
              <div class="text">{{store.selectedStore.name}}</div>
            </section>

            <section>
              <div class="icon icon-tel"></div>
              <div class="text">{{store.selectedStore.contact_phone}}</div>
            </section>

            <section>
              <div class="icon icon-addr"></div>
              <div class="text"><span>[默认]</span>{{store.selectedStore.address}}</div>
            </section>
          </div>
          <div class="fl arrow" @click="storeOpen">
            <div class="icon-right"></div>
          </div>
          <div class="cf"></div>
        </div>
        <div class="label-message">
          <div class="label-list">
            <label>自提人</label> <input class="inputs" type="text" v-model='formData.name' @focus="focusMethod('name')" @blur="blurMethod('name')">
          </div>
          <div class='err-class tright'v-if="validator.name.errIsShow">{{validator.name.errText}}</div>
          <div class="label-list">
            <label>联系电话</label> <input class="inputs" type="text" v-model='formData.telphone' @focus="focusMethod('telphone')" @blur="blurMethod('telphone')">
          </div>
          <div class='err-class tright' v-if="validator.telphone.errIsShow">{{validator.telphone.errText}}</div>
          <div class="label-list">
            <label>留言</label> <input class="inputs" type="text" v-model='formData.message'>
          </div>
        </div>
      </div>
      <!--分隔-->
      <div class="order-splitter"></div>

      <!--时间段-->
      <div class="order-times">
        <div class="title">预约时间</div>
        <div class="times">
          <input class="inputs" type="text" placeholder="开始时间" v-model="appointTime.selectedDate" @click="openTimeShow"> - <input class="inputs" type="text" placeholder="结束时间" v-model="appointTime.selectedTime" @click="openTimeShow">
        </div>
      </div>
      <!--分隔-->
      <div class="order-splitter"></div>

      <!--购物明细-->
      <div class="order-detail">
        <div class="title">购物明细</div>
        <ul>
          <li>
            <div class="imgs">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="info">
              <h3>咖啡山丘</h3>
              <p>6寸</p>
            </div>
            <div class="price">
              <p>￥138.00</p>
              <p class="mrg"><span>x1</span></p>
            </div>
          </li>

          <li>
            <div class="imgs">
              <img src="../assets/img/goods1.jpg">
            </div>
            <div class="info">
              <h3>hey coffee 美味无敌千层大蛋糕千层大蛋糕</h3>
              <p>6寸</p>
            </div>
            <div class="price">
              <p>￥138.00</p>
              <p class="mrg"><span>x1</span></p>
            </div>
          </li>
        </ul>
        <div class="freight">
          <p>运费<span>免运费</span></p>
        </div>
      </div>

      <!--分隔-->
      <div class="order-splitter"></div>

      <!--支付方式-->
      <div class="order-pay">
        <div class="title">支付方式</div>
        <div>
          <div class="selected"></div>
          <div class="text">在线支付</div>
        </div>
      </div>

      <!--//空白-->
      <div class="order-null"></div>

      <!--提交订单-->
      <div class="order-submit">
        <p>合计：<span>￥138.00</span></p>
        <button class="btn">提交订单</button>
      </div>
    </div>
     <!--预约时间选择-->
        <select-time :time-show="appointTime.timeShow" :date="appointTime.date"     :time="appointTime.time" v-on:close="timeClose" v-on:getDate="getDate"
        v-on:getTime="getTime">
        </select-time>
      <!--门店选择-->
        <select-store
        :store-show="store.storeShow"
        :store-list="store.storeList"
        v-on:close="storeClose"
        v-on:selectStore="selectStore"
        >
        </select-store>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  import SelectTime from './common/selectTime'
  import SelectStore from './common/SelectStore'
  export default {
    name: 'OrderSubmit',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      SelectTime,
      SelectStore
    },
    mounted () {
     this.fetchData()
    },
    data () {
      return {
        loading: false,
        appointTime: {
          timeShow: false,
          date: [],
          time: [],
          selectedTime: '',
          selectedDate: ''
        },
        receiptway:{
          expressDelivery: true,
          expressHiglight: true,
          storeDeliver: false,
          storeHiglight: false
        },
        store: {
          storeShow: false,
          storeList: [],
          selectedStore: {}
        },
        userInfo: {
          defalutAddress: {},
          address: []
        },
        formData:{
          name:'',
          telphone:'',
          message:''
        },
        validator:{
          name:{
            errText:'姓名不能为空',
            errIsShow: false,
            isFlag: false
          },
          telphone:{
            errText:'手机号码不能为空',
            errIsShow: false,
            isFlag: false
          },
        }
      }
    },
    methods: {
      //  获取页面数据
      fetchData () {
        this.loading = true
        // 获取预约时间
        // ajax.getDataFromApi({
        //   url: '/v1/appointment-time'
        // },(response) => {
        //   this.loading = false
        //   this.appointTime.date = response.data.body.date
        //   this.appointTime.time = response.data.body.time
        // })
         // 获取我的地址
         ajax.getDataFromApi({
           url: '/v1/my-address',
         },(response) => {
           let addressList = response.data.body.list
           let flag = false
           this.loading = false
           this.userInfo.address = addressList
           if( addressList.length > 0) {
            addressList.forEach((val) => {
               if(val.is_default === 1){
                 flag = true
                 this.userInfo.defalutAddress = val
               }
            })
            if(!flag){
              this.userInfo.defaultAddress = addressList[0]
            }
           }
         })
         //获取门店列表
         ajax.getDataFromApi({
           url: '/v1/offlinestore'
         },(response) => {
           let data =  response.data.body.list
           data.map((val,index) => {
             index === 0 ? val.isSelected = true : val.isSelected = false
             val.logo = `/attachment/${val.logo}`
             return val
           })
           this.store.storeList = data
           this.store.selectedStore = data[0]

         })
      },
      // 打开时间选择
      openTimeShow () {
        this.appointTime.timeShow = true
      },
      // 关闭时间选择
      timeClose () {
        this.appointTime.timeShow = false
      },
      // 获取选择的日期
      getDate (date) {
        this.appointTime.selectedDate = date
      },
      // 获取选择的时间
      getTime(time) {
        this.appointTime.selectedTime = time
      },
      // 点击切换快递配送
      expressDelivery() {
        this.receiptway.expressDelivery = true
        this.receiptway.expressHiglight = true
        this.receiptway.storeDeliver = false
        this.receiptway.storeHiglight = false
      },
      // 点击切换门店配送
      storeDeliver () {
        this.receiptway.storeDeliver = true
        this.receiptway.storeHiglight = true
        this.receiptway.expressDelivery = false
        this.receiptway.expressHiglight = false
        this.storeOpen()
      },
      // 打开门店弹窗
      storeOpen () {
         this.store.storeShow = true
      },
      // 关闭门店选择弹窗
      storeClose () {
        this.store.storeShow = false
      },
      // 选择门店
      selectStore (item) {
       this.store.selectedStore = item
       this.storeClose()
      },
      //验证方法
      //验证focus
      focusMethod(currentObj){
        switch (currentObj){
          case 'name':
            this.validator.name.errIsShow = false
            break;
          case 'telphone':
            this.validator.telphone.errIsShow = false
            break;
        }
      },
      blurMethod(currentObj){
        switch (currentObj){
          case 'name':
            let formDataName = this.formData.name
            let validatorName = this.validator.name
            let nameRe = /^\w{4,16}$/

            if(formDataName === ''){
              validatorName.errText = '姓名不能为空'
              validatorName.errIsShow = true
              validatorName.isFlag = false
            }else if(!nameRe.test(formDataName)){
              validatorName.errText = '请输入4到16为姓名'
              validatorName.errIsShow = true
              validatorName.isFlag = false
            }else{
              validatorName.isFlag = true
            }
            break;
          case 'telphone':
            let telRe = /^1[3|4|5|8]\d{9}$/
            let formDataTel = this.formData.telphone
            let validatorTel = this.validator.telphone

            if(formDataTel === ''){
              validatorTel.errText = '手机号码不能为空'
              validatorTel.errIsShow = true
              validatorTel.isFlag = false
            }else if(!telRe.test(formDataTel)){
              validatorTel.errText = '请输入正确的手机号码'
              validatorTel.errIsShow = true
              validatorTel.isFlag = false
            }else{
              validatorTel.isFlag = true
            }
            break;
        }
      },
     },
  }
  require('../assets/scss/orderSubmit.scss')
</script>
