<template>
  <modal :show="storeShow" class="store-modal" v-on:close='close'>
    <div slot="header">
        <div class="store-header">
            请选择门店
        </div>
    </div>
    <div slot="body">
        <div class="store-body">
          <ul>
            <li v-for="item in storeList">
                <div class="grid-cell selected" :class="[item.isSelected ? 'selected1' : 'selected'  ]"  @click="selectStore(item)">
                </div>
                <div class="grid-cell store-img">
                    <img :src="item.logo" alt="">
                </div>
                <div class="grid-cell store-test">
                    <div class="store-test-title">{{item.name}}</div>
                    <div class="store-test-subtitle">{{item.address}}</div>
                    <div class="store-test-thirdtitle">联系电话: {{item.contact_phone}}</div>
                </div>
            </li>
           </ul>
        </div>
    </div>
  </modal>
</template>
<script>
import Modal from './Modal'
export default {
  name: 'SelectStore',
  props: {
    storeShow: {
        default: false,
        required: false
    },
    storeList: {
        type: Array
    }
  },
  components: {
      Modal
  },
  methods: {
      close () {
          this.$emit('close')
      },
      selectStore (item) {
       this.storeList.forEach((val) => {
           val.isSelected = false
       })
       item.isSelected = !item.isSelected
       this.$emit('selectStore',item)
      }
  }
}
</script>