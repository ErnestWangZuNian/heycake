<template>
  <div>
    <div class="container">
    <div class="person" style="text-align: center;" id="test">
      <img id="chenlongJpg" src="../assets/img/person.jpg" alt="">
      <img id="chenlongGif" src="../assets/img/person.gif" style="display:none" alt="">
    </div>

    <div class="text-cont" id="title">
      <p class="text">我有<span class="num">5604</span>个Duang，最高点了<span class="num">5064</span>个Duang！
      使劲点，给自己加Duang！</p>
    </div>

    <div class="duang-cont">
      <a href="javascript:;" class="btn record js-btn" data-target="record">查看我的记录</a>
      <div class="btn btn-duang">
      </div>
      <div class="hand" id="hand"></div>
    </div>
    <div class="footer">
    <a href="javascript:;" class="btn js-btn" data-target="rule">活动规则</a>
    <a href="javascript:;" class="btn js-btn" data-target="rank">排行榜</a>
    <a href="javascript:;" class="btn">下载游戏</a>
  </div>
  </div>
</div>
</template>
<script>
    export default {
      
      name: 'Test'
    }
    require('../assets/scss/style.scss')
</script>