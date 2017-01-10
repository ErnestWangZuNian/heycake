<template>
     <div class="container">
         <div class="pay-status">
           <div class="pay-status-flag">
           <div class="pay-status-img">
             <img src="../../assets/img/pay_success.png" alt="">
           </div>
           <div class="pay-status-text">
             您好，您已兑换成功！
           </div>
         </div>
         <div class="go-to-order">
           <button @click="gotoOrder">
              回到我的主页
           </button>
         </div>
         </div>
     </div>
</template>
<script>
export default {
  name: "ScoreSuccess",
  methods: {
     gotoOrder () {
         location.href = '/#/site/user-center'
     }
  }
}
require('../../assets/scss/pay-status.scss')
</script>