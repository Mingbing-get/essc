<template>
    <div class="essc-container">
        <serch></serch>
        <lunbo></lunbo>
        <cartgrey v-for="(value, key, i) in goodsdata" :cartgoods="value" :mykey="key" :key="i"></cartgrey>
    </div>
</template>


<script>
import cartgrey from './subtemplate/cartgrey.vue';
import lunbo from './subtemplate/lunbo.vue';
import serch from './subtemplate/serch.vue';
export default {
    data() {
        return {
            goodsdata:{}
        };
    },
    created : function(){
        this.$http.get('/api/indexdata')
            .then(function (result) {
                if (result.data.status == 1){
                    result.data.data.forEach(value=>{
                        if (!this.goodsdata[value.status]){
                            this.goodsdata[value.status] = [];
                        }
                        this.goodsdata[value.status].push(value);
                    });
                    this.$forceUpdate();
                }
            })
            .catch(function (err) {
                
            });
    },
    methods : {

    },
    components : {
        cartgrey,
        lunbo,
        serch
    }
}
</script>


<style scoped lang="less">

</style>