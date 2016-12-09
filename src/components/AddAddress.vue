<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <form id="formValidator">
        <div class="address-list">
          <input class="input-line" type="text" placeholder="姓名" v-model="formData.name" @focus="focusMethod('name')" @blur="blurMethod('name')">
          <div class='err-class' v-if="validator.name.errIsShow">{{validator.name.errText}}</div>
          <input class="input-line" type="number" placeholder="电话" v-model="formData.tel_phone" @focus="focusMethod('tel_phone')" @blur="blurMethod('tel_phone')">
          <div class='err-class' v-if="validator.telPhone.errIsShow">{{validator.telPhone.errText}}</div>
          <div class="sele">
            <select class="select-line" v-model="formData.city_id" @focus="focusMethod('city_id')" @blur="blurMethod('city_id')">
              <option value="">请选择</option>
              <option v-for="item in listCity" :value="item.id">{{item.name}}</option>
            </select>
            <div class='err-class' v-if="validator.cityId.errIsShow">*</div>
            <select class="select-line" v-model="formData.county_id" @focus="focusMethod('county_id')" @blur="blurMethod('county_id')">
              <option value="">请选择</option>
              <option v-for="item in listCounty" :value="item.id">{{item.name}}</option>
            </select>
            <div class='err-class' v-if="validator.countyId.errIsShow">*</div>
            <div class="cf"></div>
          </div>
          <input class="input-line" type="text" placeholder="详细地址" v-model="formData.detail_area" @focus="focusMethod('detail_area')" @blur="blurMethod('detail_area')">
          <div class='err-class' v-if="validator.detailArea.errIsShow">{{validator.detailArea.errText}}</div>
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
      </form>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem,MessageBox } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'AddAddress',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox
    },
    mounted () {
      this.isLoginMethod()          //判断登录，并获取列表数据
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
        },
        validator:{
          name:{
            errText:'姓名不能为空',
            errIsShow: false,
            isFlag: false
          },
          telPhone:{
            errText:'手机号码不能为空',
            errIsShow: false,
            isFlag: false
          },
          cityId:{
            errText:'',
            errIsShow: false,
            isFlag: false
          },
          countyId:{
            errText:'',
            errIsShow: false,
            isFlag: false
          },
          detailArea:{
            errText:'详细地址 不能为空',
            errIsShow: false,
            isFlag: false
          }
        }
      }
    },
    vuerify:{
      name: 'required'
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
          this.formData.default = 1
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
        if(this.validator.name.isFlag && this.validator.telPhone.isFlag && this.validator.cityId.isFlag && this.validator.countyId.isFlag && this.validator.detailArea.isFlag){
          if(this.thisId){
            //编辑地址，保存
            ajax.putDataToApi({
              url:`/v1/my-address/${this.formData.id}`,
              body:this.formData
            },(response)=>{
              location.href = '/#/site/my-address'
            })
          }else{
            //新增地址，保存
            ajax.postDataToApi({
              url:'/v1/my-address',
              body:this.formData,
            },(response)=>{
              location.href = '/#/site/my-address'
            })
          }
        }else{
          if(!this.validator.name.isFlag){
            this.validator.name.errIsShow = true
          }
          if(!this.validator.telPhone.isFlag){
            this.validator.telPhone.errIsShow = true
          }
          if(!this.validator.cityId.isFlag){
            this.validator.cityId.errIsShow = true
          }
          if(!this.validator.countyId.isFlag){
            this.validator.countyId.errIsShow = true
          }
          if(!this.validator.detailArea.isFlag){
            this.validator.detailArea.errIsShow = true
          }
        }
      },
      //验证方法
      //验证focus
      focusMethod(currentObj){
        switch (currentObj){
          case 'name':
            this.validator.name.errIsShow = false
            break;
          case 'tel_phone':
            this.validator.telPhone.errIsShow = false
            break;
          case 'city_id':
            this.validator.cityId.errIsShow = false
            break;
          case 'county_id':
            this.validator.countyId.errIsShow = false
            break;
          case 'detail_area':
            this.validator.detailArea.errIsShow = false
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
          case 'tel_phone':
            let telRe = /^1[3|4|5|8]\d{9}$/
            let formDataTel = this.formData.tel_phone
            let validatorTel = this.validator.telPhone

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
          case 'city_id':
            let formDataCity = this.formData.city_id
            let validatorCity = this.validator.cityId
            if(formDataCity === ''){
              validatorCity.errText = '请选择'
              validatorCity.errIsShow = true
              validatorCity.isFlag = false
            }else{
              validatorCity.isFlag = true
            }
            break;
          case 'county_id':
            let formDataCounty = this.formData.county_id
            let validatorCounty = this.validator.countyId
            if(formDataCounty === ''){
              validatorCounty.errText = '请选择'
              validatorCounty.errIsShow = true
              validatorCounty.isFlag = false
            }else{
              validatorCounty.isFlag = true
            }
            break;
          case 'detail_area':
            let formDataArea = this.formData.detail_area
            let validatorArea = this.validator.detailArea
            if(formDataArea === ''){
              validatorArea.errText = '请填写详细地址'
              validatorArea.errIsShow = true
              validatorArea.isFlag = false
            }else{
              validatorArea.isFlag = true
            }
            break;
        }
      },
    },
  }
  require('../assets/scss/addAddress.scss')
</script>
