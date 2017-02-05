<template>
  <div>
    <div class="container">
      <div class="address">
        <ul>
          <template v-for="item in listData">
            <template v-if="item.is_default == 1">
              <li class="address-list border-red" :data-id="item.id">
                <div class="grid height-230">
                  <div class="grid-cell u-w70"></div>
                  <div class="grid-cell">
                    <p><i class="add-name"></i>{{item.name}}</p>
                    <p><i class="add-tel"></i>{{item.tel_phone}}</p>
                    <p><i class="add-address"></i><span class="c-red">[默认]</span>{{item.city_name}} {{item.county_name}} {{item.detail_area}}</p>
                  </div>
                  <div class="grid-cell u-w35">
                    <p @click="delMethod(item.id)"><i class="add-close"></i></p>
                    <p>&nbsp;</p>
                    <p @click="editMethod(item.id)"><i class="add-edit"></i></p>
                  </div>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="address-list border-ddd" :data-id="item.id">
                <div class="grid height-230">
                  <div class="grid-cell u-w70"></div>
                  <div class="grid-cell">
                    <p><i class="add-name"></i>{{item.name}}</p>
                    <p><i class="add-tel"></i>{{item.tel_phone}}</p>
                    <p><i class="add-address"></i>{{item.city_name}} {{item.county_name}} {{item.detail_area}}</p>
                  </div>
                  <div class="grid-cell u-w35">
                    <p @click="delMethod(item.id)"><i class="add-close"></i></p>
                    <p>&nbsp;</p>
                    <p @click="editMethod(item.id)"><i class="add-edit"></i></p>
                  </div>
                </div>
              </li>
            </template>
          </template>
        </ul>
      </div>

      <div class="tcenter">
        <router-link to='add-address'><span class="btns">新增收货地址</span></router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public.js'
  import Modal from '../common/Modal'
  export default {
    name: 'myAddress',
    components: {
      Swipe,
      SwipeItem,
      MessageBox,
      Modal
    },
    mounted() {
      this.isLoginMethod()
    },
    data() {
      return {
        isLogin: this.$store.state.user.userInfo.isLogin || '',   //是否登录
        userId: this.$store.state.user.userInfo.userId || '',      //当前用户ID
        listData: [],
        isDeafult: false
      }
    },
    methods: {
      //  判断是否登录
      isLoginMethod() {
        if (this.isLogin) {
          this.loadShow = true
          this.getListData();
        } else {
          MessageBox.alert('未登录').then(action => {
            location.href = '/#/site/login'
          })
        }
      },
      //  获取列表数据
      getListData() {
        ajax.getDataFromApi({
          url: '/v1/my-address',
        }, (response) => {
          this.listData = response.data.body.list
          if (this.listData.length > 0) {
            this.isDeafult = false
            //处理数组，找到is_default==1的排到第一个，并且改变isDefault的状态
            this.listData.map((val, index) => {
              if (val.is_default == 1) {
                this.listData.splice(index, 1)
                this.listData.unshift(val)
                this.isDeafult = true;
              }
            })
            //如果isDeafult为false,让数组第一个的is_default的值为1，成为默认地址
            if (!this.isDeafult) {
              this.listData[0].is_default = 1
            }
          }
        }, err => {
          console.log(err)
        })
      },
      //  删除地址方法
      delMethod(id) {
        MessageBox.confirm('确定要删除吗？').then(action => {
          ajax.deleteDataFromApi({
            url: `/v1/my-address/${id}`
          }, (response) => {
            this.getListData()
          })
        })
      },
      //  编辑地址方法
      editMethod(id) {
        utils.sessionstorageData('editAddress',true)
        location.href = `/#/site/edit-address/${id}`
      },
    },
  }
  require('../../assets/scss/myAddress.scss')
</script>