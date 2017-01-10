<template>
  <div class="h100">
    <loading v-if="loading && loadShow"></loading>
    <div class="container container-bg" v-if="!loading">
      <div v-if='specStatus.isSelectSpec' class="spec-mask"></div>
      <div class="exchange">
        <ul>
          <li class="list" v-for="item in listData" v-if="item.score !== 0">
            <div  class="grid height-160">
              <div class="grid-cell u-w120">
                <img :src="item.picture">
              </div>
              <div class="grid-cell">
                <p class="title">{{item.name}}</p>
                <span class="c-888 font-28">{{item.price | priceRange}}</span>
              </div>
              <div class="grid-cell u-1of4 tcenter border-left">
                <div class="font-28">
                  <p class="c-f76060">{{item.score}}</p>
                  <span class="c-f76060">积分</span>
                </div>
              </div>
            </div>
            <div class="btn-red" @click="scorePurchage(item)">立即兑换</div>
          </li>
        </ul>

      </div>
       <transition name="spec" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <div class="select-spec" v-if="specStatus.isSelectSpec">
                    <div class="good">
                        <div class="grid-cell good-img">
                            <img src="" alt="" v-lazy="">
                        </div>
                        <div class="grid-cell good-info">
                             <p>{{goodInfo.name}}</p>
                             <p class="attrlist">
                                <span v-if="!rangeStatus">{{goodInfo.score}}积分可兑换</span>
                                <span v-if="rangeStatus">{{selectedSpec.score}}积分可兑换</span>
                             </p>
                        </div>
                        <div class="grid-cell close-select" @click="closeSpec">
                            <span></span>
                        </div>
                    </div>
                    <ul class="spec">
                        <li v-for="(item,index) in spec">
                            <p>{{item.name}}</p>
                            <div class="spec-list">
                                <button type="button" v-for="(elem,elIndex) in item.specList" @click="selectSpec(elem,item.specList,spec,index,elIndex,$evevt)"
                                    :class="{active:elem.isChecked,disabled: !elem.canChecked}" :disabled="!elem.canChecked">
                    {{elem.name}}
              </button>
                            </div>
                        </li>
                    </ul>
                    <div class="spec-count cf">
                        <div class="name fl">数量</div>
                        <div class="countBox cf fl">
                            <button type="button" class="fl" @click="reduceCount">-</button>
                            <input  type="text" class="fl" v-model="goodCount" @input="inputCount">
                            <button type="button" class="fl" @click="addCount">+</button>
                        </div>
                        <div class="tip fl">（剩余{{selectedSpec.stock}}个）</div>
                    </div>
                    <button class="confirm-spec" type="submit" :disabled="selectedSpec.stock <= 0" :class="{'disabled-spec': selectedSpec.stock <= 0}" @click="confirmScoreChange">
                        立即兑换
                    </button>
                </div>
            </transition>
             <!--积分不足提示-->
            <modal :show='errTip.isShow'  v-on:close='errTipClose' >
            <div slot='body'>
                <div class="modal-error-tip" >
                    <div class="modal-img">
                        <img :src="errTip.url" alt="">
                    </div>
                    <div class="modal-test">{{errTip.test}}</div>
                </div>
            </div>
        </modal>
    </div>
  </div>
</template>
<script>
 import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
import Loading from '../common/Loading'
import ajax from '../../utils/ajax.js'
import utils from '../../utils/public'
import Modal from  '../common/Modal'
export default {
    name: 'ScoreExchange',
    components: {
        Loading,
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
            loading: true,
            loadShow: false,
            isLogin: this.$store.state.user.userInfo.isLogin || '',   //是否登录
            userId: this.$store.state.user.userInfo.userId || '',      //当前用户ID
            listData: [],
            goodInfo: {},
            rangeStatus: false,
            spec: [],
            errTip: {
                isShow: false,
                login: false,
                url: '../../assets/img/modal_img.png',
                text: '请先登录!'
            },
            scoreInfo: {},
            goodCount: 1,
            specStatus: {
                isSelectSpec: false
            },
            scoreInfo: {},
            originalSpecList: [],
            selectedSpec: {},

        }
    },
    methods: {
        //判断是否登录
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
        //获取列表数据
        getListData() {
            ajax.getDataFromApi({
                url: '/v1/goods',
            }, (response) => {
                this.listData = response.data.body.list
                this.dataDispose(this.listData)
                //数据请求完成,改变loading值,关闭load，显示渲染后的页面
                this.loading = false;
            })
        },
        //列表数据处理
        dataDispose(data) {
            data.forEach(val => {
                val.picture = `/attachment/${val.picture}`
            })
        },
        //   关闭规格选择弹框
        closeSpec() {
            this.specStatus.isSelectSpec = false
        },
        // 积分兑换
        scorePurchage(item) {
            this.spec = []
            this.originalSpecList = {}
            this.selectedSpec = {}
            // 获取商品的详细信息
            ajax.getDataFromApi({
                url: `/v1/goods/${item.id}`
            }, (response) => {
                let data = response.data.body
                this.goodInfo = data
                this.modifyData(data)
                this.specStatus.isSelectSpec = true
            })
            //  获取用户积分信息
            ajax.getDataFromApi({
              url: '/v1/user-center'
            },(response) => {
              this.scoreInfo = response.data.body.list
            })
        },
        // 处理页面数据 ==> 组织规格的数据结构
        modifyData(data) {
            let specifications = data.specifications
            let specList = data.specification_objects
            this.originalSpecList = data.specification_objects
            specifications.forEach((val, index) => {
                let curSpecList = []
                let curSpecInfo = []
                specList.forEach((childVal, childIndex) => {
                    curSpecList.push(childVal.value[index])
                })
                curSpecList = utils.unique(curSpecList)
                curSpecList.forEach((grandVal, grandIndex) => {
                    if (index === 0) {
                        curSpecInfo.push({
                            name: grandVal,
                            isChecked: false,
                            canChecked: true
                        })
                    } else {
                        curSpecInfo.push({
                            name: grandVal,
                            isChecked: false,
                            canChecked: false
                        })
                    }

                })
                this.spec.push({
                    name: val,
                    specList: curSpecInfo
                })
            })
        },
        // 选择规格
        selectSpec(item, items, spec, itemsIndex, itemIndex) {
            let len = spec.length
            // 初始化将所有元素的选择状态和可选状态设置为false
            if (itemsIndex < len - 1) {
                spec[itemsIndex + 1].specList.forEach((grandVal, grandIndex) => {
                    grandVal.canChecked = false
                    grandVal.isChecked = false
                })
            }
            //  判断那些规格可以选择
            items.forEach((val) => {
                val.isChecked = false
                if (val.name === item.name && val.canChecked) {
                    this.originalSpecList.forEach((childVal, childIndex) => {
                        if (childVal.value[itemsIndex] === item.name && itemsIndex < len - 1) {
                            if (itemsIndex > 0) {
                                spec[itemsIndex - 1].specList.forEach((val1, index1) => {
                                    spec[itemsIndex + 1].specList.forEach((grandVal, grandIndex) => {
                                        if (val1.isChecked) {
                                            if (childVal.value[itemsIndex + 1] === grandVal.name && childVal.value[itemsIndex - 1] === val1.name) {
                                                grandVal.canChecked = true
                                            }
                                        }
                                    })
                                })
                            } else {
                                spec[itemsIndex + 1].specList.forEach((grandVal, grandIndex) => {
                                    if (childVal.value[itemsIndex + 1] === grandVal.name) {
                                        grandVal.canChecked = true
                                    }
                                })
                            }
                        }
                    })
                }
            })
            // 点击当前元素设置选择状态
            item.isChecked = true
            // 根据是否是最后一个元素判断选择的规格
            if (itemsIndex === len - 1) {
                this.selectedSpec = []
                let selectSpec = []
                spec.forEach((val) => {
                    val.specList.forEach((childVal) => {
                        if (childVal.isChecked) {
                            selectSpec.push(childVal.name)
                        }
                    })
                })
                this.originalSpecList.forEach((val) => {
                    if (val.value.toString() === selectSpec.toString()) {
                        this.selectedSpec = JSON.parse(JSON.stringify(val))
                    }
                })
                this.rangeStatus = true
                this.goodInfo.price = this.selectedSpec.price
            }
        },
        // 增加数量
        addCount() {
            if (this.goodCount >= this.selectedSpec.stock) {
                this.goodCount = this.selectedSpec.stock
            } else {
                this.goodCount++
            }
        },
        // 减少数量
        reduceCount() {
            if (this.goodCount <= 1) {
                this.goodCount = 1
            } else {
                this.goodCount--
            }
        },
        // 输入数量
        inputCount() {
            let re = /\D/
            if (re.test(this.goodCount) || this.goodCount <= 1) {
                this.goodCount = 1
            }
            if (this.goodCount > this.selectedSpec.stock) {
                this.goodCount = this.selectedSpec.stock
            }
        },
        //  关闭错误提示框
        errTipClose () {
          this.errTip.isShow = false
        },
        // 确认立即兑换
        confirmScoreChange() {
            let scoreFlag = false
            if (this.selectedSpec.score > this.scoreInfo.total) {
                this.errTip.isShow = true
                this.errTip.test = "您的积分不足！"
            } else {
                scoreFlag = true
            }
            if (scoreFlag) {
                localStorage.setItem('buyWay', 'score')
                localStorage.setItem('purchaseGood', JSON.stringify(this.selectedSpec))
                localStorage.setItem('count', this.goodCount)
                location.href = `/#/site/order-submit/${this.goodInfo.id}`
            }
        },
    }
}
require('../../assets/scss/scoreExchange.scss')
</script>
