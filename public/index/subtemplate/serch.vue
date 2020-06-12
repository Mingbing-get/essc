<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="serchtext" @keyup.enter="btnclick" placeholder="搜索您想要的商品">
        <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="btnclick">搜索</button>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            serchtext: ''
        };
    },
    methods : {
        btnclick(){
            if (this.serchtext == '')
                return;
            this.$router.push({
                path:'/serchgoods',
                query:{
                    serchtext:this.serchtext
                }
            });
        }
    }
}
</script>


<style scoped lang="less">
    @media (min-width: 576px ) {
        .input-group {
            padding-left: 15%;
            padding-right: 15%;
        }
    }
</style>