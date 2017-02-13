<template>
    <div>
        <div class="container">
            <div class="goods-recommand-list">
                <ul>
                    <li v-for="item in list">
                        <div class="goods-recommand-title">用户评价</div>
                        <div class="goods-recommand-content">
                            <div class="starflag star " :class="[{star5:item.score === 5},{star4:item.score === 4},{star3:item.score === 3},{star2:item.score === 2},{star1:item.score === 1}]"></div>
                            <div class="goods-recommand-text">{{item.content}}</div>
                        </div>
                        <div class="goods-recommand-footer">
                            <span class="userinfo"><i class="tel-icon"></i>{{item.user || '匿名用户'}}</span>
                            <span class="timeInfo"><i class="time-icon"></i>{{item.publish_time}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from '../../utils/ajax'
    export default {
        name: 'GoodsRecomand',
        mounted() {
            this.fetchData()
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            fetchData() {
                ajax.getDataFromApi({
                    url: `/v1/goods/${this.$route.params.id}/comments`
                }, response => {
                    this.list = response.data.body.list
                })
            }
        }
    }
    require('../../assets/scss/goodsRecommand.scss')
</script>