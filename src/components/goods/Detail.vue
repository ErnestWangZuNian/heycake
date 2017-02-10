<template>
    <div>
        <div class="container">
            <div v-if='specStatus.isSelectSpec' class="spec-mask"></div>
            <!--轮播图-->
            <div class="swiper">
                <swipe :auto="4000">
                    <swipe-item v-for="item in banner">
                        <img :src="item" v-lazy="item.picture" alt="轮播">
                    </swipe-item>
                </swipe>
            </div>
            <div class="grid price-score">
                <div class="grid-cell">
                    <p>{{goodInfo.name}}</p>
                    <p class="c-red mt20" v-if="!rangeStatus">{{goodInfo.price | priceRange}}</p>
                    <p class="c-red mt20" v-if="rangeStatus">{{goodInfo.price | price}}</p>
                </div>
                <div class="grid-cell score" v-if="goodInfo.score > 0">
                    <p v-if="!rangeStatus"> {{goodInfo.score}}积分 </p>
                    <p v-if="rangeStatus"> {{selectedSpec.score}}积分 </p>
                    <button @click="scorePurchage">兑换</button>
                </div>
            </div>
            <div class="splitter"></div>

            <div class="grid">
                <div class="grid-cell">运费</div>
                <div class="grid-cell tright c-888">{{freight | freight}}</div>
            </div>

            <div class="splitter"></div>

            <!--<div class="grid">
                <div class="grid-cell">积分兑换</div>
                <div class="grid-cell tright c-888">29999积分</div>
                <div class="grid-cell u-w30">
                    <div class="item-after"></div>
                </div>
            </div>-->

            <div class="splitter"></div>

            <div class="grid" @click="openSpec">
                <div class="grid-cell">规格</div>
                <div class="grid-cell u-w30">
                    <div class="item-after"></div>
                </div>
            </div>

            <div class="splitter"></div>


            <div class="grid">
                <div class="grid-cell">查看用户评价<span class="c-888">(2564条评价)</span></div>
                <div class="grid-cell u-w30">
                    <div class="item-after"></div>
                </div>
            </div>
            <div class="product-content" v-html="goodDetailShow.content">
            </div>

            <div class="operation">
                <div class="grid operation-grid">
                    <router-link to='/site/cart'>
                        <div class="grid-cell u-w100">
                            <div class="item-cart position-rel">
                                <div class="position-abs nums">{{cartCount}}</div>
                            </div>
                            <div class="tcenter c-aaa">购物车</div>
                        </div>
                    </router-link>
                    <div class="grid-cell tright">
                        <button class="btn-orange" type="button" @click="joinCart()">加入购物车</button>
                        <button class="btn-red" type="button" @click="purchase()">立即购买</button>
                    </div>
                </div>
            </div>
            <transition name="spec" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <div class="select-spec" v-if="specStatus.isSelectSpec">
                    <div class="good">
                        <div class="grid-cell good-img">
                            <img src="" alt="" v-lazy="">
                        </div>
                        <div class="grid-cell good-info">
                            <p class="nane">{{goodInfo.name}}</p>
                            <p class="attrlist" v-if="specStatus.specWay!=='scoreChange'">
                                <span v-if="!rangeStatus"> {{goodInfo.price | priceRange}}</span>
                                <span v-if="rangeStatus"> {{goodInfo.price | price}}</span>
                            </p>
                            <p class="attrlist" v-if="specStatus.specWay==='scoreChange'">
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
                            <input type="text" class="fl" v-model="goodCount" @input="inputCount">
                            <button type="button" class="fl" @click="addCount">+</button>
                        </div>
                        <div class="tip fl" v-if="goodInfo.erp_product_type !== 1">（剩余{{selectedSpec.stock | stock }}个）</div>
                    </div>
                    <button class="confirm-spec" type="submit" :disabled="Math.floor(selectedSpec.stock) <= 0  && goodInfo.product_type !== 3" v-if="specStatus.specWay==='cart'"
                        @click="confirmJoinCart(goodInfo.id,selectedSpec.id,goodCount)" :class="{'disabled-spec': Math.floor(selectedSpec.stock) <= 0 && goodInfo.product_type !== 3}">
                        加入购物车
                    </button>
                    <button class="confirm-spec" type="submit" v-if="specStatus.specWay==='purchase'" :disabled="Math.floor(selectedSpec.stock) <= 0 && goodInfo.product_type !== 3"
                        :class="{'disabled-spec':Math.floor(selectedSpec.stock) <= 0 && goodInfo.product_type !== 3}" @click="confirmPurchase">
                        去结算
                    </button>
                    <button class="confirm-spec" type="submit" v-if="specStatus.specWay==='scoreChange'" :disabled="Math.floor(selectedSpec.stock) <= 0 && goodInfo.product_type !== 3"
                        :class="{'disabled-spec': Math.floor(selectedSpec.stock) <= 0  && goodInfo.product_type !== 3}" @click="confirmScoreChange">
                        立即兑换
                    </button>
                </div>
            </transition>
        </div>
        <!--错误提示弹框-->
        <modal :show='errTip.isShow' v-on:close='errTipClose'>
            <div slot='body'>
                <div class="modal-error-tip" @click="errLoginTip" v-if="errTip.login">
                    <div class="modal-img">
                        <img :src="errTip.url" alt="">
                    </div>
                    <div class="modal-test">{{errTip.test}}</div>
                </div>
                <div class="modal-error-tip" v-if="errTip.login === false">
                    <div class="modal-img">
                        <img :src="errTip.url" alt="">
                    </div>
                    <div class="modal-test">{{errTip.test}}</div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
    import { Swipe, SwipeItem, Lazyload, MessageBox, Toast } from 'mint-ui'
    import utils from '../../utils/public'    //公共方法（图片处理，数组去重，判断对象是否为空）
    import ajax from '../../utils/ajax'
    import Modal from '../common/Modal'
    import SelectTime from '../common/SelectTime'
    export default {
        name: 'Detail',
        components: {
            Swipe,
            SwipeItem,
            Lazyload,
            MessageBox,
            Modal,
            SelectTime
        },
        mounted() {
            this.fetchData()
        },
        data() {
            return {
                errTip: {
                    isShow: false,
                    login: false,
                    url: '../../assets/img/modal_img.png',
                    text: '请先登录!'
                },
                specStatus: {
                    isSelectSpec: false,
                    specWay: 'cart',
                },
                goodDetailShow: {
                    isShow: false,
                    content: ''
                },
                rangeStatus: false,
                goodCount: 1,
                scoreInfo: {},
                spec: [],
                originalSpecList: [],
                selectedSpec: {},
                freight: '',
                banner: [],
                goodInfo: {},
                cartCount: 0
            }
        },
        methods: {
            //  获取页面数据
            fetchData() {
                ajax.getDataFromApi({
                    url: `/v1/goods/${this.$route.params.id}`,
                    data: {
                        store_code: utils.sessionstorageGetData('naberStore').store_id || ""
                    }
                }, (response) => {
                    this.loading = false
                    let data = response.data.body
                    this.banner = data.pictures.map(utils.imgDetail)
                    this.goodInfo = data
                    this.modifyData(data)
                })
                //  获取商品详情展示图片文字
                ajax.getDataFromApi({
                    url: `/v1/goods/${this.$route.params.id}/detail-content`
                }, (response) => {
                    this.goodDetailShow.content = response.data
                    this.goodDetailShow.isShow = true
                });
                //  获取商品运费
                ajax.getDataFromApi({
                    url: `/v1/freight-details`
                }, (response) => {
                    this.freight = response.data.body
                })
                //  获取购物车数量
                this.getcartCount()
            },
            // 获取商品数量
            getcartCount(callback) {
                ajax.getDataFromApi({
                    url: `/v1/shopping-cart`
                }, (response) => {
                    this.cartCount = response.data.body.list.length
                    callback && callback()
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
            //  点击规格打开规格选择
            openSpec() {
                this.specStatus.isSelectSpec = true
            },
            //  点击加入购物车
            joinCart() {
                this.specStatus.isSelectSpec = true
                this.specStatus.specWay = 'cart'
            },
            // 点击立即购买
            purchase() {
                this.specStatus.isSelectSpec = true
                this.specStatus.specWay = 'purchase'
            },
            // 点击积分兑换
            scorePurchage() {
                this.specStatus.isSelectSpec = true
                this.specStatus.specWay = 'scoreChange'
                //  获取用户积分信息
                ajax.getDataFromApi({
                    url: `/v1/user-center/${utils.localstorageGetData('userInfo').userId && utils.localstorageGetData('userInfo').userId}`
                }, (response) => {
                    this.scoreInfo = response.data.body.list
                })
            },
            //   关闭规格选择弹框
            closeSpec() {
                this.specStatus.isSelectSpec = false
            },
            // 判断是不是蛋糕和是否附近有门店
            judgeCakeAddress() {
                let isCake = utils.localstorageGetData('isCake')
                let storeCode = utils.sessionstorageGetData('naberStore') && utils.sessionstorageGetData('naberStore').store_id
                let flag = false
                if (!isCake && storeCode === '') {
                    this.errTip.isShow = true
                    this.errTip.test = '您选择的商品附件没有门店选择，请去首页更改您的定位地址'
                    flag = true
                }
                return flag
            },
            //确认加入购物车
            confirmJoinCart(goodId, specId, goodCount) {
                let flag = this.judge()
                let isCake = this.judgeCakeAddress()
                if (flag && !isCake) {
                    ajax.postDataToApi({
                        url: '/v1/shopping-cart',
                        body: {
                            store_code: utils.sessionstorageGetData('naberStore').store_id || "",
                            goods_id: goodId,
                            specification_id: specId,
                            amount: goodCount,
                        }
                    }, (response) => {
                        this.getcartCount(() => {
                            this.specStatus.isSelectSpec = false
                            Toast({
                                message: '操作成功',
                                position: 'middle',
                                duration: 2000
                            })
                        })
                    })
                }
            },
            //  确认去结算
            confirmPurchase() {
                let flag = this.judge()
                let isCake = this.judgeCakeAddress()
                if (!isCake && flag) {
                    utils.localstorageData('buyWay', 'purchase')
                    utils.localstorageData('purchaseGood', this.selectedSpec)
                    utils.localstorageData('count', this.goodCount)
                    utils.localstorageData('orderId', this.goodInfo.id)
                    location.href = `/#/site/order-submit/${this.goodInfo.id}`
                }

            },
            // 确认立即兑换
            confirmScoreChange() {
                let flag = this.judge()
                let isCake = this.judgeCakeAddress()
                let scoreFlag = false
                if (this.selectedSpec.score > this.scoreInfo.score) {
                    this.errTip.isShow = true
                    this.errTip.test = "您的积分不足！"
                    this.specStatus.isSelectSpec = false
                } else {
                    scoreFlag = true
                }
                if (flag && scoreFlag && !isCake) {
                    utils.localstorageData('buyWay', 'score')
                    utils.localstorageData('purchaseGood', this.selectedSpec)
                    utils.localstorageData('count', this.goodCount)
                    utils.localstorageData('orderId', this.goodInfo.id)
                    location.href = `/#/site/order-submit/${this.goodInfo.id}`
                }
            },
            // 登录和规格判断
            judge() {
                let flag = false
                if (!this.$store.state.user.userInfo.isLogin) {
                    this.specStatus.isSelectSpec = false,
                        this.errTip.isShow = true
                    this.errTip.test = "请先登录！"
                    this.errTip.login = true
                } else if (utils.isEmptyObject(this.selectedSpec)) {
                    this.specStatus.isSelectSpec = false,
                        this.errTip.isShow = true
                    this.errTip.test = "请先选择规格！"
                } else {
                    flag = true
                }
                return flag
            },
            //  登录错误提示
            errLoginTip() {
                this.errTip.isShow = false,
                    location.href = '/#/site/login'
            },
            errSpecTip() {
                this.tip.errSpec = false
            },
            //  关闭错误提示框
            errTipClose() {
                if (this.errTip.login) {
                    this.errTip.login = false
                }
                this.errTip.isShow = false
            },
            // 增加数量
            addCount() {
                if (this.goodCount >= Math.floor(this.selectedSpec.stock)) {
                    if(this.selectedSpec.stock < 1) {
                        this.selectedSpec.stock = 1
                    }
                    this.goodCount =  Math.floor(this.selectedSpec.stock)
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
            }
        },
        //

    }
    require('../../assets/scss/detail.scss')
</script>