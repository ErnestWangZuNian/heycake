<template>
  <div>
    <loading v-if="loading && loadShow"></loading>
    <div class="container" v-if="!loading">
      <div class="person-info">
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">姓名：</div>
          <div class="grid-cell"><input class="tright" type="text" value="张三"></div>
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
          <div class="grid-cell">手机号：</div>
          <div class="grid-cell"><input class="tright" type="text" value="13635668878"></div>
        </div>
        <div class="person-info-grid height-85 border-bottom">
          <div class="grid-cell">生日：</div>
          <div class="grid-cell"><input class="tright" type="text" value="12月31日"></div>
        </div>
      </div>
      <div class="splitter"></div>
      <div class="person-info-grid height-85 border-bottom">
        <div class="grid-cell">
          <select class="selects">
            <option value ="1">重庆市</option>
          </select>
        </div>
        <div class="grid-cell">
          <select class="selects">
            <option value ="1">江北区</option>
            <option value ="2">渝中区</option>
            <option value ="3">南岸区</option>
            <option value ="4">渝北区</option>
            <option value ="5">九龙坡区</option>
            <option value ="6">北部新区</option>
          </select>
        </div>
        <div class="grid-cell">
          <select class="selects">
            <option value ="">请选择</option>
            <option value ="1">隆鑫街道</option>
            <option value ="2">和平路</option>
            <option value ="3">万寿路</option>
          </select>
        </div>
      </div>
      <div class="person-info-grid height-85 border-bottom">
        <div class="grid-cell"><input class="bor" type="text" value="中智联东电大厦B区3楼"></div>
      </div>
      <div class="tcenter"><a href="" class=""><span class="btns">保存</span></a></div>
    </div>
  </div>
</template>
<script>
  import {
    Swipe,
    SwipeItem,
    Loadmore,
    MessageBox
  } from 'mint-ui'
  import Loading from '../common/Loading'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  export default {
    name: 'MyOrder',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      Loadmore,
      MessageBox
    },
    mounted() {
      this.isLoginMethod()
    },
    data() {
      return {
        loading: false,
        loadShow: false,
        isLogin: this.$store.state.user.userInfo.isLogin || '', //是否登录
        userId: this.$store.state.user.userInfo.userId || '', //当前用户ID
        userInfo: {},
        listData: [],
        page: {
          total: 1,
          currentPage: 1
        },
        status: this.$route.params.status || ''
      }
    },
    methods: {
      //      判断是否登录
      isLoginMethod() {
        if (this.isLogin) {
          this.loadShow = true
          this.getListData()
        } else {
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
        })
        }
      },
      //获取列表数据
      getListData(page) {
        ajax.getDataFromApi({
          url: '/v1/order',
          data: {
            status_code: this.status || '',
            per_page: 8,
            page: page
          }
        }, (response) => {
          this.listData = response.data.body.list
          this.page.total = response.data.body.pagination.total
          //数据请求完成,改变loading值,关闭load，显示渲染后的页面
          this.loading = false
      })
      },
    },
  }
  require('../../assets/scss/PersonInfo.scss')

</script>
