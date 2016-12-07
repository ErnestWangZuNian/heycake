<template>
    <modal :show="timeShow" class="timeModal" v-on:close='close'>
        <div slot="header">
            <div class="time-header">
              选择预约时间
            </div>
        </div>
        <div slot="body">
            <div class="time-body">
               <div class="grid-cell">
                 <P class="title">预约日期</p>
                 <ul class="content">
                    <li v-for="item in date" @click="getDate(item)">{{item}}</li>
                 </ul>
             </div>
             <div class="grid-cell">
                 <P class="title">预约时间</p>
                 <ul class="content">
                     <li v-for="item in time" @click="getTime(item)">{{item}}</li>
                 </ul>
             </div>
            </div>
        </div>
    </modal>
</template>
<script>
    import Modal from './Modal'
    export default {
        name: "SelectTime",
        components: {
            Modal
        },
        props: {
            timeShow: {
                default: true
            },
            date: {
                type: Array
            },
            time: {
                type: Array
            }
        },
        methods: {
            getDate (date) {
              this.$emit('close')
              this.$emit('getDate',date)
            },
            getTime (time) {
              this.$emit('close')
              this.$emit('getTime',time)
            },
            close () {
              this.$emit('close')
            }
        }
    }
</script>