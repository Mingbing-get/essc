<template>
    <div class="serchgoods-container">
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="serchtext" @keyup.enter="btnclick" placeholder="搜索您想要的商品">
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" @click="btnclick">搜索</button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="alcontainer col-6 col-sm-4 col-md-3 text-center mb-3" v-for="item in goodsdata" :key="item.id">
                <goods :goods="item"></goods>
            </div>
        </div>
    </div>
</template>


<script>
    import goods from './subtemplate/goods.vue';
export default {
    data(){
        return {
            serchtext:'',
            goodsdata: []
        };
    },
    created : function() {
        this.serchtext = this.$route.query.serchtext;
        this.btnclick();
    },
    methods : {
        btnclick(){
            this.$http.get('/api/serch?serch='+this.serchtext)
                .then(function (result) {
                    if (result.data.status == 1){
                        this.goodsdata = result.data.data;
                    }
                })
                .catch(function (err) {

                });
        }
    },
    components : {
        goods
    }
}
</script>


<style scoped lang="less">
.serchgoods-container {
    width: 100%;
    overflow: hidden;
    .alcontainer {
        display: flex;
    }
}
@media (min-width: 576px ) {
    .input-group {
        padding-left: 15%;
        padding-right: 15%;
    }
}
</style>