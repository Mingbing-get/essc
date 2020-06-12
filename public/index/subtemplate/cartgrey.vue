<template>
    <div class="cartgrey-container">
        <div class="cartgrey-title">
            <h3>{{ mykey }}</h3>
        </div>
        <div class="row mt-3">
            <div class="alcontainer col-6 col-sm-4 col-md-3 text-center mb-3" v-for="item in cartgoods" :key="item.id">
                <goods :goods="item"></goods>
            </div>
        </div>
    </div>
</template>


<script>
    import goods from './goods.vue';
    export default {
        data() {
            return {

            };
        },
        methods : {

        },
        components : {
            goods
        },
        props : ['cartgoods', 'mykey']
    }
</script>


<style scoped lang="less">
.cartgrey-container {
    width: 100%;
    overflow: hidden;
    .cartgrey-title {
        padding: 5px 0;
        padding-left: 20px;
        color: red;
        border-bottom: 1px solid #ccc;
    }
    .alcontainer {
        display: flex;
    }
}
</style>