<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="address-list">
        <input class="input-line" type="text" placeholder="姓名" v-model="formData.name">
        <input class="input-line" type="text" placeholder="电话" v-model="formData.tel_phone">
        <div class="sele">
          <select class="select-line fl" v-model="formData.city_id">
            <option value="">请选择</option>
            <option v-for="item in listCity" :value="item.id">{{item.name}}</option>
          </select>
          <select class="select-line fr" v-model="formData.county_id">
            <option value="">请选择</option>
            <option v-for="item in listCounty" :value="item.id">{{item.name}}</option>
          </select>
          <div class="cf"></div>
        </div>
        <input class="input-line" type="text" placeholder="详细地址" v-model="formData.detail_area">
        <div class="default">
          <label @click="isDefault()">
            <div class="selected" :class="{'selected1': flag.isDefault}"></div>
            <span>设为默认</span>
          </label>
        </div>
      </div>

      <div class="submit-list">
        <button class="btn-submit" type="button" @click="saveMethod()">提交</button>
      </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'AddAddress',
    components: {
      Loading,
      Swipe,
      SwipeItem,
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
        thisId:this.$route.params.id || '',
        listData: '',
        listCity:[],
        listCounty:[],
        flag:{
          isCity : false,
          isCounty : false,
          isDefault: true,
        },
        formData:{
          name:'',
          tel_phone:'',
          detail_area:'',
          default:1,
          mob_phone:'',
          city_id:'',
          county_id:'',
        }
      }
    },
    methods: {
      //判断是否登录
      isLoginMethod(){
        if(this.isLogin){
          this.loadShow = true;
          this.getListCity();
          this.getListCounty();
          if(this.thisId){
            this.getListData(this.thisId)
          }
          this.loading = false
          //判断数据是否加载完成
//          if(this.flag.isCity && this.flag.isCounty){
//            this.loading = false
//          }
        }else{
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
          })
        }
      },
      //如果是点击编辑按钮进来的，获取数据
      getListData(id){
        ajax.getDataFromApi({
          url:`/v1/my-address/${id}/edit`
        },(response)=>{
          this.formData = response.data.body
        })
      },
      //获取City数据
      getListCity(){
        ajax.getDataFromApi({
          url:'/area/city'
        },(response)=>{
          this.listCity = response.data.body;
          this.flag.isCity = true
        })
      },
      //获取County数据
      getListCounty(){
        ajax.getDataFromApi({
          url:'/area/county',
        },(response)=>{
          this.listCounty = response.data.body;
          this.flag.isCounty = true
        })
      },
      //设为默认
      isDefault(event){
        this.flag.isDefault  = !this.flag.isDefault
        if (this.flag.isDefault) {
          this.formData.default = 1
        } else {
          this.formData.default = 0
        }
      },
      //提交按钮
      saveMethod(){
        ajax.postDataToApi({
          url:'/v1/my-address',
          data:this.formData,
        },(response)=>{
          location.href = '/#/site/my-address'
        })
      }
    },
  }
  require('../assets/scss/addAddress.scss')
</script>
