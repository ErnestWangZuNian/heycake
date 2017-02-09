<template>
  <div>
    <div class="container">
      <div class="person-info">
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">姓名：</div>
          <div class="grid-cell"><input class="tright" type="text"  v-model='userInfo.name' placeholder="请输入您的姓名"></div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">性别：</div>
          <div class="grid-cell">
            <select class="selects selects2">
              <option value ="0">男</option>
              <option value ="1">女</option>
            </select>
          </div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">手机号</div>
          <div class="grid-cell"><input class="tright" type="text" :value="userInfo.member_account"></div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">生日：</div>
          <div class="grid-cell"><input class="tright" type="text" :value="userInfo.birthday"></div>
        </div>
      </div>
      <div class="splitter"></div>
      <div class="person-info-grid height-85 border-bottom">
        <div class="grid-cell">
          <select class="selects">
            <option :value ="item.id" v-for="item in city">{{item.name}}</option>
          </select>
        </div>
        <div class="grid-cell">
          <select class="selects">
            <option :value ="item.id" v-for="item in city">{{item.country}}</option>
          </select>
        </div>
      </div>
      <div class="person-info-grid height-85 border-bottom">
        <div class="grid-cell"><input class="bor" type="text" placeholder="请输入您的详细地址" value="中智联东电大厦B区3楼"></div>
      </div>
      <div class="tcenter"><a href="" class=""><span class="btns">保存</span></a></div>
    </div>
  </div>
</template>
<script>
  import {
    MessageBox
  } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'MyOrder',
    components: {
      MessageBox
    },
    mounted() {
      this.getListData()
      this.getCityData()
    },
    data() {
      return {
        userInfo: {},
        city: [],
        country: []
      }
    },
    methods: {
      //  获取城市列表
      getCityData() {
        ajax.getDataFromApi({
           url: '/area/city'
      },response => {
         this.city = response.data.body
      })
      },
      //  获取街道列表
      getCountryData() {
        ajax.getDataFromApi({
           url: '/area/county'
      },response => {
        this.country = response.data.body
      })
      },
      //  获取列表数据
      getListData() {
        ajax.getDataFromApi({
          url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
        }, (response) => {
          this.userInfo = response.data.body.list
        })
      },
    },
  }
  require('../../assets/scss/PersonInfo.scss')

</script>
