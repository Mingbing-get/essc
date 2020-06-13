<template>
    <div class="history-container">
        <historyitem v-for="item in goods" :key="item.id" :goodsitem="item"></historyitem>
    </div>
</template>


<script>
    import historyitem from './historyitem.vue';
    export default {
        data(){
            return {
                goods:[]
            };
        },
        created : function() {
            this.$http.get('/api/querygoods?userzhanghu='+localStorage.getItem('isdenglu'))
                .then(function (result) {
                    if (result.data.status == 1){
                        this.goods = result.data.data;
                        this.goods.forEach(value => {
                            value.images = value.images.split(';');
                        });
                    }
                })
                .catch(function (err) {

                });
        },
        components : {
            historyitem
        }
    }
</script>


<style scoped lang="less">
    .history-container {

    }
</style>