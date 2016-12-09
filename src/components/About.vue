<template>
  <div>
    <loading v-if="loading"></loading>
    <div class="container" v-if="!loading">
      <div class="about-us">
        <h1>HEY CAKE品牌简介</h1>
        <p>HEY CAKE是重庆睿时餐饮公司旗下的连锁品牌，是重庆首家单品精品咖啡和重庆“裸”蛋糕领导品牌，秉承着“我们源自天然，只生产健康”的品牌理念，精选全球顶级咖啡豆，挑选优质供应商，从种植、生产、烘焙多个环节保障咖啡正宗、原香的品质，致力打造品质一流的现磨精品咖啡店。根据现代白领和商务人士对时尚、格调生活的追求来提供便捷时尚健康的消费体验。在蛋糕、甜点、面包等产品领域，我们甄选世界各地的优质原料，坚持“健康、品质、有机”的理念，保障所有产品无添加、无人工香精、纯手工制作、纯动物奶油。</p>
        <p>两年以来，Hey cake用高速的品牌发展势头来回馈消费者，目前在重庆核心商务区和社区已有30多家门店，覆盖主城九区，为更多的消费者提供安全放心的优质产品。</p>
        <img src="../assets/img/xxpic.jpg">
        <h1>HEY CAKE产品理念</h1>
        <h2>精选顶级咖啡豆</h2>
        <p>精选阿拉比卡等顶尖咖啡豆，挑选优质供应商，保证咖啡豆正宗、原香的品质，致力于创作品质一流的精品现磨咖啡。</p>
        <h2>严选优质食材</h2>
        <p>严选全球顶级食材，采用新西兰乳脂奶油、比利时进口巧克力、韩国进口白砂糖，同时选用优质水果供应商提供的新鲜果材。</p>
        <h2>坚持手作工艺</h2>
        <p>所有产品均采用中央工厂集中手工制作，生产中的每一个细节均有专人严格把控，保证进入每一位消费者餐桌的都是优质的产品。</p>
        <h2>研发，创新不止</h2>
        <p>我们不断寻求食材间的最佳搭配，推陈出新，研发健康、口感 、外形俱佳的产品，将国际最新手作工艺应用于产品制作，寻求突破的同时呈现食材原本风味。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem,MessageBox } from 'mint-ui'
  import  Loading from './Loading'
  import ajax from '../utils/ajax.js'
  import utils from '../utils/public'
  export default {
    name: 'About',
    components: {
      Loading,
      Swipe,
      SwipeItem,
      MessageBox
    },
    mounted () {
      this.getListData()
    },
    data () {
      return {
        loading: true,
      }
    },
    methods: {
      //获取列表数据
      getListData(){
        ajax.getDataFromApi({
          url:'/v1/user-center'
        },(response) => {
          this.userInfo = response.data.body.list
          this.loading = false
        })
      }
    },
  }
  require('../assets/scss/about.scss')
</script>
