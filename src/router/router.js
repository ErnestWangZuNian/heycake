// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Index = resolve => require(['../components/goods/Index'], resolve)
const ProductsList = resolve => require(['../components/goods/ProductsList'], resolve)
const CakeList = resolve => require(['../components/goods/CakeList'], resolve)
const NewArrivals = resolve => require(['../components/goods/NewArrivals'], resolve)
const UserCenter = resolve => require(['../components/user/UserCenter'], resolve)
const Cart = resolve => require(['../components/goods/Cart'], resolve)
const OrderSubmit = resolve => require(['../components/order/OrderSubmit'], resolve)
const AddAddress = resolve => require(['../components/user/AddAddress'], resolve)
const Detail = resolve => require(['../components/goods/Detail'], resolve)
const MyOrder = resolve => require(['../components/order/MyOrder'], resolve)
const MyScore = resolve => require(['../components/score/MyScore'], resolve)
const ScoreExchange = resolve => require(['../components/score/ScoreExchange'], resolve)
const MyComment = resolve => require(['../components/user/MyComment'], resolve)
const MyAddress = resolve => require(['../components/user/MyAddress'], resolve)
const About = resolve => require(['../components/store/About'], resolve)
const OrderPay = resolve => require(['../components/order/OrderPay'], resolve)
const OrderEvaluate = resolve => require(['../components/order/OrderEvaluate'], resolve)
const Loading = resolve => require(['../components/common/Loading'], resolve)
const OrderSuccess = resolve => require(['../components/order/OrderSuccess'], resolve)
const OrderFail = resolve => require(['../components/order/OrderFail'], resolve)
const ScoreSuccess = resolve => require(['../components/score/ScoreSuccess'], resolve)
const Login = resolve => require(['../components/user/Login'], resolve)
const MemberIndex = resolve => require(['../components/member/Home'], resolve)
const MemberRecharge = resolve => require(['../components/member/Recharge'], resolve)
const MemberRechargeDetail = resolve => require(['../components/member/RechargeDetail'], resolve)
const MemberConsumption = resolve => require(['../components/member/Consumption'], resolve)
const MemberConsumptionDetail = resolve => require(['../components/member/ConsumptionDetail'], resolve)
const OrderDetail = resolve => require(['../components/order/OrderDetail'], resolve)
const routes = [{
  path: '',
  redirect: '/site/index'
}, {
  path: '/site/index',
  component: Index
}, {
  path: '/site/products-list',
  component: ProductsList
}, {
  path: '/site/cake-list',
  component: CakeList
}, {
  path: '/site/new-arrivals',
  component: NewArrivals
}, {
  path: '/site/user-center',
  component: UserCenter
}, {
  path: '/site/cart',
  component: Cart
}, {
  path: '/site/order-submit',
  component: OrderSubmit
}, {
  path: '/site/order-submit/:id',
  component: OrderSubmit
}, {
  path: '/site/add-address',
  component: AddAddress
}, {
  path: '/site/edit-address/:id',
  component: AddAddress
}, {
  path: '/site/detail/:id',
  component: Detail
}, {
  path: '/site/my-order',
  component: MyOrder
}, {
  path: '/site/my-order/:status',
  component: MyOrder
}, {
  path: '/site/my-score',
  component: MyScore
}, {
  path: '/site/score-exchange',
  component: ScoreExchange
}, {
  path: '/site/score-exchange/:detail',
  component: ScoreExchange
}, {
  path: '/site/my-comment',
  component: MyComment
}, {
  path: '/site/my-address',
  component: MyAddress
}, {
  path: '/site/about',
  component: About
}, {
  path: '/site/order-pay/',
  component: OrderPay
}, {
  path: '/site/order-pay/:id',
  component: OrderPay
}, {
  path: '/site/order-evaluate/:id',
  component: OrderEvaluate
}, {
  path: '/site/loading',
  component: Loading
}, {
  path: '/site/order-success',
  component: OrderSuccess
}, {
  path: '/site/order-fail',
  component: OrderFail
}, {
  path: '/site/order-detail',
  component: OrderDetail
}, {
  path: '/site/score-success',
  component: ScoreSuccess
}, {
  path: '/site/login',
  component: Login
}, {
  path: '/site/member',
  component: MemberIndex
}, {
  path: '/site/member-recharge',
  component: MemberRecharge
}, {
  path: '/site/member-recharge-detail',
  component: MemberRechargeDetail
}, {
  path: '/site/member-consumption',
  component: MemberConsumption
}, {
  path: '/site/member-consumption-detail',
  component: MemberConsumptionDetail
}]
export default routes
