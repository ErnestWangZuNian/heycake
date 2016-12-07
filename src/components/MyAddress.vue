<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="address">
        <ul>
          <li class="border-red">
            <div class="grid height-230">
              <div class="grid-cell u-w70"></div>
              <div class="grid-cell">
                <p><i class="add-name"></i>张飞</p>
                <p><i class="add-tel"></i>188 0288 5678</p>
                <p><i class="add-address"></i><span>[默认]</span>渝北区水星店水星A座1519号星店水星A座1519号</p>
              </div>
              <div class="grid-cell u-w35">
                <p><i class="add-close"></i></p>
                <p>&nbsp;</p>
                <p><i class="add-edit"></i></p>
              </div>
            </div>
          </li>

          <li class="border-ddd">
            <div class="grid height-230">
              <div class="grid-cell u-w70"></div>
              <div class="grid-cell">
                <p><i class="add-name"></i>张飞</p>
                <p><i class="add-tel"></i>188 0288 5678</p>
                <p><i class="add-address"></i><span>[默认]</span>渝北区水星店水星A座1519号星店水星A座1519号</p>
              </div>
              <div class="grid-cell u-w35">
                <p><i class="add-close"></i></p>
                <p>&nbsp;</p>
                <p><i class="add-edit"></i></p>
              </div>
            </div>
          </li>

          <li class="border-ddd">
            <div class="grid height-230">
              <div class="grid-cell u-w70"></div>
              <div class="grid-cell">
                <p><i class="add-name"></i>张飞</p>
                <p><i class="add-tel"></i>188 0288 5678</p>
                <p><i class="add-address"></i><span>[默认]</span>渝北区水星店水星A座1519号星店水星A座1519号</p>
              </div>
              <div class="grid-cell u-w35">
                <p><i class="add-close"></i></p>
                <p>&nbsp;</p>
                <p><i class="add-edit"></i></p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="tcenter"><span class="btns">新增收货地址</span></div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  export default {
    name: 'MyScore',
    components: {
      Loading,
      Swipe,
      SwipeItem,
    },
    mounted () {

    },
    data () {
      return {
        loading: false,
      }
    },
    methods: {
    },
  }
  require('../assets/scss/myAddress.scss')
</script>
