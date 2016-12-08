import Loading from './Loading'
import ajax from '../utils/ajax.js'
export default {
  name: 'NewArrivals',
  components: {
    Loading
  },
  mounted () {
    this.fetchData()
  },
  data () {
    return {
      loading: true,
      cartList: []
    }
  },
  methods: {
    // 获取数据
    fetchData () {
      this.loading = true
      ajax.getDataFromApi({
        url: `/v1/shopping-cart`
      }, (response) => {
        this.loading = false
        let data = response.data.body.list
        data.map((val) => {
          val.isSelected = false
        })
        this.cartList = response.data.body.list
      }, (error) => {
      })
    },
    // 选择商品
    selectedCart (item) {
      item.isSelected = false
    },
    // 增加数量
    addCount (item) {
      item.amount++
    },
    // 减少数量
    reduceCount (item) {
      if (item.amount <= 1) {
        item.amount = 1
      } else {
        item.amount--
      }
    },
    // 输入数量
    inputCount (item) {
      let re = /\D/
      if (re.test(item.amount) || item.amount <= 1) {
        item.amount = 1
      }
    }
  }
}
require('../assets/scss/cart.scss')