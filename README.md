#heycake  

 ![](http://heycake.cn/attachment/3eb9a9fc-9577ce5f-3f08997e-24e331fb-9511f2c8123f67aa)
 

#####该项目采用vue2.0版本开发，路由采用vue-router,数据交互采用vue-rescource，项目结构主要放在src目录下,主要组件

放在components中，过滤函数写在filter中,路由配置放在router目录下,公共函数写在utils中，已经完成的封装ajax的函数
 
ajax, 项目启动在main.js中,项目全部用es6编写 ，样式采用sass编写，移动端端布局用到了hotcss，编写样式的只需要import px2rem，

然后按照设计图的尺寸大小进行编写代码即可，举个例子 设计图上轮播区域是640px,200px，只需要写成width: px2rem(640)就可以了


##### 克隆该项目到你本地磁盘   git clone git@git.coding.net:ErnestWang/heycake.git

##### 安装npm模块      npm install 

##### 安装sass模块     npm node-sass  sass-loader  --save

##### 安装vue全家桶    npm install vue-router vue-resource vuex --save


##### 项目运行    npm run dev


##### 项目服务线上运行  npm run build 


