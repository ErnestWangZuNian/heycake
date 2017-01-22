<template>
    <div>
        <loading v-if="loading"></loading>
        <div class="container" v-if="!loading">
            <div class="order-tab">
                <button :class="[receiptway.expressHiglight ? 'btn-red' : 'btn-gray']" @click="expressDelivery">快递配送</button>
                <button :class="[receiptway.storeHiglight ? 'btn-red' : 'btn-gray']" @click="storeDeliver">门店自提</button>
            </div>

            <!--快递配送信息-->
            <div class="order-info" v-if="receiptway.expressDelivery">
                <div class="label-list" v-if="isMyAddress===false">
                    <div class="fl info">
                        <section>
                            <div class="icon icon-name"></div>
                            <div class="text"><input type="text" placeholder="您的姓名"></div>
                        </section>

                        <section>
                            <div class="icon icon-tel"></div>
                            <div class="text"><input type="text" placeholder="配送员联系您的方式"></div>
                        </section>
                        <section>
                            <div class="icon icon-addr"></div>
                            <div class="text"><span>[已选择地址]</span>{{userInfo.checkedAddress}}</div>
                        </section>
                    </div>
                    <router-link to="/site/my-address">
                        <div class="fl arrow">
                            <div class="icon-right"></div>
                        </div>
                    </router-link>
                    <div class="cf"></div>
                </div>
                <div class="label-list" v-if="isMyAddress">
                    <div class="fl info">
                        <section>
                            <div class="icon icon-name"></div>
                            <div class="text">{{userInfo.name}}</div>
                        </section>

                        <section>
                            <div class="icon icon-tel"></div>
                            <div class="text">{{userInfo.telphone}}</div>
                        </section>
                        <section>
                            <div class="icon icon-addr"></div>
                            <div class="text"><span>[已选择地址]</span>{{userInfo.checkedAddress}}</div>
                        </section>
                    </div>
                    <div class="fl arrow" @click="editMethod(userInfo.myAddressId)">
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
                <div class="label-list">
                    <div class="store-info">
                        自提信息
                    </div>
                    <div class="fl info">
                        <section>
                            <div class="icon icon-name"></div>
                            <div class="text">{{store.selectedStore.name}}</div>
                        </section>

                        <section>
                            <div class="icon icon-tel"></div>
                            <div class="text">{{store.selectedStore.contact_phone}}</div>
                        </section>

                        <section>
                            <div class="icon icon-addr"></div>
                            <div class="text"><span>[默认]</span>{{store.selectedStore.address}}</div>
                        </section>
                    </div>
                    <div class="fl arrow" @click="storeOpen">
                        <div class="icon-right"></div>
                    </div>
                    <div class="cf"></div>
                </div>
                <div class="label-message">
                    <div class="label-list">
                        <label>自提人</label> <input class="inputs" type="text" v-model='formData.name' @focus="focusMethod('name')"
                            @blur="blurMethod('name')" placeholder="请填写自提人姓名(必填)">
                    </div>
                    <div class='err-class tright' v-if="validator.name.errIsShow">{{validator.name.errText}}</div>
                    <div class="label-list">
                        <label>联系电话</label> <input class="inputs" type="text" v-model='formData.telphone' @focus="focusMethod('telphone')"
                            @blur="blurMethod('telphone')" placeholder="请填写自提人联系方式(必填)">
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
                    <span class="inputs" @click="openTimeShow">  {{appointTime.selectedDate}}</span> - <span class="inputs"
                        @click="openTimeShow">{{appointTime.selectedTime}}</span>
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
                            <p v-if="goodsInfo.buyWay !== 'score'">{{this.goodsInfo.selectedSpecGood.price | detailPrice}}</p>
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
                <div class="freight">
                    <p>运费<span>免运费</span></p>
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
                <p class="" v-if="goodsInfo.buyWay !== 'score'">合计：<span>{{ totalPrice }}</span></p>
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
    </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui'
    import Loading from '../common/Loading'
    import ajax from '../../utils/ajax.js'
    import utils from '../../utils/public'
    import SelectTime from '../common/SelectTime'
    import SelectStore from '../common/SelectStore'
    import Modal from '../common/Modal'
    export default {
        name: 'OrderSubmit',
        components: {
            Loading,
            Swipe,
            SwipeItem,
            SelectTime,
            SelectStore,
            Modal
        },
        mounted() {
            this.fetchData()
            // 判断是自己的地址还是定位的地址
            this.isMyAddress = utils.sessionstorageGetData('isMyAddress')
            if (this.isMyAddress) {
                this.userInfo.name = utils.sessionstorageGetData('checkedMyAddress').name
                this.userInfo.telphone = utils.sessionstorageGetData('checkedMyAddress').tel_phone
                this.userInfo.myAddressId = utils.sessionstorageGetData('checkedMyAddress').id
                this.userInfo.checkedAddress = utils.sessionstorageGetData('checkedMyAddress').detail_area
            } else {
                this.userInfo.name = ""
                this.userInfo.telphone = ""
                this.userInfo.myAddressId = ""
                this.userInfo.checkedAddress = utils.sessionstorageGetData('checkedAddress').name
            }
        },
        data() {
            return {
                loading: false,
                errTip: {
                    isShow: false,
                    isRecharge: false,
                    isWarn: false,
                    text: '您的密码有误请重新登录'
                },
                canSubmitOrderFlag: true,
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
                    status: false
                },
                receiptway: {
                    expressDelivery: true,
                    expressHiglight: true,
                    storeDeliver: false,
                    storeHiglight: false
                },
                store: {
                    storeShow: false,
                    storeList: [],
                    selectedStore: {}
                },
                userInfo: {
                    defalutAddress: {},
                    address: [],
                    checkedAddress: '',
                    name: '',
                    telphone: '',
                    myAddressId: ''
                },
                goodsInfo: {
                    buyWay: 'purchase',
                    selectedSpecGood: {},
                    singleGood: {},
                    cartGoodsId: [],
                    collection: [],
                    selectedCartGoods: []
                },
                isMyAddress: false,
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
                        total = good.price * good.count
                    } else {
                        total = good.score * good.count
                    }
                } else {
                    cart.forEach((val) => {
                        total += val.price * 100 * val.amount
                    })
                    total = (total / 100).toFixed(2)
                }
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
            //  获取页面数据
            fetchData() {
                this.loading = true
                //获取预约时间
                ajax.getDataFromApi({
                    url: '/v1/appointment-time'
                }, (response) => {
                    this.loading = false
                    this.appointTime.date = response.data.body.date
                    this.appointTime.time = response.data.body.time.map((val, index) => {
                        if (response.data.body.time[index + 1]) {
                            val = `${response.data.body.time[index]}-${response.data.body.time[index + 1]}`
                            return val
                        }
                    })
                    this.appointTime.selectedDate = this.appointTime.date[0]
                    this.appointTime.selectedTime = this.appointTime.time[0]
                })
                // 获取我的地址
                ajax.getDataFromApi({
                    url: '/v1/my-address',
                }, (response) => {
                    let addressList = response.data.body.list
                    let flag = false
                    this.loading = false
                    this.userInfo.address = addressList
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
                })
                //获取门店列表
                ajax.getDataFromApi({
                    url: '/v1/offlinestore'
                }, (response) => {
                    let data = response.data.body.list
                    data.map((val, index) => {
                        index === 0 ? val.isSelected = true : val.isSelected = false
                        val.logo = `/attachment/${val.logo}`
                        return val
                    })
                    this.store.storeList = data
                    this.store.selectedStore = data[0]
                });
                //   获取购物明细
                this.getOrderInfo()
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
                        body: { id: this.goodsInfo.cartGoodsId }
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
                this.storeOpen()
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
            //  会员卡余额支付 
            memberPayWay() {
                this.payWay = 'member',
                    ajax.getDataFromApi({
                        url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId}`
                    }, response => {
                        this.memberInfo = response.data.body.list
                        if (this.memberInfo.balance * 100 < this.totalPrice * 100) {
                            this.errTip.isShow = true
                            this.errTip.text = '您的余额不足'
                            this.errTip.isRecharge = true
                            if (this.canSubmitOrderFlag) {
                                this.canSubmitOrderFlag = false
                            }
                        }
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
                        this.memberUser.status = response.data.body
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
                        let telRe = /^1[3|4|5|8]\d{9}$/
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
            //提交订单
            orderSubmit() {
                if (this.canSubmitOrder) {
                    // 快递配送提交方式
                    if (this.receiptway.expressDelivery) {
                        if (this.goodsInfo.buyWay !== "cart") {
                            let postData = {
                                store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
                                profile_id: this.goodsInfo.selectedSpecGood.id,
                                address_id: this.userInfo.defalutAddress.id,
                                date: this.appointTime.selectedDate,
                                time: this.appointTime.selectedTime,
                                pay_method: 'WAIT',
                                user_comment: this.formData.addressMessage,
                                amount: this.goodsInfo.selectedSpecGood.count
                            }
                            if (this.isMyAddress) {
                                postData.address_id = this.userInfo.myAddressId
                            } else {
                                postData.address_id = this.userInfo.defalutAddress.id
                            }
                            if (this.payWay === 'member') {
                                postData.pay_method = 'balance'
                                postData.member_id = utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId
                                if (!this.memberUser.status) {
                                    this.errTip.isShow = true
                                    this.errTip.text = '您还没有输入会员登录密码'
                                    this.errTip.isWarn = true
                                }
                            }
                            // 直接购买商品跳转页面
                            if (this.goodsInfo.buyWay === "purchase") {
                                this.postSubmitMethod('/v1/goods/default', postData, (response) => {
                                    if (this.payWay === 'member') {
                                        ajax.postDataToApi({
                                            url: '/v1/balance-pay',
                                            body: {
                                                order_number: response.data.body.order_number,
                                                member_id: utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId
                                            }
                                        }, response => {
                                            console.log('支付成功')
                                        })
                                    } else {
                                        location.href = `/#/site/order-pay/${response.data.body.id}`
                                    }
                                })
                            }
                            // 积分商品跳转页面
                            if (this.goodsInfo.buyWay === "score") {
                                this.postSubmitMethod('/v1/score-goods/default', postData, (response) => {
                                    location.href = `/#/site/score-success`
                                })
                            }
                        } else {
                            let postData = {
                                store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
                                collection: this.goodsInfo.cartGoodsId,
                                address_id: this.userInfo.defalutAddress.id,
                                date: this.appointTime.selectedDate,
                                time: this.appointTime.selectedTime,
                                pay_method: 'WAIT',
                                user_comment: this.formData.addressMessage
                            }
                            if (this.isMyAddress) {
                                postData.address_id = this.userInfo.myAddressId
                            } else {
                                postData.address_id = this.userInfo.defalutAddress.id
                            }
                            if (this.payWay === 'member') {
                                postData.pay_method = 'balance'
                                postData.member_id = utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId
                                if (!this.memberUser.status) {
                                    this.errTip.isShow = true
                                    this.errTip.text = '您还没有输入会员登录密码'
                                    this.errTip.isWarn = true
                                }
                            }
                            // 购物车购买跳转页面
                            this.postSubmitMethod('/v1/order/default', postData, (response) => {
                                if (response.data.body.length > 1) {
                                    this.errTip.isShow = true
                                    this.errTip.isWarn = true
                                    this.errTip.text = '由于您购买的商品中含有预约类商品，我们将分拆成两个订单您需要单独支付，未支付的订单将不予支付，感谢您的配合~'
                                    window.setTimeout(() => {
                                        this.errTip.isShow = false
                                        location.href = `/#/site/my-order`
                                    }, 3000)
                                } else {
                                    location.href = `/#/site/order-pay/${response.data.body[0].id}`
                                }
                            })
                        }
                    }
                    //  门店自提提交方式
                    if (this.receiptway.storeDeliver) {
                        if (this.formData.name !== '' && this.formData.telphone !== '') {
                            if (this.goodsInfo.buyWay !== "cart") {
                                let postData = {
                                    store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
                                    profile_id: this.goodsInfo.selectedSpecGood.id,
                                    offline_store: this.store.selectedStore.id,
                                    custom_name: this.formData.name,
                                    contact_phone: this.formData.telphone,
                                    date: this.appointTime.selectedDate,
                                    time: this.appointTime.selectedTime,
                                    pay_method: 'WAIT',
                                    user_comment: this.formData.addressMessage,
                                    amount: this.goodsInfo.selectedSpecGood.count
                                }
                                if (this.payWay === 'member') {
                                    postData.pay_method = 'balance'
                                    postData.member_id = utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId
                                    if (!this.memberUser.status) {
                                        this.errTip.isShow = true
                                        this.errTip.text = '您还没有输入会员登录密码'
                                        this.errTip.isWarn = true
                                    }
                                }
                                if (this.goodsInfo.buyWay === "purchase") {
                                    this.postSubmitMethod('/v1/goods/self-pick', postData, (response) => {
                                        location.href = `/#/site/order-pay/${response.data.body.id}`
                                    })
                                }
                                if (this.goodsInfo.buyWay === "score") {
                                    this.postSubmitMethod('/v1/score-goods/self-pick', postData, (response) => {
                                        location.href = `/#/site/score-success`
                                    })
                                }
                            } else {
                                let postData = {
                                    store_code: utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id,
                                    collection: this.goodsInfo.cartGoodsId,
                                    offline_store: this.store.selectedStore.id,
                                    custom_name: this.formData.name,
                                    contact_phone: this.formData.telphone,
                                    date: this.appointTime.selectedDate,
                                    time: this.appointTime.selectedTime,
                                    pay_method: 'WAIT',
                                    user_comment: this.formData.addressMessage
                                }
                                if (this.isMyAddress) {
                                    postData.address_id = this.userInfo.myAddressId
                                } else {
                                    postData.address_id = this.userInfo.defalutAddress.id
                                }
                                if (this.payWay === 'member') {
                                    postData.pay_method = 'balance'
                                    postData.member_id = utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId
                                    if (!this.memberUser.status) {
                                        this.errTip.isShow = true
                                        this.errTip.text = '您还没有输入会员登录密码'
                                        this.errTip.isWarn = true
                                    }
                                }
                                this.postSubmitMethod('/v1/order/self-pick', postData, (response) => {
                                    location.href = `/#/site/order-pay/${response.data.body.id}`
                                })
                            }
                        }
                    }
                }
            }
        },
    }
    require('../../assets/scss/orderSubmit.scss')
</script>