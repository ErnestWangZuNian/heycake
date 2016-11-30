// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Index = resolve => require(['../components/Index'], resolve)
const ProductsList = resolve => require(['../components/ProductsList'], resolve)
const NewArrivals = resolve => require(['../components/NewArrivals'], resolve)
const UserCenter = resolve => require(['../components/UserCenter'], resolve)
const Cart = resolve => require(['../components/Cart'], resolve)
const OrderSubmit = resolve => require(['../components/OrderSubmit'], resolve)
const AddAddress = resolve => require(['../components/AddAddress'], resolve)
const Detail = resolve => require(['../components/Detail'], resolve)
const Loading = resolve => require(['../components/Loading'], resolve)
const Login = resolve => require(['../components/Login'], resolve)
const routes = [
    { path: '/site/index', component: Index },
    { path: '/site/products-list', component: ProductsList },
    { path: '/site/new-arrivals', component: NewArrivals },
    { path: '/site/user-center', component: UserCenter },
    { path: '/site/cart', component: Cart },
    { path: '/site/order-submit', component: OrderSubmit },
    { path: '/site/add-address', component: AddAddress },
    { path: '/site/detail', component: Detail },
    { path: '/site/loading', component: Loading },
    { path: '/site/login', component: Login }
]
export default routes
