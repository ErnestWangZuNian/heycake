<template>
  <div>
    <div class="container">
      <div class="person-info">
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">姓名：</div>
          <div class="grid-cell"><input class="tright" type="text" v-model='userInfo.member_name' placeholder="请输入您的姓名"></div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">性别：</div>
          <div class="grid-cell person-info-sex">
            <span class="selected" @click="checkedSex(item)" v-for="item in sexArray" :class="[item.isSelected ? 'selected1' : '']"><span class="sex">{{item.val}}</span></span>
          </div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">手机号</div>
          <div class="grid-cell"><input class="tright" type="text" :value="userInfo.member_account"></div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">生日：</div>
          <div class="grid-cell"><input class="tright" type="text" v-model="birthday" @click="openPicker"></div>
        </div>
      </div>
      <div class="splitter"></div>
      <div class="person-info-grid height-85 border-bottom">
        <div class="grid-cell">
          <select class="selects" v-model='selectedCity'>
            <option :value ="item.id" v-for="item in city">{{item.name}}</option>
          </select>
        </div>
        <div class="grid-cell">
          <select class="selects" v-model='selectedCountry'>
            <option :value ="item.id" v-for="item in country">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="person-info-grid height-85 border-bottom">
        <div class="grid-cell"><input class="bor" type="text" placeholder="请输入您的详细地址"  v-model="detailArea"></div>
      </div>
      <div class="tcenter"><span class="btns" @click=savePersonInfo()>保存</span></div>
    </div>
  </div>
</template>
<script>
  import {
    MessageBox,
    Radio
  } from 'mint-ui'
  let DateTimePicker = require('date-time-picker')
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'MyOrder',
    components: {
      MessageBox,
      Radio
    },
    mounted() {
      this.getListData()
      this.getCityData()
      this.getCountryData()
    },
    data() {
      return {
        userInfo: {
        },
        dateTime: {
          options: {
            lang: 'zh-CN',
            format: 'yyyy-MM-dd',
            default: new Date()
          },
          config: {
            day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            shortDay: ['日', '一', '二', '三', '四', '五', '六'],
            MDW: 'M月d日D',
            YM: 'yyyy年M月',
            OK: '确定',
            CANCEL: '取消'
          }
        },
        selectedProvince: 0,
        selectedCity: 342,
        selectedCountry: 1165,
        detailArea: '',
        birthday: '',
        selectedSex: 0,
        city: [],
        sexArray: [{
          val: "男",
          code: 0,
          isSelected: true,
        }, {
          val: "女",
          code: 1,
          isSelected: false,
        }],
        country: []
      }
    },
    methods: {
      //  获取城市列表
      getCityData() {
        ajax.getDataFromApi({
          url: '/area/city'
        }, response => {
          this.city = response.data.body
        })
      },
      //  获取街道列表
      getCountryData() {
        ajax.getDataFromApi({
          url: '/area/county'
        }, response => {
          this.country = response.data.body
        })
      },
      //  获取列表数据
      getListData() {
        ajax.getDataFromApi({
          url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
        }, (response) => {
          this.userInfo = response.data.body.list
          this.detailArea = response.data.body.list.address.detail_area
          this.selectedSex = response.data.body.list.sex
          this.sexArray.forEach((val) => {
            if( this.selectedSex === val.code){
              val.isSelected = true
            } else {
              val.isSelected = false
            }
          })
          this.birthday = response.data.body.list.birthday
        })
      },
       //  打开开始时间选择器
      openPicker() {
        let self = this
        let datePicker = new DateTimePicker.Date(this.dateTime.options, this.dateTime.config)
        datePicker.on('selected', function (formatDate, now) {
          self.birthday = formatDate
        })
      },
      //  切换性别
      checkedSex(item) {
        this.sexArray.forEach((val) => {
          val.isSelected = false
        })
        item.isSelected = true
        this.selectedSex = item.code
      },
      //  保存用户信息
      savePersonInfo() {
         ajax.putDataToApi({
           url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`,
           data: {
             sex: this.selectedSex,
             member_name: this.userInfo.member_name,
             birthday: this.birthday,
             address: [{
               province_id: this.selectedProvince,
               city_id: this.selectedCountry,
               county_id: this.selectedCountry,
               detail_area: this.detailArea
             }]
           }
      },response => {
         location.href = '/#/site/user-center'
      })
      }
    },
  }
  require('../../assets/scss/PersonInfo.scss')

</script>