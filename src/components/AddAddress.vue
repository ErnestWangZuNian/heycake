<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="address-list">
        <input class="input-line" type="text" placeholder="姓名">
        <input class="input-line" type="text" placeholder="电话">
        <div class="sele">
          <select class="select-line fl">
          <option value="">请选择</option>
          <option value="">重庆市</option>
        </select>
          <select class="select-line fr">
            <option value="">请选择</option>
            <option value="">渝中区</option>
            <option value="">南岸区</option>
            <option value="">沙坪坝区</option>
            <option value="">江北区</option>
            <option value="">渝北区</option>
          </select>
          <div class="cf"></div>
        </div>
        <input class="input-line" type="text" placeholder="详细地址">
        <div class="default">
          <div class="selected"></div>
          <span>设为默认</span>
        </div>
      </div>

      <div class="submit-list">
        <button class="btn-submit" type="button">提交</button>
      </div>
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
//      this.fetchData()
    },
    data () {
      return {
        loading: false,
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        ajax.getDataFromApi({
          url: '/v2/goods?recommend=true'
        }, (data) => {
        this.loading = false;
      },(data) => {
          this.loading = false;
        })
      }
    },
  }
  require('../assets/scss/addAddress.scss')
</script>
