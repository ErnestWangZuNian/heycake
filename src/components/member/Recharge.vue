<template>
  <div>
    <div class="contianer">
      <div class="recharge-member">
        <div class="recharge-member-header">
          <div class="current-balance">
            <p class="content">￥138</p>
            <p class="title">当前余额</p>
          </div>
        </div>
        <div class="recharge-member-content">
          <div class="amount-select">
            <div class="title cf">
              <div class="title-fl">选择充值金额</div>
              <div class="title-fr same-select">
                <p class="same-select-list">100</p>
                <!--<ul class="same-select-list-container" >
                  <li class="same-select-list same-select-list-active">100</li>
                  <li class="same-select-list">200</li>
                  <li class="same-select-list">300</li>
                </ul>-->
              </div>
            </div>
            <ul>
              <li class="list cf">
                <div class="list-fl">
                  满<span class="green">200</span>元送<span class="green">100</span>元 <span class="red">(实际到账)</span>
                </div>
                <div class="list-fr selected selected1"></div>
              </li>
            </ul>
          </div>
          <div class="pay-select">
            <div class="title cf">
              <div class="title-fl">支付选择</div>
            </div>
            <ul>
              <li class="list cf">
                <div class="list-fl cf">
                   <div class="list-fl-img img-zhifubao"></div>
                   <div class="list-fl-text">
                     <p class="text-title">支付宝</p>
                     <p>推荐支付宝用户使用</p>
                   </div>
                </div>
                <div class="list-fr selected selected1"></div>
              </li>
               <li class="list cf">
                <div class="list-fl cf">
                   <div class="list-fl-img img-weixin"></div>
                   <div class="list-fl-text">
                     <p class="text-title">微信</p>
                     <p>推荐微信用户使用</p>
                   </div>
                </div>
                <div class="list-fr selected selected1"></div>
              </li>
            </ul>
          </div>
          <div class="go-to-pay">
            <button class="btn">去支付</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  require('../../assets/scss/member.scss')

</script>
