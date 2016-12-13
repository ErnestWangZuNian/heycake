import { Swipe, SwipeItem } from 'mint-ui'
import Loading from './Loading'
import ajax from '../utils/ajax.js'
import utils from '../utils/public'
import SelectTime from './common/selectTime'
import SelectStore from './common/SelectStore'
export default {
    name: 'OrderSubmit',
    components: {
        Loading,
        Swipe,
        SwipeItem,
        SelectTime,
        SelectStore
    },
    mounted() {
        this.fetchData()
    },
    data() {
        return {
            loading: false,
            appointTime: {
                timeShow: false,
                date: [],
                time: [],
                selectedTime: '',
                selectedDate: ''
            },
            payWay: 'online',
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
                address: []
            },
            goodsInfo: {
                buyWay: 'purchase',
                selectedSpecGood: {},
                singleGood: {},
                cartGoodId: [],
                selectedCartGoods: []
            },
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
                total = good.price * good.count
            } else {
                cart.forEach((val) => {
                    total += val.price * 100 * val.amount
                })
                total = total / 100
            }
            return total
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
        // 根据localstorage中信息判断单子的来源
        getOrderInfo() {
            this.goodsInfo.buyWay = localStorage.getItem('buyWay')
            if (this.goodsInfo.buyWay !== 'cart') {
                this.goodsInfo.selectedSpecGood = JSON.parse(localStorage.getItem('purchaseGood'))
                this.goodsInfo.selectedSpecGood.count = localStorage.getItem('count')
                ajax.getDataFromApi({
                    url: `v1/goods/${this.$route.params.id}`
                }, (response) => {
                    this.goodsInfo.singleGood = response.data.body
                    this.goodsInfo.singleGood.picture = utils.imgDetail(this.goodsInfo.singleGood.pictures[0])
                })
            } else {
                this.goodsInfo.cartGoodId = JSON.parse(localStorage.getItem('cartGoods'))
                ajax.postDataToApi({
                    url: `/v1/shopping-cart/settlements`,
                    body: { id: this.goodsInfo.cartGoodId }
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
            // 快递配送提交方式
            if (this.receiptway.expressDelivery) {
                if (this.goodsInfo.buyWay !== "cart") {
                    let postData = {
                        profile_id: this.goodsInfo.selectedSpecGood.id,
                        address_id: this.userInfo.defalutAddress.id,
                        date: this.appointTime.selectedDate,
                        time: this.appointTime.selectedTime,
                        pay_method: 'WAIT',
                        user_comment: this.formData.addressMessage,
                        amount: this.goodsInfo.selectedSpecGood.count
                    }
                    // 直接购买商品跳转页面
                    if (this.goodsInfo.buyWay === "purchase") {
                        this.postSubmitMethod('/v1/goods/default', postData, (response) => {
                            location.href = `/#/site/order-pay/${response.data.body.id}`
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
                        collection: this.goodsInfo.cartGoodId,
                        address_id: this.userInfo.defalutAddress.id,
                        date: this.appointTime.selectedDate,
                        time: this.appointTime.selectedTime,
                        pay_method: 'WAIT',
                        user_comment: this.formData.addressMessage,
                        amount: this.goodsInfo.selectedSpecGood.count
                    }
                    // 购物车购买跳转页面
                    this.postSubmitMethod('/v1/goods/default', postData, (response) => {
                        location.href = `/#/site/score-success`
                    })
                }
            }
            //  门店自提提交方式
            if (this.receiptway.storeDeliver) {
                if (this.formData.name !== '' && this.formData.telphone !== '') {
                    if (this.goodsInfo.buyWay !== "cart") {
                        let postData = {
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
                        if (this.goodsInfo.buyWay === "purchase") {
                            this.postSubmitMethod('/v1/goods/default', postData, (response) => {
                                location.href = `/#/site/order-pay/${response.data.body.id}`
                            })
                        }
                        if (this.goodsInfo.buyWay === "score") {
                            this.postSubmitMethod('/v1/score-goods/default', postData, (response) => {
                                location.href = `/#/site/score-success`
                            })
                        }
                    } else {
                        let postData = {
                            collection: this.goodsInfo.cartGoodId,
                            offline_store: this.store.selectedStore.id,
                            custom_name: this.formData.name,
                            contact_phone: this.formData.telphone,
                            date: this.appointTime.selectedDate,
                            time: this.appointTime.selectedTime,
                            pay_method: 'WAIT',
                            user_comment: this.formData.addressMessage,
                            amount: this.goodsInfo.selectedSpecGood.count
                        }
                        this.postSubmitMethod('/v1/goods/default', postData, (response) => {
                            location.href = `/#/site/score-success`
                        })
                    }
                }
            }
        }
    },
}
require('../assets/scss/orderSubmit.scss')