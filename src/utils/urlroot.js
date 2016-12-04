import { Swipe, SwipeItem, Lazyload } from 'mint-ui'
import Loading from './Loading'
import utils from '../utils/public'
import ajax from '../utils/ajax'
import Count from './common/count'
export default {
    name: 'Detail',
    components: {
        Loading,
        Swipe,
        SwipeItem,
        Lazyload,
        Count
    },
    mounted() {
        this.fetchData()
    },
    data() {
        return {
            loading: false,
            isSelectSpec: false,
            goodDetailShow: {
                isShow: false,
                content: ''
            },
            spec: [],
            originalSpecList: [],
            selectedSpec: {},
            banner: [],
            goodInfo: {}
        }
    },
    methods: {
        //  获取页面数据
        fetchData() {
            this.loading = true
            //  获取商品详情数据
            ajax.getDataFromApi({
                url: `/v1/goods/${this.$route.params.id}`
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
                if (val.name === item.name  && val.canChecked) {
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
            if (itemsIndex === len -1) {
              this.selectedSpec = []
              let selectSpec = []
              spec.forEach((val) => {
              val.specList.forEach((childVal) => {
                 if(childVal.isChecked){
                   selectSpec.push(childVal.name)
                 }
              })
            })
            this.originalSpecList.forEach((val) => {
                if(val.value.toString() === selectSpec.toString()){
                    this.selectedSpec = JSON.parse(JSON.stringify(val))
                }
            })
           }
        },
        //  点击加入购物车
        joinCart() {
            this.isSelectSpec = true
        },
        //   关闭规格选择弹框
        closeSpec() {
            this.isSelectSpec = false
        },
        //
    },
    // 
}
require('../assets/scss/detail.scss')