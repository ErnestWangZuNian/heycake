<template>
  <div>
    <div class="container">
      <div class="order-tab">
        <button :class="[receiptway.expressHiglight ? 'btn-red' : 'btn-gray']" @click="expressDelivery">快递配送</button>
        <button :class="[receiptway.storeHiglight ? 'btn-red' : 'btn-gray']" @click="storeDeliver">门店自提</button>
      </div>
      <!--快递配送信息-->
      <div class="order-info" v-if="receiptway.expressDelivery">
        <div class="label-list" v-if="userInfo.isMyAddress===false">
          <div class="fl info">
            <section>
              <div class="icon icon-name"></div>
              <div class="text"><input type="text" placeholder="您的姓名" v-model="locationUserInfo.name"></div>
            </section>
            <section>
              <div class="icon icon-tel"></div>
              <div class="text"><input type="text" @change="detailPhoneCopy()" @keyup="detailPhone($event)" placeholder="联系手机号码" v-model="locationUserInfo.tel_phone"></div>
            </section>
            <section>
              <div class="icon icon-addr"></div>
              <div class="text"><span>[已选择地址]</span>{{userInfo.checkedAddress}}</div>
            </section>
            <section>
              <div class="icon icon-addr"></div>
              <div class="text"><input type="text" placeholder="楼层/门牌号等信息" v-model="locationUserInfo.doorplate"></div>
            </section>
          </div>
          <div class="fl arrow" @click="openAddress">
            <div class="icon-right"></div>
          </div>
          <div class="cf"></div>
        </div>
        <div class="label-list" v-if="userInfo.isMyAddress" @click="editMethod(userInfo.checkedMyAddress.id)">
          <div class="fl info">
            <section>
              <div class="icon icon-name"></div>
              <div class="text">{{userInfo.checkedMyAddress.name}}</div>
            </section>
            <section>
              <div class="icon icon-tel"></div>
              <div class="text">{{userInfo.checkedMyAddress.tel_phone}}</div>
            </section>
            <section>
              <div class="icon icon-addr"></div>
              <div class="text"><span>[已选择地址]</span>{{userInfo.checkedAddress }} {{userInfo.checkedMyAddress.doorplate}}</div>
            </section>
          </div>
          <div class="fl arrow">
            <div class="icon-right"></div>
          </div>
          <div class="cf"></div>
        </div>
        <div class="label-message">
          留言 <input class="inputs" type="text" v-model="formData.addressMessage" placeholder="备注信息">
        </div>
      </div>
      <!--门店自提信息-->
      <div class="order-info" v-if="receiptway.storeDeliver">
        <!--<div class="label-list">
          <div class="store-info">
            自提信息
          </div>
          <div class="fl info">
            <section>
              <div class="icon icon-name"></div>
              <div class="text">{{store.selectedStore._name}}</div>
            </section>
            <section>
              <div class="icon icon-tel"></div>
              <div class="text">{{store.selectedStore.telphone}}</div>
            </section>
            <section>
              <div class="icon icon-addr"></div>
              <div class="text"><span>[默认]</span>{{store.selectedStore._address}}</div>
            </section>
          </div>
          <div class="fl arrow" @click="storeOpen">
            <div class="icon-right"></div>
          </div>
          <div class="cf"></div>
        </div>-->
        <div class="label-message">
          <div class="label-list">
            自提门店地址：{{this.store.currentStore || '您当前位置无门店推荐'}}
          </div>
          <div class="label-list">
            <label>自提人</label> <input class="inputs" type="text" v-model='formData.name' @focus="focusMethod('name')" @blur="blurMethod('name')"
              placeholder="请填写自提人姓名(必填)">
          </div>
          <div class='err-class tright' v-if="validator.name.errIsShow">{{validator.name.errText}}</div>
          <div class="label-list">
            <label>联系电话</label> <input class="inputs" type="text" v-model='formData.telphone' @keyup='detailSelfMentionTelphone($event)'
              @focus="focusMethod('telphone')" @blur="blurMethod('telphone')" placeholder="请填写自提人联系方式(必填)" @change="detailSelfMentionTelphoneCopy()">
          </div>
          <div class='err-class tright' v-if="validator.telphone.errIsShow">{{validator.telphone.errText}}</div>
          <div class="label-list">
            <label>留言</label> <input class="inputs" type="text" v-model='formData.storeMessage' placeholder="备注信息">
          </div>
        </div>
      </div>
      <!--分隔-->
      <div class="order-splitter"></div>
      <!--时间段-->
      <div class="order-times">
        <div class="title">预约时间</div>
        <div class="times">
          <span class="inputs" @click="openTimeShow">  {{appointTime.selectedDate}}</span> - <span class="inputs" @click="openTimeShow">{{appointTime.selectedTime}}</span>
        </div>
      </div>
      <!--分隔-->
      <div class="order-splitter"></div>
      <!--购物明细-->
      <div class="order-detail">
        <div class="title">购物明细</div>
        <ul v-if="goodsInfo.buyWay!== 'cart'">
          <li>
            <div class="imgs">
              <img :src="goodsInfo.singleGood.picture">
            </div>
            <div class="info">
              <h3>{{this.goodsInfo.singleGood.name}}</h3>
              <p>{{this.goodsInfo.selectedSpecGood.value | spec}}</p>
            </div>
            <div class="price">
              <p v-if="goodsInfo.buyWay !== 'score'">{{this.goodsInfo.selectedSpecGood.price | price}}</p>
              <p v-if="goodsInfo.buyWay === 'score'">{{this.goodsInfo.selectedSpecGood.score}}积分</p>
              <p class="mrg"><span>x{{goodsInfo.selectedSpecGood.count}}</span></p>
            </div>
          </li>
        </ul>
        <ul v-if="goodsInfo.buyWay === 'cart'">
          <li v-for="item in goodsInfo.selectedCartGoods">
            <div class="imgs">
              <img :src="item.cover">
            </div>
            <div class="info">
              <h3>{{item.goods_name}}</h3>
              <p>{{item.specifications | spec}}</p>
            </div>
            <div class="price">
              <p>{{item.price | price}}</p>
              <p class="mrg"><span>x{{item.amount}}</span></p>
            </div>
          </li>
        </ul>
        <div class="freight" v-if="goodsInfo.buyWay !== 'score'">
          <p>运费<span>{{userInfo.freight | freight}}</span></p>
        </div>
      </div>
      <!--分隔-->
      <div class="order-splitter"></div>
      <!--支付方式-->
      <div class="order-pay">
        <div class="title">支付方式</div>
        <div v-if="goodsInfo.buyWay === 'score'">
          <div class="selected" :class="[payWay==='online' ? 'selected1' : 'selected']" @click="onlinePayWay"></div>
          <div class="text">积分兑换</div>
        </div>
        <div v-if="goodsInfo.buyWay !== 'score'">
          <div class="selected" :class="[payWay==='online' ? 'selected1' : 'selected']" @click="onlinePayWay"></div>
          <div class="text">在线支付</div>
          <div class="selected" :class="[payWay==='member' ? 'selected1' : 'selected']" @click="memberPayWay"></div>
          <div class="text">会员卡余额支付</div>
        </div>
      </div>
      <div class="member-info" v-if="payWay==='member'">
        <label for="member-password" v-if="goodsInfo.buyWay !== 'score'">余额{{memberInfo.balance | detailPrice}}</label>
        <label for="member-password" v-if="goodsInfo.buyWay === 'score'">积分{{memberInfo.score}}</label>
        <input type="password" placeholder="请输入您的登录密码" name="password" v-model="memberUser.password">
        <button class="btn" @click="memberLogin" v-if="memberUser.status === false">登录</button>
        <button class="btn" @click="memberLogin" :disabled="memberUser.status === true" v-if="memberUser.status === true">已登录</button>
      </div>
      <!--//空白-->
      <div class="order-null"></div>
      <!--提交订单-->
      <div class="order-submit ">
        <p class="" v-if="goodsInfo.buyWay !== 'score'">合计：<span>￥{{ totalPrice }}</span></p>
        <p class="" v-if="goodsInfo.buyWay === 'score'">合计：<span>{{ totalPrice }}积分</span></p>
        <button class="btn" :class="[!canSubmitOrder ? 'btn-gary' : ''] " @click="orderSubmit">提交订单</button>
      </div>
    </div>
    <!--预约时间选择-->
    <select-time :time-show="appointTime.timeShow" :selected-date="appointTime.selectedDate" :selected-time="appointTime.selectedTime"
      :date="appointTime.date" :time="appointTime.time" v-on:close="timeClose" v-on:getDate="getDate" v-on:getTime="getTime">
    </select-time>
    <!--门店选择-->
    <select-store :store-show="store.storeShow" :store-list="store.storeList" v-on:close="storeClose" v-on:selectStore="selectStore">
    </select-store>
    <!--错误提示框-->
    <modal :show='errTip.isShow' v-on:close='errTipClose'>
      <div slot="header">
        <p>温馨提示</p>
      </div>
      <div class="modal-img">
        <img :src="errTip.url" alt="">
      </div>
      <div slot='body'>
        <div class="modal-error-tip">
          <div class="modal-test" :class="errTip.isWarn ? 'warn-red' : ''">{{errTip.text}}</div>
          <div class="btn recharge-btn" @click="gotoRecharge" v-if="errTip.isRecharge">去充值</div>
        </div>
      </div>
    </modal>
    <!--地址选择弹窗-->
    <div class="address-modal">
      <modal :show="address.show" v-on:close="addressClose">
        <div slot="header">
          <div class="store-header">
            选取地址
          </div>
        </div>
        <div slot="body">
          <div class="input-address">
            <input type="" name="searchAddress" value="" id='searchAddress' placeholder="输入小区，学校，建筑物等" v-model="address.searchKeyword"
              @input="searchAddress()">
          </div>
          <div class="searchAddress">
            <div class="address search-address">
              <p class="title">搜索地址</p>
              <ul>
                <li class="list" @click="changeArea(item)" v-for="item in address.search">{{item.name}}<span class="area">{{item.adname}}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {
    Swipe,
    SwipeItem,
    MessageBox,
    Toast
  } from 'mint-ui'
  import ajax from '../../utils/ajax.js'
  import utils from '../../utils/public'
  import SelectTime from '../common/SelectTime'
  import SelectStore from '../common/SelectStore'
  import Modal from '../common/Modal'
  export default {
    name: 'OrderSubmit',
    components: {
      Swipe,
      SwipeItem,
      SelectTime,
      SelectStore,
      MessageBox,
      Modal,
      Toast
    },
    mounted() {
      this.fetchData()
      // 判断是自己的地址还是定位的地址
      this.userInfo.isMyAddress = utils.sessionstorageGetData('isMyAddress')
      if (this.userInfo.isMyAddress) {
        this.userInfo.checkedMyAddress = utils.sessionstorageGetData('checkedMyAddress')
        this.userInfo.checkedAddress = utils.sessionstorageGetData('checkedMyAddress').detail_area
        this.locationUserInfo.district = utils.sessionstorageGetData('checkedAddress').cityname + utils.sessionstorageGetData('checkedAddress').adname
      } else {
        this.userInfo.checkedMyAddress = {}
        this.userInfo.checkedAddress = utils.sessionstorageGetData('checkedAddress').name
        this.locationUserInfo.location = utils.sessionstorageGetData('checkedAddress').location
        this.locationUserInfo.district = utils.sessionstorageGetData('checkedAddress').district
      }
      this.store.currentStore = utils.sessionstorageGetData('naberStore')._address
    },
    data() {
      return {
        errTip: {
          isShow: false,
          isRecharge: false,
          isWarn: false,
          text: '您的密码有误请重新登录'
        },
        juageAddressIsCanSubmit: true,
        canSubmitOrderFlag: true,
        addressIsAddSuccess: false,
        address: {
          show: false,
          checked: {},
          isChecked: false,
          checkedText: '请选择收货地址',
          searchKeyword: '',
          search: [],
        },
        appointTime: {
          timeShow: false,
          date: [],
          time: [],
          selectedTime: '预约时间',
          selectedDate: '预约日期'
        },
        payWay: 'online',
        memberUser: {
          password: '',
          discount: 1,
          status: false
        },
        receiptway: {
          expressDelivery: true,
          expressHiglight: true,
          storeDeliver: false,
          storeHiglight: false
        },
        store: {
          currentStore: {},
          storeShow: false,
          storeList: [],
          selectedStore: {}
        },
        userInfo: {
          defalutAddress: {},
          address: [],
          isMyAddress: false,
          checkedAddress: '',
          checkedMyAddress: {},
          name: '',
          telphone: '',
          myAddressId: '',
          freight: ''
        },
        locationUserInfo: {
          name: '',
          tel_phone: '',
          detail_area: '',
          district: '',
          doorplate: '',
          default: 1,
          location: ''
        },
        goodsInfo: {
          buyWay: 'purchase',
          selectedSpecGood: {},
          singleGood: {},
          cartGoodsId: [],
          collection: [],
          selectedCartGoods: []
        },
        memberInfo: {},
        formData: {
          name: '',
          telphone: '',
          storeMessage: '',
          addressMessage: ''
        },
        validator: {
          name: {
            errText: '姓名不能为空',
            errIsShow: false,
            isFlag: false
          },
          telphone: {
            errText: '手机号码不能为空',
            errIsShow: false,
            isFlag: false
          },
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        let good = this.goodsInfo.selectedSpecGood
        let cart = this.goodsInfo.selectedCartGoods
        if (this.goodsInfo.buyWay !== 'cart') {
          if (this.goodsInfo.buyWay === 'purchase') {
            total = good.price * good.count * 100
            if (this.userInfo.freight !== '') {
              if (this.payWay === 'member') {
                if (this.userInfo.freight.money) {
                  total = total * this.memberUser.discount + this.userInfo.freight.money * 100
                } else if (this.userInfo.freight.target_money) {
                  total = total * this.memberUser.discount
                } else if (this.userInfo.freight.freight) {
                  total = total * this.memberUser.discount + this.userInfo.freight.freight * 100
                }
              } else {
                if (this.userInfo.freight.money) {
                  total = total + this.userInfo.freight.money * 100
                } else if (this.userInfo.freight.target_money) {
                  total = total
                } else if (this.userInfo.freight.freight) {
                  total = total + this.userInfo.freight.freight * 100
                }
              }
            }
            total = (total / 100).toFixed(2)
          } else {
            total = good.score * good.count
          }
        } else {
          cart.forEach((val) => {
            total += val.price * 100 * val.amount
          })
          if (this.userInfo.freight !== '') {
            if (this.payWay === 'member') {
              if (this.userInfo.freight.money) {
                total = total * this.memberUser.discount + this.userInfo.freight.money * 100
              } else if (this.userInfo.freight.target_money) {
                total = total * this.memberUser.discount
              } else if (this.userInfo.freight.freight) {
                total = total * this.memberUser.discount + this.userInfo.freight.freight * 100
              }
              total = (total / 100).toFixed(2)
            } else {
              if (this.userInfo.freight.money) {
                total = total + this.userInfo.freight.money * 100
              } else if (this.userInfo.freight.target_money) {
                total = total
              } else if (this.userInfo.freight.freight) {
                total = total + this.userInfo.freight.freight * 100
              }
              total = (total / 100).toFixed(2)
            }
          }
        }
        // if (this.payWay === 'member') {
        //   total = (total * this.memberUser.discount * 100 / 100).toFixed(2)
        // }
        return total
      },
      // 判断订单是否能提交
      canSubmitOrder() {
        let flag = true
        if (utils.isEmptyObject(this.goodsInfo.singleGood) && this.goodsInfo.selectedCartGoods.length < 1) {
          flag = false
        } else if (this.goodsInfo.selectedCartGoods.length === 0 && utils.isEmptyObject(this.goodsInfo.singleGood)) {
          flag = false
        } else {
          flag = true
        }
        if (!this.canSubmitOrderFlag) {
          flag = false
        } else {
          flag = true
        }
        return flag
      }
    },
    methods: {
      //  获取当前时间点
      getCurrentTime() {
        let date = new Date()
        let hour = date.getHours()
        return hour
      },
      //  获取当前年
      getCurrentDate() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        if (month < 10) {
          month = `0${month}`
        }
        let day = date.getDate()
        let result = ''
        return result = `${year}-${month}-${day}`
      },
      //  获取页面数据
      fetchData() {
        //获取预约时间
        ajax.getDataFromApi({
          url: '/v1/appointment-time'
        }, (response) => {
          let time = []
          this.appointTime.date = response.data.body.date
          response.data.body.time.forEach((val) => {
            if (Number(val.slice(0, 2)) > Number(this.getCurrentTime())) {
              time.push(val)
            }
          })
          this.appointTime.time = time.map((val, index) => {
            if (time[index + 1]) {
              val = `${time[index]}-${time[index + 1]}`
              return val
            }
          })
          if (this.appointTime.date.length > 1) {
            this.appointTime.selectedDate = this.appointTime.date[0]
          } else {
            this.appointTime.selectedDate = ''
          }
          if (this.appointTime.time.length > 1) {
            this.appointTime.selectedTime = this.appointTime.time[0]
          } else {
            this.appointTime.selectedTime = ''
          }
        })
        // 获取我的地址
        ajax.getDataFromApi({
          url: '/v1/my-address',
        }, (response) => {
          let addressList = response.data.body.list
          let flag = false
          this.userInfo.address = addressList
          this.userInfo.tel_phone = utils.detailPhone(this.userInfo.tel_phone)
          if (addressList.length > 0) {
            addressList.forEach((val) => {
              if (val.is_default === 1) {
                flag = true
                this.userInfo.defalutAddress = val
              }
            })
            if (!flag) {
              this.userInfo.defaultAddress = addressList[0]
            }
          }
          let checkedMyAddressInfo = utils.sessionstorageGetData('checkedMyAddress')
          // let detailArea = this.userInfo.defaultAddress.detail_area
        })
        // this.getNaberStore(utils.sessionstorageGetData('checkedAddress').location)
        // //获取门店列表
        // ajax.getDataFromApi({
        //   url: '/v1/offlinestore'
        // }, (response) => {
        //   let data = response.data.body.list
        //   data.map((val, index) => {
        //     index === 0 ? val.isSelected = true : val.isSelected = false
        //     val.logo = `/attachment/${val.logo}`
        //     return val
        //   })
        //   this.store.storeList = data
        //   this.store.selectedStore = data[0]
        // });
        //   获取购物明细
        this.getOrderInfo()
        setTimeout(() => {
          this.getGoodsFreight()
        }, 300)
      },
      //   获取商品的运费
      getGoodsFreight() {
        let content = []
        if (this.goodsInfo.buyWay !== 'cart') {
          content.push({
            goods_id: this.goodsInfo.selectedSpecGood.id,
            amount: this.goodsInfo.selectedSpecGood.count
          })
        } else {
          this.goodsInfo.selectedCartGoods.forEach((val) => {
            content.push({
              goods_id: val.id,
              amount: val.amount
            })
          })
        }
        ajax.postDataToApi({
          url: `/v1/freight-template`,
          body: {
            content: content
          }
        }, (response) => {
          this.userInfo.freight = response.data.body
        })
      },
      //  手机号码处理
      detailPhone(e) {
        if (this.locationUserInfo.tel_phone.length === 3 && e.keyCode !== 8) {
          this.locationUserInfo.tel_phone = this.locationUserInfo.tel_phone + ' '
        } else if (this.locationUserInfo.tel_phone.length === 8 && e.keyCode !== 8) {
          this.locationUserInfo.tel_phone = this.locationUserInfo.tel_phone + ' '
        } else {
          this.locationUserInfo.tel_phone = this.locationUserInfo.tel_phone
        }
      },
      //  手机号码复制处理
      detailPhoneCopy() {
        this.locationUserInfo.tel_phone = utils.detailPhone(this.locationUserInfo.tel_phone)
      },
      //  自提手机号码处理
      detailSelfMentionTelphone(e) {
        if (this.formData.telphone.length === 3 && e.keyCode !== 8) {
          this.formData.telphone = this.formData.telphone + ' '
        } else if (this.formData.telphone.length === 8 && e.keyCode !== 8) {
          this.formData.telphone = this.formData.telphone + ' '
        } else {
          this.formData.telphone = this.formData.telphone
        }
      },
      // 自提手机号码复制处理
      detailSelfMentionTelphoneCopy() {
        this.formData.telphone = utils.detailPhone(this.formData.telphone)
      },
      //    获取云图附件门店
      getNaberStore(location) {
        let key = '6ec262982ede339365a6f9d9b5370f1b'
        let tableid = '586b5c10afdf520ea8f2368e'
        let center = location
        let radius = 1000
        this.$jsonp('http://yuntuapi.amap.com/datasearch/around', {
          key: key,
          tableid: tableid,
          center: center,
          radius: radius
        })
          .then(response => {
            let data = response.datas
            if (response.datas.length === 0) {
              const self = this
              this.naberStore = []
              utils.sessionstorageData('allNavberStore', [])
              utils.sessionstorageData('naberStore', [])
              this.juageAddressIsCanSubmit = false
              MessageBox.confirm('您所定位的地址没有推荐门店信息，您可以通过更改定位地址来获取门店商品信息', '门店推荐提示', { confirmButtonText: '换个地址' }).then(action => {
                self.openAddress()
              })
            } else {
              if (response.datas && response.datas.length > 0) {
                this.naberStore = response.datas
                utils.sessionstorageData('allNavberStore', response.datas)
                utils.sessionstorageData('naberStore', response.datas[0])
              }
              this.juageAddressIsCanSubmit = true
            }
            // 门店自提
            // data.map((val, index) => {
            //   index === 0 ? val.isSelected = true : val.isSelected = false
            //   // val.logo = `/attachment/${val.logo}`
            //   return val
            // })
            // this.store.storeList = data
            // this.store.selectedStore = data[0]
          }, err => {
          })
      },
      //  关闭错误提示框
      errTipClose() {
        this.errTip.isShow = false
        if (!this.canSubmitOrderFlag) {
          this.canSubmitOrderFlag = true
        }
        if (this.errTip.isRecharge) {
          this.errTip.isRecharge = false
        }
      },
      // 根据localstorage中信息判断单子的来源
      getOrderInfo() {
        this.goodsInfo.buyWay = utils.localstorageGetData('buyWay')
        if (this.goodsInfo.buyWay !== 'cart') {
          this.goodsInfo.selectedSpecGood = utils.localstorageGetData('purchaseGood')
          this.goodsInfo.selectedSpecGood.count = utils.localstorageGetData('count')
          ajax.getDataFromApi({
            url: `v1/goods/${this.$route.params.id}`
          }, (response) => {
            this.goodsInfo.singleGood = response.data.body
            this.goodsInfo.singleGood.picture = utils.imgDetail(this.goodsInfo.singleGood.pictures[0])
          })
        } else {
          this.goodsInfo.cartGoodsId = utils.localstorageGetData('cartGoodsId')
          this.goodsInfo.collection = utils.localstorageGetData('collection')
          ajax.postDataToApi({
            url: `/v1/shopping-cart/settlements`,
            body: {
              id: this.goodsInfo.cartGoodsId
            }
          }, (response) => {
            this.goodsInfo.selectedCartGoods = response.data.body.list
          })
        }
      },
      // 打开时间选择
      openTimeShow() {
        this.appointTime.timeShow = true
      },
      // 关闭时间选择
      timeClose() {
        this.appointTime.timeShow = false
      },
      // 获取选择的日期
      getDate(date) {
        this.appointTime.selectedDate = date
        let time = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "21:00"]
        let invalidTime = []
        time.forEach((val) => {
          if (this.appointTime.selectedDate === this.getCurrentDate()) {
            if (Number(val.slice(0, 2)) > Number(this.getCurrentTime())) {
              invalidTime.push(val)
            }
          } else {
            invalidTime.push(val)
          }
        })
        this.appointTime.time = invalidTime.map((val, index) => {
          if (invalidTime[index + 1]) {
            val = `${invalidTime[index]}-${invalidTime[index + 1]}`
            return val
          }
        })
        this.appointTime.selectedTime = this.appointTime.time[0]
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
      storeDeliver() {
        this.receiptway.storeDeliver = true
        this.receiptway.storeHiglight = true
        this.receiptway.expressDelivery = false
        this.receiptway.expressHiglight = false
        // this.storeOpen()
      },
      //      关闭地址弹窗
      addressClose() {
        this.address.show = false
      },
      //      开启地址弹窗
      openAddress() {
        this.address.show = true
      },
      //       搜索定位
      searchAddress() {
        let key = '6ec262982ede339365a6f9d9b5370f1b'
        let keywords = this.address.searchKeyword
        let types = '银行|学校|小区|建筑|公司'
        let city = '重庆'
        Vue.http.get(
          `http://restapi.amap.com/v3/assistant/inputtips?key=${key}&keywords=${keywords}&types=${types}&city=${city}`
        )
          .then(response => {
            this.address.search = response.data.tips
          })
      },
      //       改变定位
      changeArea(address) {
        this.address.isChecked = true
        this.address.checked = JSON.parse(JSON.stringify(address))
        this.userInfo.checkedAddress = this.address.checked.name
        this.locationUserInfo.location = this.address.checked.location
        this.getNaberStore(this.locationUserInfo.location)
        this.locationUserInfo.district = this.address.checked.district
        if (!utils.sessionstorageGetData('isMyaddress')) {
          utils.sessionstorageData('checkedAddress', address)
        }
        this.addressClose()
      },
      // 打开门店弹窗
      storeOpen() {
        this.store.storeShow = true
      },
      // 关闭门店选择弹窗
      storeClose() {
        this.store.storeShow = false
      },
      // 选择门店
      selectStore(item) {
        this.store.selectedStore = item
        this.storeClose()
      },
      // 在线支付
      onlinePayWay() {
        this.payWay = 'online'
      },
      //  余额不足判断
      juadgeBalance() {
        if (this.memberInfo.balance * 100 < this.totalPrice * 100) {
          this.errTip.isShow = true
          this.errTip.text = '您的余额不足'
          this.errTip.isRecharge = true
          if (this.canSubmitOrderFlag) {
            this.canSubmitOrderFlag = false
          }
          return false
        }
      },
      //  会员卡余额支付 
      memberPayWay() {
        this.payWay = 'member',
          ajax.getDataFromApi({
            url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
          }, response => {
            this.memberInfo = response.data.body.list
            this.juadgeBalance()
          }, err => {

          })
      },
      //  会员登录
      memberLogin() {
        if (this.memberUser.password !== '') {
          ajax.postDataToApi({
            url: '/v1/authentication/password',
            body: {
              password: this.memberUser.password
            }
          }, response => {
            this.memberUser.status = true
            this.memberUser.discount = response.data.body
          }, err => {
            if (err.data.code === '200010') {
              this.errTip.isShow = true
              this.errTip.text = '您的密码错误'
              this.errTip.isWarn = true
              this.memberUser.password = ''
            }
          })
        } else {
          this.errTip.isShow = true
          this.errTip.text = '您还没有输入会员登录密码'
          this.errTip.isWarn = true
        }
      },
      //  余额不足去充值
      gotoRecharge() {
        window.location.href = '/#/site/member-recharge'
      },
      //编辑地址方法
      editMethod(id) {
        utils.sessionstorageData('editAddress', false)
        location.href = `/#/site/edit-address/${id}`
      },
      //验证方法
      //验证focus
      focusMethod(currentObj) {
        switch (currentObj) {
          case 'name':
            this.validator.name.errIsShow = false
            break;
          case 'telphone':
            this.validator.telphone.errIsShow = false
            break;
        }
      },
      blurMethod(currentObj) {
        switch (currentObj) {
          case 'name':
            let formDataName = this.formData.name
            let validatorName = this.validator.name
            let nameRe = /^[a-zA-Z\u4e00-\u9fa5]{2,16}$/

            if (formDataName === '') {
              validatorName.errText = '姓名不能为空'
              validatorName.errIsShow = true
              validatorName.isFlag = false
            } else if (!nameRe.test(formDataName)) {
              validatorName.errText = '请输入2到16位姓名'
              validatorName.errIsShow = true
              validatorName.isFlag = false
            } else {
              validatorName.isFlag = true
            }
            break;
          case 'telphone':
            let telRe = /^1[3|4|5|8]\d{1}\s\d{4}\s\d{4}$/
            let formDataTel = this.formData.telphone
            let validatorTel = this.validator.telphone

            if (formDataTel === '') {
              validatorTel.errText = '手机号码不能为空'
              validatorTel.errIsShow = true
              validatorTel.isFlag = false
            } else if (!telRe.test(formDataTel)) {
              validatorTel.errText = '请输入正确的手机号码'
              validatorTel.errIsShow = true
              validatorTel.isFlag = false
            } else {
              validatorTel.isFlag = true
            }
            break;
        }
      },
      // 公共的提交数据方法
      postSubmitMethod(url, data, callback) {
        ajax.postDataToApi({
          url: url,
          body: data
        }, (response) => {
          callback && callback(response)
        })
      },
      //  根据是选取我的地址还是定位地址判断address_id
      juadgeAddressId(postData, callback) {
        if (this.userInfo.isMyAddress) {
          postData.address_id = this.userInfo.checkedMyAddress.id
        } else {
          this.locationUserInfo.detail_area = JSON.parse(JSON.stringify(this.userInfo.checkedAddress))
          let telRe = /^1[3|4|5|8]\d{1}\s\d{4}\s\d{4}$/
          // 如果是定位地址过来的判断
          if (!this.userInfo.isMyAddress) {
            if (this.locationUserInfo.name === '') {
              Toast({
                message: '请输入您的姓名',
                position: 'middle',
                duration: 2000
              })
            } else if (this.locationUserInfo.tel_phone === '') {
              Toast({
                message: '请输入您的手机号码',
                position: 'middle',
                duration: 2000
              })
            } else if (!telRe.test(this.locationUserInfo.tel_phone)) {
              Toast({
                message: '请输入正确的手机号码',
                position: 'middle',
                duration: 2000
              })
            }
            else {
              this.locationUserInfo.tel_phone = this.locationUserInfo.tel_phone.replace(/\s+/g, "")
              ajax.postDataToApi({
                url: '/v1/my-address',
                body: this.locationUserInfo
              }, response => {
                let addressId = response.data.body.id
                postData.address_id = addressId
                // utils.sessionstorageData('isMyAddress', true)
                this.addressIsAddSuccess = true
                callback && callback()
              }, err => {
                this.addressIsAddSuccess = false
              })
            }
          }
        }
      },
      //  判断支付方式是否是会员卡余额支付
      juadgePayWay(postData) {
        if (this.payWay === 'member') {
          postData.pay_method = 'balance'
          postData.member_id = utils.localstorageGetData('userInfo').userId && utils.localstorageGetData(
            'userInfo').userId
          if (!this.memberUser.status) {
            this.errTip.isShow = true
            this.errTip.text = '您还没有输入会员登录密码'
            this.errTip.isWarn = true
          }
          this.juadgeBalance()
        }
      },
      // 直接购买和积分兑换方式提交订单
      falseCartOrderSubmit(url, postData) {
        // 直接购买商品跳转页面
        if (this.goodsInfo.buyWay === "purchase") {
          this.postSubmitMethod(url.orderUrl, postData, (response) => {
            if (this.payWay === 'member') {
              ajax.postDataToApi({
                url: '/v1/balance-pay',
                body: {
                  order_number: response.data.body.order_number,
                  member_id: utils.localstorageGetData('userInfo').userId && utils.localstorageGetData(
                    'userInfo').userId
                }
              }, response => {
                location.href = `/#/site/my-order`
              })
            } else {
              location.href = `/#/site/order-pay/${response.data.body.id}`
            }
          })
        }
        // 积分商品跳转页面
        if (this.goodsInfo.buyWay === "score") {
          this.postSubmitMethod(url.scoreUrl, postData, (response) => {
            location.href = `/#/site/score-success`
          })
        }
      },
      // 购物车提交的方式提交订单
      cartOrderSubmit(url, postData) {
        // 购物车购买跳转页面
        this.postSubmitMethod(url, postData, (response) => {
          if (response.data.body.length > 1) {
            this.errTip.isShow = true
            this.errTip.isWarn = true
            this.errTip.text = '由于您购买的商品中含有预约类商品，我们将分拆成两个订单您需要单独支付，未支付的订单将不予支付，感谢您的配合~'
            window.setTimeout(() => {
              this.errTip.isShow = false
              if (this.payWay === 'member') {
                let data = response.data.body
                ajax.postDataToApi({
                  url: '/v1/balance-pay',
                  body: {
                    order_number: data[0].order_number,
                    member_id: utils.localstorageGetData('userInfo').userId && utils.localstorageGetData(
                      'userInfo').userId
                  }
                }, response => {
                  ajax.postDataToApi({
                    url: '/v1/balance-pay',
                    body: {
                      order_number: data[1].order_number,
                      member_id: utils.localstorageGetData('userInfo').userId && utils.localstorageGetData(
                        'userInfo').userId
                    }
                  }, response => {
                    location.href = `/#/site/my-order`
                  })
                })
              } else {
                location.href = `/#/site/my-order`
              }
            }, 4000)
          } else {
            if (this.payWay === 'member') {
              ajax.postDataToApi({
                url: '/v1/balance-pay',
                body: {
                  order_number: response.data.body[0].order_number,
                  member_id: utils.localstorageGetData('userInfo').userId && utils.localstorageGetData(
                    'userInfo').userId
                }
              }, response => {
                location.href = `/#/site/my-order`
              })
            } else {
              location.href = `/#/site/order-pay/${response.data.body[0].id}`
            }
          }
        })
      },
      //提交订单
      orderSubmit() {
        if (this.appointTime.selectedTime === '' || this.appointTime.selectedDate === '') {
          MessageBox('提示', '当前时间不可预约')
        } else {
          if (this.canSubmitOrder) {
            if (!utils.localstorageGetData('isCake') && !this.juageAddressIsCanSubmit) {
              MessageBox.confirm('您所定位的地址没有推荐门店信息，您可以通过更改定位地址来获取门店商品信息', '门店推荐提示', { confirmButtonText: '换个地址' }).then(action => {
                this.openAddress()
              })
            } else {
              // 快递配送提交方式
              if (this.receiptway.expressDelivery) {
                if (this.goodsInfo.buyWay !== "cart") {
                  let postData = {
                    store_code: utils.sessionstorageGetData('naberStore').store_id || "",
                    profile_id: this.goodsInfo.selectedSpecGood.id,
                    address_id: this.userInfo.defalutAddress.id,
                    date: this.appointTime.selectedDate,
                    time: this.appointTime.selectedTime || '',
                    pay_method: 'WAIT',
                    user_comment: this.formData.addressMessage,
                    amount: this.goodsInfo.selectedSpecGood.count
                  }
                  this.juadgePayWay(postData)
                  if (this.userInfo.isMyAddress) {
                    postData.address_id = this.userInfo.checkedMyAddress.id
                  }
                  if (!this.userInfo.isMyAddress) {
                    this.juadgeAddressId(postData, () => {
                      if (!this.userInfo.isMyAddress && !this.addressIsAddSuccess) {
                      } else {
                        this.falseCartOrderSubmit({
                          orderUrl: '/v1/goods/default',
                          scoreUrl: '/v1/score-goods/default'
                        }, postData)
                      }
                    })
                  } else {
                    this.falseCartOrderSubmit({
                      orderUrl: '/v1/goods/default',
                      scoreUrl: '/v1/score-goods/default'
                    }, postData)
                  }
                } else {
                  let postData = {
                    store_code: utils.sessionstorageGetData('naberStore').store_id || "",
                    collection: this.goodsInfo.cartGoodsId,
                    address_id: this.userInfo.defalutAddress.id,
                    date: this.appointTime.selectedDate,
                    time: this.appointTime.selectedTime || '',
                    pay_method: 'WAIT',
                    user_comment: this.formData.addressMessage
                  }
                  this.juadgePayWay(postData)
                  if (this.userInfo.isMyAddress) {
                    postData.address_id = this.userInfo.checkedMyAddress.id
                  }
                  if (!this.userInfo.isMyAddress) {
                    this.juadgeAddressId(postData, () => {
                      if (!this.userInfo.isMyAddress && !this.addressIsAddSuccess) {
                      } else {
                        this.cartOrderSubmit('/v1/order/default', postData)
                      }
                    })
                  } else {
                    this.cartOrderSubmit('/v1/order/default', postData)
                  }
                }
              }
              //  门店自提提交方式
              if (this.receiptway.storeDeliver) {
                let telRe = /^1[3|4|5|8]\d{1}\s\d{4}\s\d{4}$/
                if (this.formData.name === '') {
                  Toast({
                    message: '请输入自提人姓名',
                    position: 'middle',
                    duration: 2000
                  })
                } else if (this.formData.telphone === '') {
                  Toast({
                    message: '请输入您的手机号码',
                    position: 'middle',
                    duration: 2000
                  })
                } else if (!telRe.test(this.formData.telphone)) {
                  Toast({
                    message: '请输入正确的手机号码',
                    position: 'middle',
                    duration: 2000
                  })
                } else {
                  if (this.goodsInfo.buyWay !== "cart") {
                    let postData = {
                      store_code: utils.sessionstorageGetData('naberStore').store_id || "",
                      profile_id: this.goodsInfo.selectedSpecGood.id,
                      // offline_store: this.store.selectedStore._id,
                      custom_name: this.formData.name,
                      contact_phone: this.formData.telphone.replace(/\s+/g, ""),
                      date: this.appointTime.selectedDate,
                      time: this.appointTime.selectedTime || '',
                      pay_method: 'WAIT',
                      user_comment: this.formData.storeMessage,
                      amount: this.goodsInfo.selectedSpecGood.count
                    }
                    this.juadgePayWay(postData)
                    if (this.userInfo.isMyAddress) {
                      postData.address_id = this.userInfo.checkedMyAddress.id
                    }
                    this.falseCartOrderSubmit({
                      orderUrl: '/v1/goods/self-pick',
                      scoreUrl: '/v1/score-goods/self-pick'
                    }, postData)
                  } else {
                    let postData = {
                      store_code: utils.sessionstorageGetData('naberStore').store_id || "",
                      collection: this.goodsInfo.cartGoodsId,
                      // offline_store: this.store.selectedStore._id,
                      custom_name: this.formData.name,
                      contact_phone: this.formData.telphone.replace(/\s+/g, ""),
                      date: this.appointTime.selectedDate,
                      time: this.appointTime.selectedTime || '',
                      pay_method: 'WAIT',
                      user_comment: this.formData.storeMessage
                    }
                    this.juadgePayWay(postData)
                    if (this.userInfo.isMyAddress) {
                      postData.address_id = this.userInfo.checkedMyAddress.id
                    }
                    this.cartOrderSubmit('/v1/order/self-pick', postData)
                  }
                }
              }
            }
          }
        }
      }
    },
  }
  require('../../assets/scss/orderSubmit.scss')

</script>