<template>
    <div class="countBox cf">
        <button type="button" class="fl" @click="reduceCount">-</button>
        <input type="text" class="fl" v-model="counter" @input="inputCount">
        <button type="button" class="fl" @click="addCounnt">+</button>
    </div>
</template>
<script>
    export default {
        name: 'Count',
        props: {
            count: {
                type: Number,
                required: true
            }
        },
        data() {
         return {
             counter: this.count
         }
        },
        methods: {
            addCounnt () {
                this.counter++
            },
            reduceCount () {
                if(this.counter <= 1){
                    this.counter = 1
                }
                this.counter--
            },
           inputCount () {
               var re=/\D/
               if(re.test(this.counter) || this.counter < 1){
                   this.counter = 1
               }
           }
        }
    }
</script>