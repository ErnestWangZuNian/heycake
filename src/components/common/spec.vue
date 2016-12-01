<template>
     <div class="select-spec">
         <div class="good">
             <div class="grid-cell good-img">
               <img src="" alt="" v-lazy="">
             </div>
             <div class="grid-cell good-info">
              <p class="nane">咖啡山丘</p>
              <p class="attrlist">
                <span> ￥168.00</span>
              </p>
             </div>
             <div class="grid-cell close-select">
               <span></span>
             </div>
         </div>
         <ul class="spec">
              <li>
                 <h3>尺寸</h3>
                 <div class="spec-list">
                   <span>
                     6寸
                   </span>
                   <span>
                     6寸
                   </span>
                   <span>
                     6寸
                   </span>
                   <span>
                     6寸
                   </span>
                   <span>
                     6寸
                   </span>
                   <span>
                     6寸
                   </span>
                   <span class="active">
                     6寸
                   </span>
                 </div>
              </li>
         </ul>
         <div class="spec-count cf">
            <div class="name fl">数量</div>
            <Count class="fl"></Count>
            <div class="tip fl">（剩余100个）</div>
         </div>
         <div class="confirm-spec">
           去结算
         </div>
      </div>
</template>
<script>
    import Count from './count'
    export default{
        name: 'Spec',
        components: {
            Count
        }
    }
</script>