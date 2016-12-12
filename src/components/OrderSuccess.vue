<template>
     <div class="container">
         <div class="pay-status">
           <div class="pay-status-flag">
           <div class="pay-status-img">
             <img src="../assets/img/pay_success.png" alt="">
           </div>
           <div class="pay-status-text">
             您好，您已支付成功！
           </div>
         </div>
         <div class="go-to-order">
           <button>
              查看我的订单
           </button>
         </div>
         </div>
     </div>
</template>
<script>
export default {
  name: "OrderSuccess"
}
require('../assets/scss/pay-status.scss')
</script>