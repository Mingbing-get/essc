<template>
    <div class="ddbox-container mb-2">
        <dditem v-for="(item,index) in items" :key="index" :itemdata="item"></dditem>
        <div class="fukuan" v-show="!fukuan">
            <button class="btn btn-primary" @click="qfukuan">去付款</button>
            <span>￥{{ total }}</span>
        </div>
        <div class="yifukuan" v-show="fukuan">已付款 ￥{{ total }}</div>
    </div>
</template>


<script>
    import dditem from './dditem.vue';
    export default {
        data(){
            return {
                items:[],
                total:0
            };
        },
        created : function () {
            this.$http.get('/api/zdgoods?ids=('+this.ddboxdata.goodsids+')')
                .then(function (result) {
                    if (result.data.status == 1){
                        this.items = result.data.data;
                        this.items.forEach(value => {
                            value.images = value.images.split(';');
                            value.count = this.ddboxdata.counts[value.id];
                            var price = parseInt(value.count)*parseInt(value.nowprice);
                            price = Math.floor(price*100)/100;
                            price = price.toFixed(2);
                            value.price = price;
                            this.total = parseInt(this.total)+parseInt(price);
                        });
                    }
                })
                .catch(function (err) {

                });
        },
        components : {
            dditem
        },
        methods : {
            qfukuan(){
                this.$parent.fukuan(this.ddboxdata.id, this.ddboxdata.counts);
            }
        },
        props:['ddboxdata','fukuan']
    }

</script>


<style scoped lang="less">
.ddbox-container {
    width: 50%;
    min-width: 220px;
    margin: 0 auto;
    .fukuan {
        background-color: #fff;
        padding: 5px 0;
        padding-left: 5px;
        span {
            color: indianred;
        }
    }
    .yifukuan {
        background-color: #fff;
        padding: 5px 0;
        padding-left: 5px;
        color: #ccc;
        font-size: 10px;
    }
}
</style>