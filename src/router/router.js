// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const App = resolve => require(['../App'], resolve)
const Test = resolve => require(['../components/Test'], resolve)
const Bar = { template: '<div>bar</div>' }
const routes = [
    { path: '/site/foo', component: App },
    { path: '/site/bar', component: Bar },
    { path: '/site/test', component: Test }
]
export default routes
