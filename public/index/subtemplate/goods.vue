<template>
    <div class="goods-container">
        <a href="#" @click.prevent="clickgoods">
            <div class="bgimg" :style="'background-image: url('+goods.images[0]+')'"></div>
            <h3>{{ goods.title }}</h3>
            <span>￥{{ goods.nowprice }}</span>
            <h5>{{ goods.discription }}</h5>
        </a>
    </div>
</template>


<script>
export default {
    data(){
        return {

        };
    },
    created : function () {
        //处理图片部分
        this.goods.images = this.goods.images.split(';');
    },
    methods : {
        clickgoods(){
            this.$router.push({
                path:'/xqgoods',
                query:{
                    goodsid:this.goods.id
                }
            });
        }
    },
    props : ['goods']
}
</script>


<style scoped lang="less">
.goods-container{
    margin: auto;
    width: 154px;
    padding: 0 2px;
    padding-bottom: 4px;
    background-color: rgba(230, 230, 230, 0.2);
    transition: all 0.5s ease;
    &:hover {
        transform: translateX(-2px);
        transform: translateY(-2px);
        box-shadow: rgba(200, 200, 200, 0.4) 0px 0px 2px 2px;
    }
    a {
        color: #333;
        text-decoration: none;
        .bgimg{
            background-repeat: no-repeat;
            background-size: cover;
            background-position:center;
            height: 200px;
            width: 150px;
        }
        h3{
            font-size: 20px;
        }
        span{
            color: indianred;
        }
        h5{
            font-size: 10px;
        }
    }
}
</style>