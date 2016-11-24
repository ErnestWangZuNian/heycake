// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Test = resolve => require(['../components/Test'], resolve)
const Index = resolve => require(['../components/Index'], resolve)
const Bar = { template: '<div>bar</div>' }
const routes = [
    { path: '/site/bar', component: Bar },
    { path: '/site/test', component: Test },
    { path: '/site/Index', component: Index }
]
export default routes
