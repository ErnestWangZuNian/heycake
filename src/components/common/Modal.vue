<template>
    <transition 
    name="modal-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
        <div class="modal-mask" v-show="show" transition="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-close" @click="close"></div>
                    <div class="modal-header">
                        <slot name="header">
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body" style="text-align: center">
                            default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
  export default {
    name: 'modal',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      width: {
        default: 400
      }
    },
    methods: {
       close() {
          this.$emit('close')
       }
    }
  }
</script>